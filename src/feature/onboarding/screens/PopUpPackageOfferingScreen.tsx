import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getEligiblePackages,
  initPackagePay,
  processPackagePay,
} from '../../../api/packages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  SCREEN_HEIGHT_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../theme/enum';
import {trigger} from 'react-native-haptic-feedback';
import BuyNowBtn from '../components/BuyNowBtn';
import TitleText from '../components/TitleText';
import OfferCard from '../components/OfferCard';
import DiscountCard from '../components/DiscountCard';
import NoteText from '../components/NoteText';
import CloseBtn from '../../tipoftheday/components/CloseBtn';
import PackagePriceList from '../components/PackagePriceList';
import PopUpScreenSkeleton from '../components/skeletonloaders/PopUpScreenSkeleton';
import LottieView from 'lottie-react-native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {getPatientBasic} from '../../../api/homeapis';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import * as Sentry from '@sentry/react-native';
import useDataProvider from '../../../context-store/useDataProvider';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {logAppsFlyerEvent} from '../../../helpers/appsFlyer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const PopUpPackageOfferingScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [eligiblePackages, setEligiblePackages] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState([]);
  const {setPatientBasicDetails, patientBasicDetails} = useDataProvider();

  const selectPackage = (pack: any) => {
    setSelectedPackage(pack);
  };

  useEffect(() => {
    setLoading(true);
    getEligiblePackages()
      .then(res => {
        let mainPackage = res.data.find(item => {
          return item.website_meta.section === 'main';
        });
        setEligiblePackages(mainPackage);
        setSelectedPackage(mainPackage.packages.find(item => item.default));
        setLoading(false);
        const value = JSON.stringify(true);
        AsyncStorage.setItem('onboarded', value);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const onTenureSelected = item => {
    trigger('selection');
    selectPackage(item);
  };
  const handlePayment = async () => {
    if (selectedPackage) {
      trigger('impactHeavy', options);
      console.log('selected package clicked', selectedPackage);
      let selectedPackageId = selectedPackage.id;
      let res = await initPackagePay(selectedPackageId);
      let initPackageResponse = res.data;
      switch (initPackageResponse.gateway) {
        case 'cashfreepg':
          payViaCashfree(initPackageResponse);
          break;
        case 'easebuzzpg':
          payViaEasebuzz(initPackageResponse);
          break;
      }
    } else {
      console.log('no package selected');
    }
  };

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
            getPatientBasic().then(basicData => {
              setPatientBasicDetails(basicData.data);
              navigation.navigate('PackageSuccessScreen', {
                payment_id: res.data.payment_id,
                amount: res.data.amount,
                status: res.data.payment_status,
                package_name: res.data.metadata.programName,
              });
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
            getPatientBasic().then(basicData => {
              console.log('getPatientBasic', basicData.data);
              setPatientBasicDetails(basicData.data);
              navigation.navigate('PackageSuccessScreen', {
                payment_id: res.data.payment_id,
                amount: res.data.amount,
                status: res.data.payment_status,
                package_name: res.data.metadata.programName,
              });
            });
          }
        });
      },
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  return (
    <>
      {loading ? (
        <PopUpScreenSkeleton />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.closeBtnPos}>
            <CloseBtn
              close={() => {
                navigation.goBack();
                console.log('jfshdfjkshdf');
              }}
            />
          </View>
          <TitleText />
          <OfferCard selectedPackage={selectedPackage} />
          <Text
            style={{
              fontFamily: fonts.PrimaryJakartaMedium,
              fontSize: 15,

              alignSelf: 'center',
            }}>
            on comprehensive pregnancy packages
          </Text>
          <DiscountCard selectedPackage={selectedPackage} />
          <PackagePriceList
            eligiblePackages={eligiblePackages}
            selectedPackage={selectedPackage}
            updatePackage={onTenureSelected}
          />
          <BuyNowBtn onClickFn={handlePayment} />
          <NoteText />
        </SafeAreaView>
      )}
    </>
  );
};

export default PopUpPackageOfferingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Pallete.backgroundPink,
    paddingTop: Platform.OS === 'android' ? verticalScale(40) : 0,
  },
  closeBtnPos: {
    position: 'absolute',
    left: 0,
    top: 10,
    zIndex: 200000000000000,
  },
  relative: {
    position: 'relative',
  },
  packageListingView: {
    gap: 10,
    flexDirection: 'column-reverse',
  },
  packageListing: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
  },
  textStyle: {
    color: Pallete.Eggplant,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});
