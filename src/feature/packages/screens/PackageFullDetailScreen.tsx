import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../../components/MainContainer/BackHeader';
import TextDescriptionComponent from '../../chat/components/TextDescriptionComponent';
import {Pallete, fonts} from '../../../theme/enum';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {
  PatientPackage,
  initPackagePay,
  processPackagePay,
} from '../../../api/packages';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import Dropdown from '../components/DropDown';
import Markdown from 'react-native-markdown-display';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import * as Sentry from '@sentry/react-native';
import { logAppsFlyerEvent } from "../../../helpers/appsFlyer";

type Props = {};

const PackageFullDetailScreen = ({route}) => {
  const packageData = route.params?.package;
  const [selectedPackageId, setSelectedPackageId] = React.useState<string>();
  const {width} = useWindowDimensions();
  const [selectedPack, setSelectedPack] = useState<PatientPackage>(
    packageData.packages[0],
  );
  const [valuePropotion, setValuePropotion] = useState('');
  // console.log(packageData);

  const packagesDropDown = packageData.packages.map(pack => {
    let monthStr = 'months';
    if (pack.tenure === 1) {
      monthStr = 'month';
    }
    if (pack.discount > 0) {
      return {
        label: `${pack.tenure} ${monthStr} @(${pack.discount}% off)`,
        value: pack.id,
        is_default: pack.default,
      };
    } else {
      return {
        label: `${pack.tenure} ${monthStr} @ ${pack.amount}`,
        value: pack.id,
        is_default: pack.default,
      };
    }
  });
  const handleOnChange = (text, input) => {
    console.log(text);
  };
  const handleAmount = (id: string) => {
    setSelectedPackageId(id);
    let selected = packageData.packages.filter(pack => pack.id === id);
    setSelectedPack(selected[0]);
  };
  const navigation = useNavigation<NavigationProp<any, any>>();

  const [selected, setSelected] = React.useState('');

  let descriptionValues = packageData.description.split('\n\t\t')[0];
  useEffect(() => {
    if (packageData.description.split('\n\t\t')[1]) {
      setValuePropotion(packageData.description.split('\n\t\t')[1]);
    }
  }, []);

  const payViaCashfree = (initPackageResponse: any) => {
    try {
      let paymentSessionId = initPackageResponse.pay_load.data.paymentSessionId;
      let cashfreeEnv;
      if (process.env.REACT_APP_ENV === 'prod') {
        cashfreeEnv = CFEnvironment.PRODUCTION;
      } else {
        cashfreeEnv = CFEnvironment.SANDBOX;
      }
      const session = new CFSession(
        paymentSessionId,
        initPackageResponse.payment_id,
        cashfreeEnv,
      );
      CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('init cashfree callback');
    CFPaymentGatewayService.setCallback({
      onError(error: CFErrorResponse, orderID: string): void {
        Sentry.captureException(error);
      },
      onVerify(orderID: string): void {
        let data = {
          paymentId: orderID,
        };
        processPackagePay('CashfreePG', orderID, data).then(res => {
          if (res.data.payment_status === 'PAID') {
            console.log('processPackagePay', res.data);
            logAppsFlyerEvent('af_purchase', {
              af_revenue: res.data.amount,
              af_currency: 'INR',
              af_order_id: res.data.payment_id,
            });
            navigation.navigate('PackageSuccessScreen', {
              payment_id: res.data.payment_id,
              amount: res.data.amount,
              status: res.data.payment_status,
              package_name: selectedPack.name,
            });
          }
        });
      }
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  const payViaEasebuzz = (initPackageResponse: any) => {
    var options = {
      access_key: initPackageResponse.pay_load.data.accessKey,
      pay_mode: process.env.EASEBUZZ_ENV,
    };
    EasebuzzCheckout.open(options)
      .then(data => {
        //{"payment_response": {"PG_TYPE": "NA", "addedon": "2023-09-14 16:40:05", "amount": "7000.0", "bank_ref_num": "NA", "bankcode": "NA", "cardCategory": "NA", "card_type": "NA", "cardnum": "NA", "cash_back_percentage": "50.0", "deduction_percentage": "None", "easepayid": "TWUCDLIYTX", "email": "Thisisjoed@gmail.com", "error": "NA", "error_Message": "NA", "firstname": "Joe Dominic", "furl": "https://nexus.dev.everheal.com/payment/easebuzzpg/process/patient_package/0DKCABS78Q9ZW", "hash": "146b884cdd89556977ba031d77d76a20a25d30bd23481246a19f1e5cb733eaab10648c66efb010d86f7cc4c8c6f1817141a77e2e4b2c7966a356ee2ca5e7d37e", "issuing_bank": "NA", "key": "2PBP7IABZ2", "merchant_logo": "NA", "mode": "NA", "name_on_card": "NA", "net_amount_debit": "7000.0", "payment_source": "Easebuzz", "phone": "9895270649", "productinfo": "0D2T8T2685EK8", "status": "userCancelled", "surl": "https://nexus.dev.everheal.com/payment/easebuzzpg/process/patient_package/0DKCABS78Q9ZW", "txnid": "0DKCABS78Q9ZW", "udf1": "", "udf10": "", "udf2": "", "udf3": "", "udf4": "", "udf5": "", "udf6": "", "udf7": "", "udf8": "", "udf9": "", "unmappedstatus": "NA", "upi_va": "NA"}, "result": "user_cancelled"}
        processPackagePay(
          'EasebuzzPG',
          initPackageResponse.payment_id,
          data.payment_response,
        ).then(res => {
          if (res.data.payment_status === 'PAID') {
            console.log('processPackagePay', res.data);
            navigation.navigate('PackageSuccessScreen', {
              payment_id: res.data.payment_id,
              amount: res.data.amount,
              status: res.data.payment_status,
              package_name: selectedPack.name,
            });
          }
        });
        //handle the payment success & failed response here
      })
      .catch(error => {
        //handle sdk failure issue here
        console.log(error);
      });
  };
  const takeMetoPayment = async (selectedPackageId: string) => {
    let res = await initPackagePay(selectedPackageId);
    let initPackageResponse = res.data;
    console.log('initPackageResponse', initPackageResponse);
    switch (initPackageResponse.gateway) {
      case 'cashfreepg':
        payViaCashfree(initPackageResponse);
        break;
      case 'easebuzzpg':
        payViaEasebuzz(initPackageResponse);
        break;
    }
  };

  return (
    <View
      style={[
        {flex: 1, backgroundColor: '#fff'},
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <BackHeader title={packageData.title} />
      {/* <Text
        style={{
          fontFamily: fonts.SecondaryDMSansBold,
          paddingHorizontal: horizontalScale(20),
          marginVertical: verticalScale(10),
        }}>
        Love that Bump
      </Text> */}
      {/* <TextDescriptionComponent description={packageData.description} /> */}
      <View
        style={{
          width: '55%',
          justifyContent: 'space-between',
          height: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(10),
        }}>
        <View
          style={{
            width: '100%',
            padding: 5,
          }}>
          <Dropdown passData={handleAmount} data={packagesDropDown} />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: horizontalScale(10),
          }}>
          {selectedPack.discount > 0 && (
            <Text
              style={{
                color: Pallete.darkBlack,
                fontSize: 18,
                fontFamily: fonts.SecondaryDMSansMedium,
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              &#x20B9;
              {selectedPack.full_amount}
            </Text>
          )}

          <Text
            style={{
              color: Pallete.darkBlack,
              fontSize: 22,
              fontFamily: fonts.SecondaryDMSansBold,
            }}>
            &#x20B9;
            {selectedPack.amount}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{
          paddingHorizontal: horizontalScale(20),
          marginBottom: 100,
        }}>
        <Markdown style={{}}>{packageData.app_meta[0].markdown}</Markdown>
      </ScrollView>
      <View style={styles.buttonView}>
        <View style={styles.btnTxt}>
          <TouchableOpacity
            style={styles.bunowBtn}
            onPress={() => takeMetoPayment(selectedPackageId)}>
            <Text style={styles.butNowtxt}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PackageFullDetailScreen;

const styles = StyleSheet.create({
  btnTxt: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  butNowtxt: {
    color: '#000',
    fontSize: 18,
    fontFamily: fonts.PrimaryJakartaBold,
    alignSelf: 'center',
  },
  bunowBtn: {
    backgroundColor: 'rgba(255, 222, 145, 1)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  learnMoreTxt: {
    fontSize: 18,
    color: Pallete.GoldenGlow,
    fontFamily: fonts.PrimaryJakartaExtraBold,
  },
  backBtnImg: {
    width: 20,
    height: 20,
    transform: [{rotate: '180deg'}],
  },
  buttonView: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: verticalScale(14),
    height: verticalScale(50),
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#e3e3e3',
    // borderColor: '#e3e3e3',
    flexDirection: 'row',
    padding: horizontalScale(5),
    left: 20,
    right: 20,
  },
});
