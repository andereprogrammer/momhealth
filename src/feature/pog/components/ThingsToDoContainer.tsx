import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThingsToDoCard from './ThingsToDoCard';
import {commonStyles} from '../styles/pogStyles';
import {Pallete} from '../../../theme/enum';
import {stringLiterals} from '../constants';
type ThingsToDoDetails = {
  title: string;
  description_in_markdown: string;
  image_link: string | undefined | '' | ImageProps;
};
type ThingsToDoContainerProps = {
  thingsToDo: ThingsToDoDetails[];
};

const ThingsToDoContainer = ({thingsToDo}: ThingsToDoContainerProps) => {
  return (
    <View style={[commonStyles.innerSpacing, styles.listBackgroud]}>
      <Text style={[commonStyles.headingText, styles.textSpacing]}>
        {stringLiterals.THING_TO_DO}
      </Text>
      {thingsToDo.map((item, index) => {
        return <ThingsToDoCard key={index} {...item} />;
      })}
    </View>
  );
};

export default ThingsToDoContainer;

const styles = StyleSheet.create({
  listBackgroud: {
    backgroundColor: Pallete.plainWhite,
    borderRadius: 20,
  },
  textSpacing: {
    paddingBottom: 5,
  },
});
