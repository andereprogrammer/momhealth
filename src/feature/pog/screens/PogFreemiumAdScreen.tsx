import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import {Cardbg} from '../../../assets';
import {commonStyles} from '../styles/pogStyles';
import {
  SCREEN_HEIGHT_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import {Pallete} from '../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BackHeader from '../../../components/MainContainer/BackHeader';

type Props = {};

const PogFreemiumAdScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000000000000000000,
        }}>
        <BackHeader title="" showHighlightedIcon bgcolor="transparent" />
      </View>
      <View style={{height: SCREEN_HEIGHT_WINDOW}}>
        <Video
          source={{
            uri: 'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/ad.mp4',
          }}
          repeat
          paused={false}
          resizeMode={'cover'}
          style={styles.videoContainer}
        />
      </View>

      <ImageBackground
        style={[commonStyles.spacing, styles.bottomCard]}
        borderRadius={20}
        resizeMethod="resize"
        resizeMode="cover"
        source={Cardbg}>
        <Text style={[commonStyles.headingText]}>
          To experience the interaction with baby in 3d
        </Text>
        <View
          style={[
            commonStyles.flexRow,
            commonStyles.marginSpacing,
            commonStyles.innerSpacing,
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              commonStyles.innerSpacing,
              {borderWidth: 1, borderColor: Pallete.Eggplant, borderRadius: 20},
            ]}>
            <Text style={[commonStyles.headingText]}>Back to home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FreemiumPackageNavigation')}
            style={[
              commonStyles.innerSpacing,
              {
                backgroundColor: Pallete.Eggplant,
                borderRadius: 20,
              },
            ]}>
            <Text style={[commonStyles.headingText, {color: '#fff'}]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PogFreemiumAdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignSelf: 'center',
  },
  btnSignup: {
    backgroundColor: Pallete.Eggplant,
  },
  bottomCard: {
    height: SCREEN_HEIGHT_WINDOW / 4,
    borderRadius: 20,
    position: 'absolute',
    bottom: -verticalScale(10),
    zIndex: 100000,
    left: 0,
    right: 0,
    alignSelf: 'center',
  },
});
