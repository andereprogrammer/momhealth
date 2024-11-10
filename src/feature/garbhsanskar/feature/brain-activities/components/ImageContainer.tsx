import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {BrainActivityContainer, StartPuzzle} from '../../../../../assets';
import {fonts, Pallete} from '../../../../../theme/enum';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';
import {ImageContainerProps} from '../interface';

const {width} = Dimensions.get('window');

const ImageContainer = ({
  loading,
  puzzle,
  onImagePress,
}: ImageContainerProps) => {
  if (loading)
    return (
      <Shimmer
        width={width - 32}
        height={(width - 32) / 3.4}
        customStyle={styles.background}
      />
    );
  if (puzzle !== null)
    {return (
        <ImageBackground resizeMode='cover' source={BrainActivityContainer} style={styles.background}>
            <TouchableOpacity onPress={onImagePress} style={styles.imageContainer}>
            <Text style={styles.crosswordText}>{puzzle.name}</Text>
            <View>
                <Image source={StartPuzzle} resizeMode='cover' style={styles.imageStyle} />
                <Text>Start</Text>
            </View>
            </TouchableOpacity>
        </ImageBackground>
    );}
  return null;
};

export default ImageContainer;

const styles = StyleSheet.create({
  crosswordText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 24,
    color: Pallete.darkBlack,
    marginBottom: 8,
  },
  dayText: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 16,
    color: Pallete.darkBlack,
  },
  background: {
    width: width - 32,
    aspectRatio: 3.4,
  },
  imageContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    width: 38,
    maxHeight: 38,
  },
});
