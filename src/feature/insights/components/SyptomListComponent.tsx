import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {MoodValue} from '../../session/typings';
import SyptomTextComponent from './SyptomTextComponent';

type SyptomListProps = {
  moods: any;
  clickAction: (param: MoodValue) => void;
};

const SyptomListComponent = (syptoms: SyptomListProps) => {
  return (
    <View style={styles.mainView}>
      {syptoms.moods.map((mood: MoodValue) => {
        if (mood.type === 'PRIMARY') {
          return;
        }
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => syptoms.clickAction(mood)}
            key={mood.id}
            style={styles.btnView}>
            <SyptomTextComponent syptom={mood} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SyptomListComponent;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(10),
    height: '20%',
    width: '100%',
    flexWrap: 'wrap',
    gap: verticalScale(8),
    marginTop: verticalScale(10),
  },
  btnView: {
    width: '22%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
