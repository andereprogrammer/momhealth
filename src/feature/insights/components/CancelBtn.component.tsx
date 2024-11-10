import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type CancelBtnProps = {
  onPress: (param: any) => void;
  active: boolean;
};

const CancelBtn = (props: CancelBtnProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(0);
      }}
      disabled={props.active}
      style={styles.btnView}>
      <Text>Clear all</Text>
    </TouchableOpacity>
  );
};

export default CancelBtn;

const styles = StyleSheet.create({
  btnView: {
    width: '48%',
    height: '83%',
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
