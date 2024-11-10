import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../helpers/layoutHelper';
import {Pallete} from '../theme/enum';

type Props = {
  onClickFn: () => void;
  iconAsset: ImageProps;
  iconColor: string;
  variant: 'box' | 'circle';
};

const ClickableIcon = ({
  onClickFn,
  iconAsset,
  iconColor,
  variant = 'box',
}: Props) => {
  const borderStyling = {
    borderWidth: 1,
    borderColor: Pallete.Eggplant,
    borderRadius: 80,
  };

  return (
    <TouchableOpacity onPress={onClickFn} style={[styles.container]}>
      <View style={[styles.imageAspect]}>
        <Image
          source={iconAsset}
          tintColor={iconColor ?? '#fff'}
          resizeMethod="resize"
          resizeMode="cover"
          style={[
            styles.imageSizing,
            variant === 'circle' ? borderStyling : null,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ClickableIcon;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(35),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAspect: {
    height: verticalScale(40),
    width: horizontalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSizing: {width: '55%', height: '50%', padding: 2},
});
