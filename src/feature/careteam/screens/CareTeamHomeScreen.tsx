import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircleDemo from '../../dashboard/components/Neumorphism/ProgressBar';
import theme from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Doctor, Instructor, ProfileCare, Scholar} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getCareTeam} from '../../../api/homeapis';
import {Pallete, fonts} from '../../../theme/enum';
import BackHeader from '../../../components/MainContainer/BackHeader';
import useDataProvider from '../../../context-store/useDataProvider';

// import { Container } from './styles';

const CareTeamHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [service_providers, setServiceProviders] = useState();
  const {patientDetails} = useDataProvider();
  useEffect(() => {
    setServiceProviders(patientDetails.care_team);
  }, [patientDetails]);

  return (
    <SafeAreaView
      style={[
        theme.textVariants.defaults,
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <BackHeader title="Care team" />

      <ScrollView
        style={{
          flex: 1,
          paddingVertical: verticalScale(20),
        }}>
        {service_providers !== undefined &&
          service_providers.service_providers.map((provider, i) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('CarePersonDetailsScreen', {
                    name: provider.name,
                    category: provider.category,
                    id: provider.id,
                  })
                }
                key={i}
                style={{
                  backgroundColor: '#FFF',
                  borderRadius: horizontalScale(25),
                  elevation: 10,
                  shadowColor: Pallete.Eggplant,
                  borderColor: '#FFD6F6',
                  // borderWidth: 2,
                  marginBottom: 15,
                  flexBasis: '100%',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  shadowOpacity: 0.6,
                  marginLeft: 5,
                  marginRight: 5,
                  shadowOffset: {
                    width: 1,
                    height: 4,
                  },
                  shadowRadius: 4,
                  width: '95%',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: horizontalScale(5),
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    paddingVertical: verticalScale(10),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '25%',
                      overflow: 'hidden',
                    }}>
                    <Image
                      resizeMethod="resize"
                      resizeMode="cover"
                      borderRadius={horizontalScale(10)}
                      style={{
                        width: '100%',
                        maxHeight: 100,
                        height: 70,
                      }}
                      source={
                        provider?.profile_image !== null
                          ? {uri: provider?.profile_image}
                          : Instructor
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: '60%',
                      paddingHorizontal: horizontalScale(5),
                      maxHeight: 'auto',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.SecondaryDMSansBold,
                        fontSize: 14,
                        color: '#000',
                      }}>
                      {provider.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.SecondaryDMSansMedium,
                        fontSize: 12,
                        color: '#777',
                        marginBottom: 5,
                      }}>
                      {provider.metadata?.designation
                        ? provider.metadata?.designation
                        : 'NA'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    // backgroundColor: '#FFF2FC',
                    borderBottomLeftRadius: horizontalScale(25),
                    borderBottomRightRadius: horizontalScale(25),
                    maxHeight: 'auto',
                  }}>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingVertical: verticalScale(5),
                      paddingHorizontal: horizontalScale(10),
                      flex: 1,
                    }}>
                    <View style={{width: '20%', height: '100%'}}>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                        source={Doctor}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: fonts.SecondaryDMSansMedium,
                        color: '#777',
                        fontSize: 12,
                        textAlign: 'left',
                      }}>
                      {provider.metadata?.experience
                        ? provider.metadata?.experience
                        : 'NA'}{' '}
                      experience
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingVertical: verticalScale(8),
                      paddingHorizontal: horizontalScale(10),
                      flex: 1,
                    }}>
                    <View style={{width: '20%', height: '100%'}}>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                        source={Scholar}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: fonts.SecondaryDMSansMedium,
                        color: '#777',
                        fontSize: 12,
                        textAlign: 'left',
                      }}>
                      {provider.metadata?.qualifications
                        ? provider.metadata?.qualifications
                        : 'NA'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        <View
          style={{
            height: 200,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CareTeamHomeScreen;
