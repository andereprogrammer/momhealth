import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BackBtn,
  BgPackage,
  ChatScreenShot,
  Cross,
  PhoneFrame,
  PremiumBadgeAnimation,
  SessionScreenshot,
  SupportIcon,
} from '../../../../../assets';
import {Pallete, fonts} from '../../../../../theme/enum';
import HeaderTextComponent from '../../../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import ReviewCard from '../../../components/ReviewCard';
import {
  getEligiblePackages,
  initPackagePay,
  processPackagePay,
} from '../../../../../api/packages';
import LoadingAnimationScreen from '../../../../animations/LoadingAnimationScreen';
import MainCtaComponent from '../../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import BackHeader from '../../../../../components/MainContainer/BackHeader';
import {getPatientBasic, requiresCallback} from '../../../../../api/homeapis';
import * as Sentry from '@sentry/react-native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import useDataProvider from '../../../../../context-store/useDataProvider';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import FreemiumPackageDropdownComponent from '../../../components/FreemiumPackageDropDown';
import {loadBot} from '../../../../cs-bot/helpers/Bothelper';
import BannerBenefits from '../components/BannerBenefits';
import BannerPictureComponent from '../components/BannerPictureComponent';
import UspListCard from '../components/UspListCard';
import TenureTile from '../components/TenureTile';
import {verticalScale} from '../../../../../helpers/layoutHelper';
import FAQComponent from '../components/FAQComponent';
import ProductCarousel from '../components/ProductCarousel';
import CareTeamVideoCard from '../components/CareTeamVideoCard';
import MostPopularTag from '../components/MostPopularTag';
import TitleText from '../components/TitleText';
import MainBannerImage from '../components/MainBannerImage';
import BackgroundCover from '../components/BackgroundCover';
import ConsultButton from '../components/ConsultButton';
import SelectedPackageInfo from '../components/SelectedPackageInfo';
import {options} from '../../../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {trigger} from 'react-native-haptic-feedback';
import FreemiumPackageLoader from '../components/FreemiumPackageLoader';
import {logEvent} from '../../../../../helpers/facebook_events';
import {updateStatusBar} from '../../../../dashboard/components/ScreenHooks';
import {Input} from 'react-native-elements';
import {tr} from 'date-fns/locale';
import ModalWithOverlay from '../../../../../components/ModalWithOverlay';
import ConsultationFeedbackModal from '../components/ConsultationFeedbackModal';
import {logAppsFlyerEvent} from '../../../../../helpers/appsFlyer';
import s from '../../../../../styles/GlobalStyles';
import LockedScreenHeader from '../../../../../components/HeaderComponents/LockedScreenHeader';
import lockedScreenContent from '../data/LockedScreenContent';
import ScreenshotImage from '../../../../../components/ImageComponents/ScreenshotImage';
import ImageWithView from '../../../../../components/ImageWithView';
import getDefaultShadow from '../../../../../styles/ShadowPresets';
import {dataUrls} from '../../../../../constants';
import useFetchJson from '../../../../../helpers/hooks/useFetchJson';
import LockedScreenContentListItem from '../components/LockedScreenContentListItem';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';
import LockedScreenSnapshots from '../data/LockedScreenSnapshots';

type LockedFeaturesScreenProps = {
  headerTitle: string;
  contentKey: string;
};

