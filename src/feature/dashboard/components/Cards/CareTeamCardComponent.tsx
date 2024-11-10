import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BackBtn, CareTeam, Instructor, Placeholder} from '../../../../assets';
import {horizontalScale} from '../../../../helpers/layoutHelper';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {designPalette} from '../../../../theme/Theme';
import {fonts} from '../../../../theme/enum';
type CarePerson = {
  name: string;
  image?: any | null; //TODO : add type for ImageSourcePropType
};
const CareTeamCardComponent: React.FC<CarePerson> = props => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
    navigation.navigate('CareTeamFlowNavigation');
  };
  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    const animatedheight = open ? withTiming('50%') : withTiming('0%');
    return {
      width: '100%',
      height: animatedheight,
      display: 'flex',
      flexDirection: 'row',
    };
  });
  return (
    <View style={styles.mainView}>
      <View style={styles.containerView}>
        <View style={styles.imageView}>
          <Image
            source={props.image ? {uri: props.image} : Instructor}
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.imageAspect}
          />
          <View style={styles.textView}>
            <Text style={styles.carePersonName}>{props.name}</Text>
            <Text style={styles.carePersonDesg}>Care coordinator</Text>
          </View>
          <View style={{width: '70%'}} />
        </View>
      </View>
      <Animated.View style={styles.expandableCardView}>
        <TouchableOpacity
          onPress={handleClick}
          activeOpacity={1}
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.cardHeadingText}>My care team</Text>
          <Image
            source={BackBtn}
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.imageAspectCarePerson}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default CareTeamCardComponent;

const styles = StyleSheet.create({
  namefont: {
    fontSize: 12,
  },
  categoryFont: {
    fontSize: 12,
  },
  cardView: {
    width: '32%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: horizontalScale(20),
    display: 'none',
  },
  serviceProviderProfImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profImg: {
    width: '100%',
    height: '100%',
  },
  nameServiceView: {
    flexDirection: 'column',
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: horizontalScale(20),
    elevation: 12,
    shadowColor: '#471FB9',
    shadowRadius: 13,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    marginBottom: 10,
    padding: horizontalScale(10),
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '65%',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#F4EDFE',
    padding: horizontalScale(5),
  },
  imageView: {
    width: '50%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: horizontalScale(5),
    marginVertical: horizontalScale(5),
  },
  imageAspect: {
    width: '30%',
    height: '100%',
    borderRadius: horizontalScale(60),
  },
  textView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: horizontalScale(0),
  },
  carePersonName: {
    textAlign: 'center',
    fontFamily: fonts.SecondaryDMSansBold,
    paddingLeft: horizontalScale(10),
  },
  carePersonDesg: {
    textAlign: 'center',
    color: '#929292',
    fontFamily: fonts.SecondaryDMSansBold,
    paddingLeft: horizontalScale(10),
  },
  expandableCardView: {
    flexDirection: 'column',
    width: '100%',
    height: '30%',
    paddingHorizontal: horizontalScale(10),
  },
  cardHeadingText: {
    color: designPalette.primary.PinkHopbrush,
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
  },
  imageAspectCarePerson: {
    width: '20%',
    height: '60%',
    transform: [{rotate: '180deg'}],
  },
  careHeadingText: {},
});
