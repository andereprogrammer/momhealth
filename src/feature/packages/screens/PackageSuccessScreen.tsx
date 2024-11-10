import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {Trophy} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getPatientBasic} from '../../../api/homeapis';
import useDataProvider from '../../../context-store/useDataProvider';
import {navigationOnLoad} from '../../../components/InputComponent/PressableOTPComponent';

const PackageSuccessScreen = ({navigation, route}) => {
  const {amount, status, payment_id, package_name} = route.params;
  const {patientBasicDetails, setIsLogged, setFreemium} = useDataProvider();
  const takeMeToPackages = () => {
    navigation.navigate('PackagesHomeScreen');
  };

  useEffect(() => {
    console.log('patientBasicDetails',patientBasicDetails);
  }, []);

  const handleNavigation = () => {
    navigationOnLoad(patientBasicDetails?.status, setIsLogged, navigation,setFreemium);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 40,
      }}>
      <View
        style={{
          width: '50%',
          height: '30%',
          backgroundColor: '#EFE8F4',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: '70%',
            height: '60%',
          }}
          source={Trophy}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            color: '#0F0412',
          }}>
          Payment Successfull{' '}
        </Text>
      </View>
      <View
        style={{
          width: '93%',
          height: '20%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF2FF',
          padding: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '95%',
              height: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '40%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#a3a3a3',
                }}>
                Amount
              </Text>
              <Text>&#8377; {amount}</Text>
            </View>
            <View
              style={{
                width: '40%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#a3a3a3',
                }}>
                Transaction Status
              </Text>
              <Text>{status}</Text>
            </View>
          </View>
          <View
            style={{
              width: '95%',
              height: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '40%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#a3a3a3',
                }}>
                Transaction Id
              </Text>
              <Text>{payment_id}</Text>
            </View>
            <View
              style={{
                width: '40%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#a3a3a3',
                }}>
                Package
              </Text>
              <Text>{package_name}</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text>Congratulations on your purchase !</Text>
      </View>

      <TouchableOpacity
        onPress={handleNavigation}
        style={{
          width: '90%',
          height: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#4C0F79',
          padding: 5,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {patientBasicDetails.status === 'ACTIVE' ? 'Home' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PackageSuccessScreen;

const styles = StyleSheet.create({});
