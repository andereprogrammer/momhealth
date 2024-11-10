import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  PatientProgram,
  getPackages,
  initPackagePay,
  processPackagePay,
} from '../../../api/packages';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDataProvider from '../../../context-store/useDataProvider';
import {ActivePackage} from '../../../api/types';

type Props = {};

const PackagesMainListScreen = (props: Props) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [programs, setPrograms] = React.useState<PatientProgram[]>();
  const {activePackages} = useDataProvider();
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [activePackage, setActivePackage] = useState<ActivePackage>(null);
  const checkUserState = async () => {
    const state = await AsyncStorage.getItem('userLogged');
    console.log('State', state);
    if (state === 'true') {
      navigation.navigate('HomeTabNavigator');
    }
  };

  const takeMetoPayment = async (selectedPackageId: string) => {
    console.log('selected packageId', selectedPackageId);
    let res = await initPackagePay(selectedPackageId);
    let initPackageResponse = res.data;
    console.log('initPackageResponse', initPackageResponse);
    var options = {
      access_key: initPackageResponse.pay_load.data.accessKey,
      pay_mode: process.env.EASEBUZZ_ENV,
    };
    EasebuzzCheckout.open(options)
      .then(data => {
        //{"payment_response": {"PG_TYPE": "NA", "addedon": "2023-09-14 16:40:05", "amount": "7000.0", "bank_ref_num": "NA", "bankcode": "NA", "cardCategory": "NA", "card_type": "NA", "cardnum": "NA", "cash_back_percentage": "50.0", "deduction_percentage": "None", "easepayid": "TWUCDLIYTX", "email": "Thisisjoed@gmail.com", "error": "NA", "error_Message": "NA", "firstname": "Joe Dominic", "furl": "https://nexus.dev.everheal.com/payment/easebuzzpg/process/patient_package/0DKCABS78Q9ZW", "hash": "146b884cdd89556977ba031d77d76a20a25d30bd23481246a19f1e5cb733eaab10648c66efb010d86f7cc4c8c6f1817141a77e2e4b2c7966a356ee2ca5e7d37e", "issuing_bank": "NA", "key": "2PBP7IABZ2", "merchant_logo": "NA", "mode": "NA", "name_on_card": "NA", "net_amount_debit": "7000.0", "payment_source": "Easebuzz", "phone": "9895270649", "productinfo": "0D2T8T2685EK8", "status": "userCancelled", "surl": "https://nexus.dev.everheal.com/payment/easebuzzpg/process/patient_package/0DKCABS78Q9ZW", "txnid": "0DKCABS78Q9ZW", "udf1": "", "udf10": "", "udf2": "", "udf3": "", "udf4": "", "udf5": "", "udf6": "", "udf7": "", "udf8": "", "udf9": "", "unmappedstatus": "NA", "upi_va": "NA"}, "result": "user_cancelled"}
        console.log('Payment Response:', data);
        processPackagePay(
          'EasebuzzPG',
          initPackageResponse.payment_id,
          data.payment_response,
        ).then(res => {
          console.log('paymentResponseRaw', res);
          console.log('paymentResponse', res.data);
          if (res.data.payment_status == 'PAID') {
            navigation.navigate('PackageSuccessScreen', {
              payment_id: res.data.payment_id,
              amount: res.data.amount,
              status: res.data.payment_status,
              payment_method: 'UPI',
            });
          }
        });
        //handle the payment success & failed response here
      })
      .catch(error => {
        //handle sdk failure issue here
        console.log('SDK Error:');
        console.log(error);
      });
  };
  useEffect(() => {
    checkUserState();
    // if (activePackages.length > 0) {
    //   setActivePackage(activePackages[0]);
    //   setHasActivePackage(true);
    // }
    // getPackages().then(res => {
    //   // console.log("programs",res.data);
    //   setPrograms(res.data);
    // });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getPackages()
        .then(res => {
          setPrograms(res.data);
        })
        .catch(e => {
          console.log(e);
        });
      return () => setPrograms(undefined);
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
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={{flex: 2}}>
        {/* <FlatList
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

            )} */}
        {/* /> */}
      </View>
    </View>
  );
};

export default PackagesMainListScreen;

const styles = StyleSheet.create({});
