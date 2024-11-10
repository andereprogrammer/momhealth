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
import {BackBtn, BgPackage, Cross, SupportIcon} from '../../../../assets';
import {Pallete, fonts} from '../../../../theme/enum';
import HeaderTextComponent from '../../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import ReviewCard from '../../components/ReviewCard';
import {
  getEligiblePackages,
  initPackagePay,
  processPackagePay,
} from '../../../../api/packages';
import LoadingAnimationScreen from '../../../animations/LoadingAnimationScreen';
import MainCtaComponent from '../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import BackHeader from '../../../../components/MainContainer/BackHeader';
import {getPatientBasic, requiresCallback} from '../../../../api/homeapis';
import * as Sentry from '@sentry/react-native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import useDataProvider from '../../../../context-store/useDataProvider';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import FreemiumPackageDropdownComponent from '../../components/FreemiumPackageDropDown';
import {loadBot} from '../../../cs-bot/helpers/Bothelper';
import BannerBenefits from './components/BannerBenefits';
import BannerPictureComponent from './components/BannerPictureComponent';
import UspListCard from './components/UspListCard';
import TenureTile from './components/TenureTile';
import {verticalScale} from '../../../../helpers/layoutHelper';
import FAQComponent from './components/FAQComponent';
import ProductCarousel from './components/ProductCarousel';
import CareTeamVideoCard from './components/CareTeamVideoCard';
import MostPopularTag from './components/MostPopularTag';
import TitleText from './components/TitleText';
import MainBannerImage from './components/MainBannerImage';
import BackgroundCover from './components/BackgroundCover';
import ConsultButton from './components/ConsultButton';
import SelectedPackageInfo from './components/SelectedPackageInfo';
import {options} from '../../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {trigger} from 'react-native-haptic-feedback';
import FreemiumPackageLoader from './components/FreemiumPackageLoader';
import {logEvent} from '../../../../helpers/facebook_events';
import {updateStatusBar} from '../../../dashboard/components/ScreenHooks';
import {Input} from 'react-native-elements';
import {tr} from 'date-fns/locale';
import ModalWithOverlay from '../../../../components/ModalWithOverlay';
import ConsultationFeedbackModal from './components/ConsultationFeedbackModal';
import {logAppsFlyerEvent} from '../../../../helpers/appsFlyer';
import {FloatingEnrollBar} from './screens/LockedFeaturesScreen';

