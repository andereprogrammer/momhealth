import {
  Alert,
  BackHandler,
  Image,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import theme from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {
  BookIcon,
  BurgerIcon,
  CareTeam,
  ChatI,
  CloudIcon,
  Community,
  Content,
  Cross,
  DeleteAccount,
  Logout,
  Placeholder,
  Privacy,
  Profile,
  ProfileDefault,
  Support,
  Terms,
} from '../../../assets';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHomeScreenInfo} from '../../../api/homeapis';
import {navigationProps} from '../../onboarding/screens/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ActivePackagesInfoCard from '../../packages/components/ActivePackagesInfoCard';
import useDataProvider from '../../../context-store/useDataProvider';
import {ActivePackage} from '../../../api/types';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import RNRestart from 'react-native-restart';
import {deactivate} from '../../../api/userCreationHelper';
import {Pallete} from '../../../theme/enum';
import DeviceInfo from 'react-native-device-info';
import {reset} from '@amplitude/analytics-react-native';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';

type Props = {};

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  blood_group: string;
  doctor: null | any; // Replace 'any' with the actual type of 'doctor' if needed
  profile_image: null | any; // Replace 'any' with the actual type of 'profile_image' if needed
  status: string;
};

type CareTeam = {
  service_providers: any[]; // Replace 'any' with the actual type of 'service_providers' if needed
};

type PregnancyStage = {
  trimester: number;
  pregnancy_days: number;
  desc: string;
  avg_weight: number;
  avg_height: number;
};

type PatientData = {
  patient: Patient;
  care_team: CareTeam;
  pregnancy_stage: PregnancyStage;
  articles: null | any; // Replace 'any' with the actual type of 'articles' if needed
  patient_packages: any[]; // Replace 'any' with the actual type of 'patient_packages' if needed
};

