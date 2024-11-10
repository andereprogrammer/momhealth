import {
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import PackageCardComponent from '../components/PackageCardComponent';
import PaginatorPackageComponent from '../components/PaginatorPackageComponent';
import {
  getPackages,
  initPackagePay,
  PatientProgram,
  processPackagePay,
} from '../../../api/packages';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import ActivePackagesInfoCard from '../components/ActivePackagesInfoCard';
import useDataProvider from '../../../context-store/useDataProvider';
import {ActivePackage} from '../../../api/types';
import {getActivePackages, getPatientBasic} from '../../../api/homeapis';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import * as Sentry from '@sentry/react-native';
import { logAppsFlyerEvent } from "../../../helpers/appsFlyer";

type Props = {};
export type PackageProps = {
  packageName: string;
  description: string;
  packages: [
    {
      id: string;
    },
  ];
  website_meta: {
    name: string;
    description: string;
  };
};
const PackagesHomeScreen = ({route}) => {
  console.log(route.params.value);
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [programs, setPrograms] = React.useState<PatientProgram[]>([]);
  const {activePackages, setActivePackages, setPatientBasicDetails} =
    useDataProvider();
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [activePackage, setActivePackage] = useState<ActivePackage>(null);

  const checkUserState = async () => {
    const state = await AsyncStorage.getItem('userLogged');
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
            getPatientBasic().then(basicData => {
              console.log('getPatientBasic', basicData.data);
              logAppsFlyerEvent('af_purchase', {
                af_revenue: res.data.amount,
                af_currency: 'INR',
                af_order_id: res.data.payment_id,
              });
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

  const handlePayment = async (selectedPackageId: string) => {
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
  };

  useEffect(() => {
    checkUserState();
    let packages = activePackages;
    if (!packages) {
      getActivePackages().then(packs => {
        setActivePackages(packs.data);
        packages = packs.data;
      });
    }
    if (packages?.length > 0) {
      setActivePackage(packages[0]);
      setHasActivePackage(true);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let categarizedPrograms: PatientProgram[] = [];
      getPackages()
        .then(res => {
          if (route?.params?.value === 'main') {
            res.data.map((program: PatientProgram) => {
              if (program.website_meta.section === 'main') {
                categarizedPrograms.push(program);
              }
            });
            setPrograms(categarizedPrograms);
          } else if (route?.params?.value === 'addons') {
            res.data.map((program: PatientProgram) => {
              if (program.website_meta.section === 'addon') {
                categarizedPrograms.push(program);
              }
            });
            setPrograms(categarizedPrograms);
          }
        })
        .catch(e => {
          console.log(e);
        });
      return () => setPrograms([]);
    }, []),
  );
  const onboardingRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewAbleItemChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.containerDefaults}>
      <View style={styles.cardContainer}>
        {/* {hasActivePackage && (
          <ActivePackagesInfoCard
            style={{
              height: '18%',
              width: width - horizontalScale(20),
              marginVertical: verticalScale(10),
            }}
            package={activePackage}
            message="Explore more packages below"
          />
        )} */}
        {/* <RenderFilterCard
          packageType={['mat', 'pat']}
          onRemoveFilter={() => {}}
        /> */}
        <View style={styles.flatListView}>
          <FlatList
            data={programs}
            horizontal
            centerContent
            style={{flex: 1}}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            pagingEnabled
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            keyExtractor={item => item.name}
            contentContainerStyle={{paddingBottom: 20, marginBottom: 10}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            onViewableItemsChanged={viewAbleItemChanged}
            ref={onboardingRef}
            renderItem={({item}: {item: PatientProgram}) => (
              <PackageCardComponent
                key={item.id}
                title={item.name}
                type={item.website_meta.program_type}
                description={item.website_meta.card_program_desc}
                packages={item.packages}
                benefits={item.website_meta.minimized_benefits}
                onPayment={handlePayment}
                app_meta={item.app_meta}
                website_meta={item.website_meta}
              />
            )}
          />
        </View>
        {programs?.length > 0 && (
          <PaginatorPackageComponent packages={programs} scrollX={scrollX} />
        )}
      </View>
    </View>
  );
};

export default PackagesHomeScreen;

const styles = StyleSheet.create({
  containerDefaults: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: verticalScale(5),
  },
  cardContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  flatListView: {flex: 2, alignItems: 'center'},
});
