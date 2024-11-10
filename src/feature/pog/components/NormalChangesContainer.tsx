import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChangesInYourBodyCard from './ChangesInYourBodyCard';
import {commonStyles} from '../styles/pogStyles';
import {Pallete} from '../../../theme/enum';
type changeInYourBody = {
  title: string;
  description: string;
  image_link: string;
};
type NormalChangesContainerProps = {
  changesList: changeInYourBody[];
};

const NormalChangesContainer = ({changesList}: NormalChangesContainerProps) => {
  return (
    <View style={{}}>
      <Text style={[commonStyles.headingText, commonStyles.innerSpacing]}>
        Normal changes in your body
      </Text>
      <View style={[styles.listBackgroud, commonStyles.marginSpacing]}>
        {changesList.map((item, index) => {
          return <ChangesInYourBodyCard key={index} {...item} />;
        })}
      </View>
    </View>
  );
};

export default NormalChangesContainer;

const styles = StyleSheet.create({
  listBackgroud: {
    backgroundColor: Pallete.backgroundPink,
    borderRadius: 20,
  },
});
