import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Pallete, fonts} from '../../../theme/enum';

type JounralTextProps = {
  onValueChange: (param: string) => void;
  journalValue: string;
  canEdit: boolean;
  labelText: string;
};

const JounralTextComponent = (props: JounralTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>{props.labelText}</Text>
      <View style={styles.inputView}>
        <TextInput
          value={props.journalValue}
          multiline
          editable={props.canEdit}
          style={styles.inputStyle}
          onChangeText={text => props.onValueChange(text)}
          placeholder="Describe how you are feeling today.You can also use this space as a personal journal..."
          placeholderTextColor={'#c3c3c3'}
        />
      </View>
    </View>
  );
};

export default JounralTextComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(90),
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textHeading: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    paddingHorizontal: horizontalScale(20),
    color: Pallete.darkBlack,
  },
  inputView: {
    width: '100%',
    height: '90%',
    paddingHorizontal: horizontalScale(20),
    marginVertical: verticalScale(5),
  },
  inputStyle: {
    width: '100%',
    height: '100%',
    borderRadius: horizontalScale(15),
    borderWidth: 1,
    borderColor: '#c3c3c3',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    flexWrap: 'nowrap',
    overflow: 'scroll',
    padding: horizontalScale(15),
    flexDirection: 'column',
  },
});