const ProfileHomeScreen = (props: Props) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<navigationProps>();
  const {activePackages, patientDetails, photoCounter} = useDataProvider();
  const [loading, setLoading] = useState(true);
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [hasTwoPackage, setHasTwoPackage] = useState(false);
  const [activePackage, setActivePackage] = useState<ActivePackage>(null);
  const [photo, setphoto] = useState(null);
  function daysToWeeks(days) {
    const daysInAWeek = 7;
    const weeks = Math.floor(days / daysInAWeek);
    if (weeks === 1) {
      return `${weeks} week`;
    } else {
      return `${weeks} weeks`;
    }
  }

  const [data, setData] = useState<PatientData>();

  function getData() {
    setLoading(true);
    if (activePackages.length > 0) {
      setHasActivePackage(true);
      if (activePackages.length > 1) {
        setHasTwoPackage(true);
      }
    }
    setData(patientDetails);
    console.log('patientDetails', patientDetails);
    setLoading(false);
  }

  useEffect(() => {
    if (patientDetails?.patient?.profile_image) {
      let photoStr =
        patientDetails?.patient?.profile_image + '?' + photoCounter;
      setphoto(photoStr);
    }
  }, [photoCounter]);

  useEffect(() => {
    setData(patientDetails);
  }, [patientDetails]);

  const handleContactPress = () => {
    const email = 'info@everheal.com';
    const subject = 'Support Inquiry';

    Linking.openURL(`mailto:${email}?subject=${subject}`).catch(err =>
      console.error('Error opening email app:', err),
    );
  };

  useEffect(() => {
    getData();
  }, [activePackages]);
  const logout = () => {
    let userLoggedPromise = AsyncStorage.removeItem('userLogged');
    let accessTokenPromise = AsyncStorage.removeItem('access_token');
    let refreshTokenPromise = AsyncStorage.removeItem('refresh_token');
    Promise.all([
      userLoggedPromise,
      accessTokenPromise,
      refreshTokenPromise,
    ]).then(value => {
      console.log('Removed All');
      reset();
      RNRestart.restart();
    });
  };

  const deactivateAccount = () => {
    trigger('impactHeavy', options);
    Alert.alert('Delete account', 'Do you really want to delete account ?', [
      {
        text: 'Yes',
        onPress: deactivateAccountAndLogout,
        style: 'destructive',
      },
      {
        text: 'No',
        onPress: doNothing,
        style: 'cancel',
      },
    ]);
  };

  const deactivateAccountAndLogout = () => {
    console.log('Deactivation triggered');
    deactivate().then(() => {
      logout();
    });
  };
  const doNothing = () => {
    console.log('Deactivation not needed');
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{flex: 1, backgroundColor: '#fff'}}
      // refreshControl={
      //   <RefreshControl refreshing={loading} onRefresh={getData} />}
    >
      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <>
          <View style={theme.textVariants.defaults}>
            <CustomHeader title="My Profile" />
            <View style={styles.mainView}>
              <View style={styles.cardView}>
                <View style={styles.profimgview}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={photo !== null ? {uri: photo} : ProfileDefault}
                    style={styles.profimg}
                  />
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.nameText}>{data?.patient?.name}</Text>
                  <Text style={styles.phoneTest}>{data?.patient?.phone}</Text>
                  <Text style={styles.trimesterText}>
                    Doctor ({data?.patient?.doctor ?? 'Unassigned'})
                  </Text>
                  {data?.pregnancy_stage && (
                    <View style={styles.pregDetails}>
                      <Text style={styles.trimesterText}>
                        Trimester {data?.pregnancy_stage?.trimester}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'DMSans-Medium',
                          fontSize: 12,
                          color: '#000',
                        }}>
                        POG :{' '}
                        {daysToWeeks(data?.pregnancy_stage?.pregnancy_days)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <HeadingFontComponent
              style={{fontSize: 16, paddingHorizontal: horizontalScale(20)}}>
              Your packages
            </HeadingFontComponent>

            {hasActivePackage && (
              <ActivePackagesInfoCard
                style={{
                  width: '100%',
                  paddingHorizontal: horizontalScale(10),
                  height: '12%',
                }}
                package={activePackages[0]}
                message=""
              />
            )}

            {/* <HeadingFontComponent
          style={{fontSize: 16, paddingHorizontal: horizontalScale(20)}}>
          Read & Discuss
        </HeadingFontComponent> */}
            {data?.patient.status === 'ACTIVE' && (
              <View style={styles.firstRow}>
                <View style={styles.firstRowCard}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PackagesFlowNavigation')
                    }
                    style={{
                      width: '30%',
                      height: '80%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                    }}>
                    <View
                      style={{
                        width: '80%',
                        height: '70%',
                        backgroundColor: theme.colors.inputBg,
                        alignItems: 'center',
                        borderRadius: horizontalScale(10),

                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: '60%', height: '60%'}}
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={BookIcon}
                      />
                    </View>
                    <Text>Packages</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
              onPress={() => navigation.navigate('CareTeamFlowNavigation')}
              style={styles.contentView}>
              <View
                style={{
                  width: '80%',
                  height: '70%',
                  backgroundColor: theme.colors.inputBg,
                  alignItems: 'center',
                  borderRadius: horizontalScale(10),

                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: '60%', height: '60%'}}
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={CloudIcon}
                />
              </View>
              <Text>Care Team</Text>
            </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ChatScreenNavigation')}
                    style={styles.contentView}>
                    <View
                      style={{
                        width: '80%',
                        height: '70%',
                        backgroundColor: theme.colors.inputBg,
                        alignItems: 'center',
                        borderRadius: horizontalScale(10),

                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: '60%', height: '60%'}}
                        resizeMethod="resize"
                        resizeMode="contain"
                        tintColor={'#000'}
                        source={ChatI}
                      />
                    </View>
                    <Text>Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* <HeadingFontComponent
          style={{fontSize: 16, paddingHorizontal: horizontalScale(20)}}>
          Membership
        </HeadingFontComponent> */}
            {/* <View
          style={{
            width: '100%',
            height: '8%',
            marginVertical: verticalScale(8),
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: horizontalScale(25),
              flexDirection: 'row',
              alignItems: 'center',
              gap: 30,
            }}></View>
        </View> */}
            {/* <HeadingFontComponent
        style={{fontSize: 16, paddingHorizontal: horizontalScale(20)}}>
        Access & Share
      </HeadingFontComponent>
      <View
        style={{
          width: '100%',
          height: '10%',
          marginVertical: verticalScale(15),
        }}>
        <View
          style={{
            width: '70%',
            height: '100%',
            paddingHorizontal: horizontalScale(25),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '24%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: '70%',
                backgroundColor: theme.colors.inputBg,
                alignItems: 'center',
                borderRadius: horizontalScale(10),

                justifyContent: 'center',
              }}>
              <Image
                style={{width: '60%', height: '60%'}}
                resizeMethod="resize"
                resizeMode="contain"
                source={CloudIcon}
              />
            </View>
            <Text>Cloud </Text>
          </View>
          <View
            style={{
              width: '24%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: '70%',
                backgroundColor: theme.colors.inputBg,
                alignItems: 'center',
                borderRadius: horizontalScale(10),

                justifyContent: 'center',
              }}>
              <Image
                style={{width: '60%', height: '60%'}}
                resizeMethod="resize"
                resizeMode="contain"
                source={BookIcon}
              />
            </View>
            <Text>Cloud </Text>
          </View>
        </View>
      </View> */}
            <View
              style={{
                width: '100%',
                height: verticalScale(150),
                paddingHorizontal: horizontalScale(10),
                marginVertical: verticalScale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '96%',
                  height: '100%',
                  backgroundColor: 'rgba(246, 246, 246, 1)',
                  borderRadius: horizontalScale(20),
                  paddingVertical: verticalScale(10),
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '60%',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderColor: '#c3c3c3',
                    paddingVertical: verticalScale(5),
                  }}>
                  <TouchableOpacity
                    onPress={handleContactPress}
                    style={{
                      width: '50%',
                      height: '25%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '30%', height: '95%'}}>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                        source={Support}
                      />
                    </View>
                    <Text style={{fontFamily: 'DMSans-Bold'}}>Support</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                    style={{
                      width: '50%',
                      height: '25%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '30%', height: '95%'}}>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                        source={Privacy}
                      />
                    </View>
                    <Text style={{fontFamily: 'DMSans-Bold'}}>
                      Privacy policy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Terms')}
                    style={{
                      width: '50%',
                      height: '25%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '30%', height: '95%'}}>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                        source={Terms}
                      />
                    </View>

                    <Text style={{fontFamily: 'DMSans-Bold'}}>
                      Terms and conditions
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={logout}
                  style={{
                    width: '40%',
                    height: '20%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      height: '80%',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Image
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{width: '70%', height: '70%'}}
                      source={Logout}
                    />
                  </View>
                  <Text
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      justifyContent: 'center',
                      paddingTop: horizontalScale(10),
                      fontFamily: 'DMSans-Bold',
                    }}>
                    Log Out
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deactivateAccount}
                  style={{
                    width: '40%',
                    height: '20%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      height: '80%',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Image
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{width: '90%', height: '70%'}}
                      source={DeleteAccount}
                    />
                  </View>
                  <Text
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      justifyContent: 'center',
                      paddingTop: horizontalScale(10),
                      fontFamily: 'DMSans-Bold',
                      color: 'red',
                    }}>
                    Delete account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                App Version: {DeviceInfo.getReadableVersion()}
              </Text>
            </View>
            <View
              style={{height: verticalScale(300), backgroundColor: '#fff'}}
            />
          </View>
          <View style={{height: verticalScale(30), backgroundColor: '#fff'}} />
        </>
      )}
    </ScrollView>
  );
};

export default ProfileHomeScreen;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '13%',
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  cardView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: horizontalScale(20),
    alignItems: 'center',
    paddingVertical: 5,
    elevation: 30,
    shadowColor: '#C3C3C3',
    shadowOpacity: 0.8,
    shadowOffset: {width: 1, height: 1},
  },
  profimgview: {
    width: 115,
    height: 115,
    borderRadius: horizontalScale(5),
    paddingHorizontal: horizontalScale(10),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profimg: {
    width: '100%',
    height: '80%',
    borderRadius: horizontalScale(20),
    overflow: 'hidden',
  },
  detailsView: {
    width: '70%',
    height: '80%',
    borderRadius: horizontalScale(10),
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: horizontalScale(5),
  },
  nameText: {fontFamily: 'DMSans-Medium', fontSize: 14, color: '#000'},
  phoneTest: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#000',
  },
  pregDetails: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: horizontalScale(5),
    // paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(2),
    gap: horizontalScale(35),
  },
  firstRow: {
    width: '100%',
    height: '8%',
    marginVertical: verticalScale(5),
  },
  firstRowCard: {
    width: '90%',
    height: '100%',
    paddingHorizontal: horizontalScale(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  trimesterText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#000',
  },
  secondRow: {
    width: '30%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secordRowCard: {
    width: '80%',
    height: '70%',
    backgroundColor: theme.colors.inputBg,
    alignItems: 'center',
    borderRadius: horizontalScale(10),

    justifyContent: 'center',
  },
  contentView: {
    width: '30%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
