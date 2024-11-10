import React from 'react';
import {Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {commonStyles} from '../styles/pogStyles';
import {stringLiterals} from '../constants';
import ImageWithView from '../../../components/ImageWithView';
import {Playbtn3d} from '../../../assets';
import {MotiView} from 'moti';
import {Pallete} from '../../../theme/enum';

type Props = {
  screenName: string;
};

const View3dBtn = ({screenName}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const navigateTo = () => {
    navigation.navigate(screenName);
  };
  return (
    <MotiView
      from={{scale: 1}}
      exit={{scale: 1.1}}
      animate={{scale: 1.1}}
      transition={{repeat: -1, duration: 3000, type: 'timing'}}>
      <View style={[styles.container]}>
        <LinearGradient
          useAngle
          angle={90}
          style={[
            {
              width: '100%',
              height: '100%',
              borderRadius: 20,
              paddingHorizontal: 7,
              paddingVertical: 8,
            },
            commonStyles.shadow,
          ]}
          colors={[Pallete.Eggplant, Pallete.Whitishpink]}>
          <TouchableOpacity
            style={[commonStyles.flexRow, styles.btnContainer]}
            onPress={navigateTo}>
            <ImageWithView
              width={23}
              height={23}
              isLocalImage
              imageSource={Playbtn3d}
            />
            <Text style={[commonStyles.secondaryHeading]}>
              Interact with the baby ❤️
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </MotiView>
  );
};

export default View3dBtn;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
  },
  btnContainer: {
    gap: 5,
    alignItems: 'center',
  },
});
