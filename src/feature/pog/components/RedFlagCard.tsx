import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import ImageWithView from '../../../components/ImageWithView';
import {Placeholder} from '../../../assets';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';

type RedFlagCardProps = {
  redFlagTitle: string;
  listOfRedFlags: string[];
};

const RedFlagCard = ({redFlagTitle, listOfRedFlags}: RedFlagCardProps) => {
  return (
    <View>
      <Text style={[commonStyles.headingText, commonStyles.innerSpacing]}>
        {redFlagTitle}
      </Text>
      {listOfRedFlags.map((flag: string, index: number) => {
        return (
          <View
            key={index}
            style={[styles.headingContainer, commonStyles.marginInnerSpacing]}>
            <ImageWithView
              width={40}
              height={40}
              isLocalImage
              imageSource={Placeholder}
            />
            <Text>{flag}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default RedFlagCard;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