const FreemiumPackageHomeScreen = () => {
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

  return (
    <View style={styles.screenView}>
      <FloatingEnrollBar
        selectedPackage={selectedPackage}
        eligiblePackages={eligiblePackages}
        setSelectedPackage={setSelectedPackage}
        handlePayment={handlePayment}
      />
      <View style={styles.backHeaderView}>
        <BackHeader bgcolor="#fff" title={eligiblePackages?.name} />
      </View>
      <ScrollView ref={scrollRef} style={styles.mainScroll}>
        {loading && eligiblePackages === undefined ? (
          <FreemiumPackageLoader />
        ) : (
          <>
            <View style={styles.overLayBg}>
              <ModalWithOverlay isOpen={showScheduleModal}>
                <ConsultationFeedbackModal
                  closeModal={() => setShowScheduleModal(false)}
                  onScheduleSubmit={onScheduleSubmit}
                  onChange={text => setQuery(text)}
                  query={query}
                />
              </ModalWithOverlay>
            </View>

            <LinearGradient
              colors={['#FFE2F9', '#FFC2F1', '#FEA2E9', '#FFA2EF']}
              useAngle={true}
              angle={130}
              angleCenter={{x: 0.2, y: 0.6}}
              locations={[0.3, 0.75, 0.9, 1]}
              style={styles.heroCard}>
              <ImageBackground
                source={BgPackage}
                resizeMethod="resize"
                resizeMode="contain"
                imageStyle={styles.imageAspect}
                style={styles.bgImageView}>
                <BackgroundCover />
                <TitleText type={eligiblePackages?.type} />
                <MainBannerImage />
                <Text style={styles.titleText}>Package inclusions</Text>
                <BannerBenefits
                  bannerbenefit={
                    eligiblePackages?.app_meta_new[0]?.banner_benefits[0]
                  }
                  key={890}
                />
                <View style={styles.uspListView}>
                  {eligiblePackages?.app_meta_new[0]?.care_team_includes.map(
                    (item: string, index: number) => {
                      return <UspListCard usp={item} key={index} />;
                    },
                  )}
                </View>
                {eligiblePackages?.app_meta_new[0]?.banner_benefits.map(
                  (item: string, index: number) => {
                    if (index !== 0) {
                      return (
                        <BannerBenefits bannerbenefit={item} key={index} />
                      );
                    }
                  },
                )}
              </ImageBackground>
              <BannerPictureComponent />
            </LinearGradient>

            <HeaderTextComponent
              mainText="Your care team"
              callTextPresent={false}
              callText="View all"
              callFuntion={() => {}}
              mainTextStyle={styles.textStyle}
              style={styles.careTeamText}
            />

            <View style={styles.careTeamView}>
              <FlatList
                data={eligiblePackages?.app_meta_new[0]?.care_team_details}
                horizontal
                contentContainerStyle={styles.careTeamList}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return <CareTeamVideoCard {...item} />;
                }}
              />
            </View>

            <HeaderTextComponent
              mainText="Choose your package duration"
              callTextPresent={false}
              callText="View all"
              callFuntion={() => {}}
              mainTextStyle={{fontFamily: fonts.SecondaryDMSansBold}}
              style={styles.careTeamText}
            />

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0}}
              colors={['#FFF', '#FF82E3']}
              useAngle={true}
              angle={120}
              style={styles.packageListing}>
              <View style={styles.packageListingView}>
                {eligiblePackages?.packages.map(item => {
                  return (
                    <View style={styles.relative}>
                      {item.default && <MostPopularTag />}
                      <TenureTile
                        packageItem={item}
                        onPress={() => {
                          trigger('selection', options);
                          selectPackage(item);
                        }}
                        selectedPackage={selectedPackage}
                      />
                    </View>
                  );
                })}
              </View>

              <TouchableOpacity onPress={scrollToOffering} style={styles.w100}>
                <View style={styles.whatsincludedContainer}>
                  <Text style={styles.whatsincludedText}>
                    See what's included
                  </Text>
                  <View style={styles.whatsincludedView}>
                    <Image
                      resizeMethod="resize"
                      resizeMode="contain"
                      source={BackBtn}
                      style={styles.whatsIncludedArrow}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <HeaderTextComponent
              mainText="What mothers say about us"
              callTextPresent={false}
              callText="View all"
              style={{}}
              mainTextStyle={{fontFamily: fonts.SecondaryDMSansBold}}
              callFuntion={() => {}}
            />

            <FlatList
              data={eligiblePackages?.app_meta_new[0]?.reviews}
              horizontal
              style={styles.flexFull}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.reviewCardList}
              renderItem={({item}) => {
                return (
                  <ReviewCard
                    source={item.image}
                    name={item.name}
                    score={item.score}
                    description={item.description}
                  />
                );
              }}
            />

            <View
              onLayout={event => {
                setOfferingIndex(event.nativeEvent.layout.y);
              }}>
              <ProductCarousel
                carousels={eligiblePackages?.app_meta_new[0]?.carousels}
              />
            </View>

            <View style={styles.w98}>
              <HeaderTextComponent
                mainText="FAQs"
                callTextPresent={false}
                callText="View all"
                style={{}}
                mainTextStyle={{fontFamily: fonts.SecondaryDMSansBold}}
                callFuntion={() => {}}
              />
              {eligiblePackages?.app_meta_new[0]?.faqs.map(item => {
                return (
                  <FAQComponent question={item.question} answer={item.answer} />
                );
              })}
            </View>
            <View style={styles.spacer} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default FreemiumPackageHomeScreen;

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  enrollView: {
    width: '40%',
    height: '100%',
  },
  dropDownView: {
    width: '52%',
    height: '100%',
  },
  selectedPackageInfo: {
    width: '55%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  selectedPackageView: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
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
    height: 170,
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
    paddingBottom: 10,
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
