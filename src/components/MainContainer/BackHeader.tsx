import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Image} from 'react-native';
import {BackBtn} from '../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../helpers/layoutHelper';
import {fonts, Pallete} from '../../theme/enum';
import HighlightedBackButton from '../HighlightedBackButton';

export type navigationProps = {
  navigate?: (screen?: string) => void;
  goBack?: () => void;
  SecondaryComponent?: ReactNode;
  title: string;
  bgcolor?: string;
  ConditionalScreen?: any;
  showHighlightedIcon?: boolean;
  titleColor?: any;
  //   reset: (index: number, routeNames: Routes[]) => void;
};

const BackHeader = (props: navigationProps) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  function takeMeback() {
    if (props?.ConditionalScreen !== undefined) {
      if (props?.ConditionalScreen?.params?.previous) {
        navigation.navigate('DashboardNavigationStack', {
          screen: 'HomeScreen',
        });
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: verticalScale(6),
        paddingHorizontal: horizontalScale(5),
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? 38 : 42,
        marginTop:
          Platform.OS === 'ios'
            ? props.showHighlightedIcon
              ? verticalScale(40)
              : 3
            : verticalScale(30),
      }}>
      <View
        style={[
          styles.viewStyle,
          props.bgcolor !== undefined
            ? {backgroundColor: props.bgcolor}
            : {backgroundColor: Pallete.plainWhite},
        ]}>
        {props.showHighlightedIcon ? (
          <HighlightedBackButton navigationCall={takeMeback} />
        ) : (
          <TouchableWithoutFeedback
            hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
            style={styles.buttonStyle}
            onPress={() => takeMeback()}>
            <Image
              style={styles.imageStyle}
              source={BackBtn}
              resizeMethod="resize"
              resizeMode="cover"
              tintColor={'#4C4055'}
            />
          </TouchableWithoutFeedback>
        )}

        <Text style={[styles.textStyle, {color: props.titleColor}]}>
          {props.title}
        </Text>
      </View>
      {props.SecondaryComponent}
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
    textAlign: 'left',
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
  },
  buttonStyle: {
    height: 38,
  },
  imageStyle: {
    width: 28,
    height: '100%',
    marginLeft: 10,
  },
});
