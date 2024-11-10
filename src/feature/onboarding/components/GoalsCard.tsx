import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageWithView from '../../../components/ImageWithView';
import {Placeholder} from '../../../assets';
import {fonts, Pallete} from '../../../theme/enum';
import {MotiView} from 'moti';

type Props = {
  onGoalClicked: (index: number) => void;
  item: any;
  index: number;
};

const GoalsCard = ({onGoalClicked, item, index}: Props) => {
  console.log(item.image_link);
  return (
    <MotiView
      from={{opacity: 0}}
      animate={{opacity: 1}}
      style={{
        width: '44%',
        margin: 5,
        height: '23%',
        minHeight: 100,
      }}
      transition={{type: 'timing', duration: 500, delay: index * 300}}>
      <TouchableOpacity
        onPress={() => onGoalClicked(index)}
        style={[
          styles.container,
          {
            backgroundColor: item.selected
              ? '#9D75BB'
              : Pallete.cardBgLightPink,
          },
        ]}>
        <ImageWithView
          imageSource={item.image_link}
          isLocalImage={false}
          width={'48%'}
          height={'55%'}
          mode="contain"
        />
        <Text
          style={[styles.goalText, {color: item.selected ? '#fff' : '#000'}]}>
          {item.goal}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
};

export default GoalsCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: Pallete.shadowColor,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 12,
  },
  goalText: {
    paddingTop: 10,
    fontFamily: fonts.PrimaryJakartaBold,
    color: Pallete.EbonyGray,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});
