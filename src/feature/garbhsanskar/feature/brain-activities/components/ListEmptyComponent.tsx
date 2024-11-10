import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PuzzleCompleted} from '../../../../../assets';
import {fonts, Pallete} from '../../../../../theme/enum';
import PuzzleCompletedGift from './PuzzleCompletedGift';

const ListEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Congrats!</Text>
          <Text style={styles.successText}>
            {'You did it!\nHigh fives all around!'}
          </Text>
        </View>
        <Image source={PuzzleCompleted} style={styles.imageStyle} />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.iconContainer}>
          <PuzzleCompletedGift />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F4FF',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#B467E9',
  },
  rowView: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  successText: {
    marginTop: 4,
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 24,
    color: Pallete.darkBlack,
  },
  textStyle: {
    fontFamily: fonts.PrimaryJakartaMedium,
    fontSize: 16,
    color: '#877777',
  },
  textContainer: {
    width: '45%',
    paddingTop: 12,
  },
  imageStyle: {
    width: '50%',
    aspectRatio: 1,
  },
  progressContainer: {
    borderRadius: 12,
    backgroundColor: '#24B874',
    width: '100%',
    height: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    top: -15,
    zIndex: 20,
  },
});

export default ListEmptyComponent;
