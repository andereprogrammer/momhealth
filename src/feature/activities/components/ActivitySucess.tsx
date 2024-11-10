import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {
  message: string;
  home: string;
  time: number;
  dontTakeMe?: boolean;
  onSuccess: () => void;
};

const ActivitySucess = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  useEffect(() => {
    setTimeout(() => {
      if (!props.dontTakeMe) {
        props.onSuccess();
        navigation.navigate(props.home);
      } else {
        props.onSuccess();
      }
    }, props.time);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LottieView
        style={{
          flex: 1,
        }}
        autoPlay
        speed={0.8}
        source={require('../../../assets/animations/success.json')}></LottieView>
      <View
        style={{
          flex: 0.3,
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'PlusJakartaSans-Bold',
          }}>
          {props.message}
        </Text>
      </View>
    </View>
  );
};

export default ActivitySucess;

const styles = StyleSheet.create({});