const LockedFeaturesScreen = ({
  headerTitle,
  contentKey,
}: LockedFeaturesScreenProps) => {
  const [eligiblePackages, setEligiblePackages] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const {setPatientBasicDetails, patientBasicDetails} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const scrollRef = useRef();
  const offeringRef = useRef();
  const [offeringIndex, setOfferingIndex] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [query, setQuery] = useState('');
  const [lockedScreenContent, setLockedScreenContent] = useState<any>(null); // Adjust the type as per your JSON structure

  const route = useRoute();
  headerTitle = (route.params as LockedFeaturesScreenProps).headerTitle;
  contentKey = (route.params as LockedFeaturesScreenProps).contentKey;

  const selectPackage = (pack: any) => {
    console.log('selected package', pack);
    setSelectedPackage(pack);
  };

  const scrollToOffering = () => {
    if (offeringIndex) {
      scrollRef.current.scrollTo({y: offeringIndex - 40, animiated: true});
    }
  };

  const handlePayment = async () => {
    if (selectedPackage) {
      trigger('impactHeavy', options);
      console.log('selected package clicked', selectedPackage);
      let selectedPackageId = selectedPackage.id;
      logAppsFlyerEvent('af_add_to_cart', {
        af_price: selectedPackage.amount,
        af_quantity: 1,
      });
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
  const loadChat = () => {
    trigger('impactLight', options);
    loadBot(patientBasicDetails?.id);
  };

  const showScheduleCallback = () => {
    setShowScheduleModal(true);
  };

  const onScheduleSubmit = () => {
    requiresCallback(query);
    setShowScheduleModal(false);
    setQuery('');
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
              setPatientBasicDetails(basicData.data);
              logAppsFlyerEvent('af_purchase', {
                af_revenue: res.data.amount,
                af_currency: 'INR',
                af_order_id: res.data.payment_id,
              });
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

  useEffect(() => {
    setLoading(true);
    getEligiblePackages()
      .then(res => {
        let mainPackage = res.data.find(item => {
          return item.website_meta.section === 'main';
        });
        setEligiblePackages(mainPackage);
        console.log('eligiblepackages', mainPackage.app_meta_new);
        console.log(
          'care_team_details',
          mainPackage.app_meta_new[0].care_team_details,
        );
        setSelectedPackage(mainPackage.packages.find(item => item.default));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      logEvent('free-package-screen');
    }, []),
  );

  type dataType = {title: string; pointers: string[]};
  type contentType = {
    ChatSession: dataType;
    SessionBooking: dataType;
    CarePage: dataType;
  };
  const {
    data: lockedScreenData,
    loading: lockedScreenContentLoading,
    error: lockedScreenContentError,
  } = useFetchJson<contentType>(dataUrls.LOCKED_SCREEN_CONTENT_URL);

  const currentScreenData = lockedScreenData?.[contentKey as keyof contentType];
  const pointers = currentScreenData?.pointers;
  const title = currentScreenData?.title;

  return (
    <View style={styles.screenView}>
      <View style={[s.p0, styles.backHeaderView, s.flex, s.flexCol]}>
        <LockedScreenHeader headerTitle={headerTitle} />
        <ScrollView style={[s.flex, s.flexCol, s.wFull]}>
          <View
            style={[
              s.flex,
              s.flex1,
              s.flexCol,
              s.hFit,
              s.justifyStart,
              s.itemsCenter,
              s.pt4,
              {paddingBottom: 250},
            ]}>
            {/*TODO: Need to resolve the type safety of passing the source later*/}
            <ScreenshotImage
              source={LockedScreenSnapshots[contentKey]}
              percentWidth={80}
            />
            {/*<View*/}
            {/*  id={'BottomBarBelowScreenshot'}*/}
            {/*  style={[*/}
            {/*    s.bgSecondaryLighter,*/}
            {/*    s.rounded3xl,*/}
            {/*    s.flex,*/}
            {/*    s.flexRow,*/}
            {/*    s.gap2,*/}
            {/*    s.p2,*/}
            {/*    getDefaultShadow({shadowLevel: 1}),*/}
            {/*    {transform: [{translateY: -15}]},*/}
            {/*  ]}>*/}
            {/*  {Array.from({length: 5}, (_, _i) => (*/}
            {/*    <View*/}
            {/*      style={[s.rounded3xl, s.bgPrimary, s.aspect1, {width: 10}]}*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*</View>*/}
            <Text
              style={[s.px6, s.mt4, s.text2XL, s.selfStart, s.fontJakartaBold]}>
              {title?.split('*').map((item, i) => (
                <Text style={[i % 2 === 0 ? s.textPrimary : s.textSecondary]}>
                  {item.trim() + ' '}
                </Text>
              ))}
            </Text>
            <View style={[s.mt4, s.selfStart, s.wFull]}>
              {pointers?.map((item, i) => (
                <LockedScreenContentListItem key={i} content={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <FloatingEnrollBar
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        eligiblePackages={eligiblePackages}
        handlePayment={handlePayment}
      />
    </View>
  );
};

type FloatingEnrollBarProps = {
  selectedPackage: any;
  eligiblePackages: any;
  setSelectedPackage: any;
  handlePayment: any;
};

export const FloatingEnrollBar = ({
  selectedPackage,
  eligiblePackages,
  setSelectedPackage,
  handlePayment,
}: FloatingEnrollBarProps) => {
  return (
    <View id={'BottomPaymentContainer'} style={[styles.floatingContainer]}>
      <View style={[styles.moneyBackView]}>
        <Text style={styles.moneyBackText}>30-day money back guarantee</Text>
      </View>
      <View style={[s.pb4, {width: '100%'}]}>
        <View style={[s.flex, s.flexRow, s.justifyBetween, s.itemsCenter]}>
          <View style={[s.flex, s.flexRow, s.itemsCenter, s.p4, {}]}>
            <SelectedPackageInfo
              styles={[]}
              selectedPackage={selectedPackage}
            />
          </View>
          <View style={[s.grow, s.px2, {width: 100}]}>
            {eligiblePackages?.packages && (
              <FreemiumPackageDropdownComponent
                data={eligiblePackages?.packages}
                setSelectedPackage={setSelectedPackage}
                selectedPackage={selectedPackage}
              />
            )}
          </View>
          <View style={[s.px4]}>
            <MainCtaComponent
              active
              style={[s.px6, s.roundedXl, getDefaultShadow()]}
              onClick={handlePayment}>
              Enroll now
            </MainCtaComponent>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LockedFeaturesScreen;

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  enrollView: {
    width: '40%',
  },
  dropDownView: {
    width: '52%',
  },
  selectedPackageInfo: {
    width: '55%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedPackageView: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moneyBackText: {
    color: '#000',
    fontFamily: fonts.PrimaryJakartaBold,
    paddingVertical: 4,
  },
  moneyBackView: {
    backgroundColor: '#FFDD90',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingContainer: {
    position: 'absolute',
    zIndex: 30,
    width: '100%',
    bottom: 0,
    backgroundColor: '#fff',
    elevation: 12,
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 6,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  backHeaderView: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? verticalScale(30) : 0,
  },
  w98: {
    width: '98%',
  },
  w100: {
    width: '100%',
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
    paddingVertical: 20,
  },
  textStyle: {
    color: Pallete.Eggplant,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  careTeamText: {
    color: Pallete.Eggplant,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  heroCard: {
    width: '100%',
    opacity: 1,
    position: 'relative',
    zIndex: 10,
    flex: 1,
    paddingBottom: verticalScale(80),
  },
  mainScroll: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  imageAspect: {
    width: '100%',
    height: '100%',
  },
  bgImageView: {
    width: '100%',
  },
  titleText: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 18,
    letterSpacing: 1,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    color: '#60008E',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 5,
  },
  packageUnfocused: {
    backgroundColor: '#9a9a9a',
  },
  packageFocused: {
    backgroundColor: '#fff',
  },
  spacer: {
    height: 200,
  },
  reviewCardList: {
    paddingHorizontal: 20,
    gap: 20,
    marginVertical: 5,
    paddingVertical: 10,
  },
  flexFull: {
    flex: 1,
  },
  careTeamList: {
    gap: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: '100%',
    paddingRight: 20,
    paddingLeft: 10,
  },
  careTeamView: {
    width: '100%',
    height: 250,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  whatsIncludedArrow: {
    width: '100%',
    height: '100%',
    transform: [{rotate: '270deg'}],
  },
  whatsincludedView: {
    width: 20,
    height: 20,
  },
  whatsincludedText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  whatsincludedContainer: {
    width: '45%',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 20,
    flexDirection: 'row',
  },
  uspListView: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 25,
    gap: 10,
    paddingHorizontal: 40,
  },
  overLayBg: {
    flex: 1,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    opacity: 0.4,
  },
});
