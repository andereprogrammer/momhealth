import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  AceLabourPackage,
  BackBtn,
  BloomAndBeginPackage,
  Bullet,
  BundleOfJoyPackage,
  DiabetesPackage,
  FoodIsLifePackage,
  FullRecoveryPackage,
  GlucoBalancePackage,
  HealthyMamaPackage,
  InnerPeakPackage,
  LabourPackage,
  LoveThatBumpPackage,
  MindsAtPeacePackage,
  PackageHand,
  PackageMoney,
  PelvicPrimePackage,
  YogaBlissPackage,
} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import theme from '../../../theme/Theme';
import {SelectList} from 'react-native-dropdown-select-list';
import Dropdown from './DropDown';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {
  initPackagePay,
  PatientPackage, PatientProgram,
  processPackagePay
} from "../../../api/packages";
import EasebuzzCheckout from 'react-native-easebuzz-kit';
import {
  Platform,
  Button,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Pallete, fonts} from '../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  type: string;
  benefits: string;
  description: string;
  packages: PatientPackage[];
  onPayment: (selectPackageId: string) => void;
  app_meta: any;
  website_meta: any;
};
const {height: SCREEN_Height} = Dimensions.get('screen');
const PackageCardComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [selectedPackageId, setSelectedPackageId] = React.useState<string>();
  const {width} = useWindowDimensions();
  const [selectedPack, setSelectedPack] = useState<PatientPackage>(
    props.packages[0],
  );
  const [valuePropotion, setValuePropotion] = useState('');
  const imageName = props.title.replace(/\s+/g, '-').toLowerCase();
  let imageSource;
  switch (imageName) {
    case 'love-that-bump':
      imageSource = LoveThatBumpPackage;
      break;
    case 'bundle-of-joy':
      imageSource = BundleOfJoyPackage;
      break;
    case 'diabetes-not-a-problem':
      imageSource = DiabetesPackage;
      break;
    case 'food-is-life':
      imageSource = FoodIsLifePackage;
      break;
    case 'full-recovery':
      imageSource = FullRecoveryPackage;
      break;
    case 'gluco-balance':
      imageSource = GlucoBalancePackage;
      break;
    case 'healthy-mama':
      imageSource = HealthyMamaPackage;
      break;
    case 'inner-peak':
      imageSource = InnerPeakPackage;
      break;
    case 'minds-at-peace':
      imageSource = MindsAtPeacePackage;
      break;
    case 'pelvic-prime':
      imageSource = PelvicPrimePackage;
      break;
    case 'labour-lifeline':
      imageSource = LabourPackage;
      break;
    case 'yoga-bliss':
      imageSource = YogaBlissPackage;
      break;
    case 'bloom-and-begin':
      imageSource = BloomAndBeginPackage;
      break;
    default:
      imageSource = AceLabourPackage;
  }

  const packagesDropDown = props.packages.map(pack => {
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
    let selected = props.packages.filter(pack => pack.id === id);
    setSelectedPack(selected[0]);
  };
  const [selected, setSelected] = React.useState('');
  const takeMetoPayment = async () => {
    let res = await initPackagePay(selectedPackageId);
    let initPackageResponse = res.data;
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
          console.log('paymentResponseRaw', res);
        });
        //handle the payment success & failed response here
      })
      .catch(error => {
        //handle sdk failure issue here
        console.log(error);
      });
  };
  let descriptionValues = props.description.split('\n\t\t')[0];
  useEffect(() => {
    if (props.description.split('\n\t\t')[1]) {
      setValuePropotion(props.description.split('\n\t\t')[1]);
    }
  }, []);

  return (
    <View
      style={{
        height:
          SCREEN_Height < 850
            ? width + verticalScale(150)
            : width + verticalScale(180),
        width: width,
        flexDirection: 'column',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          shadowColor: '#c3c3c3',
          shadowOpacity: 1,
          borderRadius: 15,
          backgroundColor: '#fff',
          shadowOffset: {
            width: 3,
            height: 4,
          },
          shadowRadius: 4,
        }}>
        {props.website_meta.section === 'main' && (
          <View
            style={{
              width: '100%',
              height: 25,
              backgroundColor: 'rgba(255, 222, 145, 1)',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              paddingVertical: 4,
            }}>
            <Text>Most Recommended</Text>
          </View>
        )}
        <View
          style={{
            width: '100%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'PlusJakartaSans-Bold',
                fontSize: 18,
              }}>
              {props.title}
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'PlusJakartaSans-Bold',
                fontSize: 14,
                flexWrap: 'wrap',
              }}>
              {props.type}
            </Text>
          </View>
        </View>
        <LinearGradient
          start={{x: 1, y: 0.1}}
          end={{x: 0.2, y: 1}}
          colors={['#a78bfc', '#34115b', '#42225d']}
          style={{
            width: '100%',
            height: '90%',
            flexDirection: 'column',
            position: 'relative',
            borderColor: '#e3e3e3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            padding: horizontalScale(10),
          }}>
          <View
            style={{
              width: '100%',
              height: verticalScale(120),
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: horizontalScale(5),
            }}>
            <View
              style={{
                width: '33%',
                height: '96%',
                shadowColor: '#34115b',
                shadowOpacity: 1,
                shadowRadius: 10,
                shadowOffset: {
                  width: 6,
                  height: 10,
                },
                borderRadius: 20,
                // overflow: 'hidden',
              }}>
              <Image
                resizeMethod="resize"
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
                source={imageSource}
              />
            </View>
            <View
              style={{
                width: '63%',
                justifyContent: 'space-between',
                height: '70%',
              }}>
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
                      color: '#fff',
                      fontSize: 24,
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
                    color: '#fff',
                    fontSize: 24,
                    fontFamily: fonts.SecondaryDMSansBold,
                  }}>
                  &#x20B9;
                  {selectedPack.amount}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  padding: 5,
                }}>
                <Dropdown passData={handleAmount} data={packagesDropDown} />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '40%',
              paddingHorizontal: horizontalScale(5),
              marginTop: verticalScale(10),
            }}>
            {descriptionValues.split('\n').map((it, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    marginVertical: 5,
                  }}>
                  <Image
                    source={Bullet}
                    style={{width: 20, height: 20}}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      flexWrap: 'wrap',
                      width: '90%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#fff',
                        flexWrap: 'wrap',
                      }}>
                      {it}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              height: verticalScale(90),
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: 10,
              marginVertical: 0,
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                paddingHorizontal: 10,
                flexWrap: 'wrap',
              }}>
              <View style={styles.circleContainer}>
                <View style={styles.circleCss}>
                  <Text style={[styles.circleText, {left: 5}]}>
                    {props.app_meta[0].activities_meta_offering.number}
                  </Text>

                  <Image
                    source={PackageHand}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    color: Pallete.plainWhite,
                    fontSize: 10,
                  }}>
                  {props.app_meta[0].activities_meta_offering.display}
                </Text>
              </View>
              <View style={styles.circleContainer}>
                <View style={styles.circleCss}>
                  <Text style={[styles.circleText, {left: 20}]}>
                    {props.app_meta[0].care_team_offering.number}
                  </Text>
                  <Image
                    source={PackageHand}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    color: Pallete.plainWhite,
                    fontSize: 10,
                  }}>
                  {props.app_meta[0].care_team_offering.display}
                </Text>
              </View>
              <View style={styles.circleContainer}>
                <View style={styles.circleCss}>
                  <Text
                    style={[styles.circleText, {left: horizontalScale(13)}]}>
                    {props.app_meta[0].health_trackers_offering.number}
                  </Text>

                  <Image source={PackageHand} />
                </View>
                <Text
                  style={{
                    color: Pallete.plainWhite,
                    fontSize: 10,
                  }}>
                  {props.app_meta[0].health_trackers_offering.display}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonView}>
            <View style={styles.btnTxt}>
              <TouchableOpacity
                style={styles.bunowBtn}
                onPress={() => props.onPayment(selectedPackageId)}>
                <Text style={styles.butNowtxt}>Buy now</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PackageFullDetailScreen', {
                    package: props,
                  })
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.learnMoreTxt}>Learn more</Text>
                <Image
                  source={BackBtn}
                  tintColor={Pallete.GoldenGlow}
                  style={styles.backBtnImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default React.memo(PackageCardComponent);

const styles = StyleSheet.create({
  btnTxt: {
    width: '55%',
    height: '100%',
  },
  butNowtxt: {
    color: '#000',
    fontSize: 18,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  bunowBtn: {
    backgroundColor: 'rgba(255, 222, 145, 1)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  circleText: {
    position: 'absolute',
    top: 8,
    fontSize: 22,
    zIndex: 10,
    color: Pallete.darkBlack,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  circleCss: {
    width: '50%',
    height: '60%',
    borderRadius: 40,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    position: 'relative',
    gap: 1,
    marginVertical: 5,
  },
  circleContainer: {height: 80, width: 100, alignItems: 'center'},
  buttonView: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: verticalScale(14),
    height: '10%',
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
  },
  activatedView: {
    position: 'absolute',
    bottom: 5,
    height: '8%',
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: '#e3e3e3',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
