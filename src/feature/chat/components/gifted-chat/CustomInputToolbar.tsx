import theme, { designPalette } from "../../../../theme/Theme";
import { Bubble, InputToolbar, MessageText } from "react-native-gifted-chat";
import React from 'react';
import { Platform, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../helpers/layoutHelper";

const CustomInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={[
        styles.inputBarStyle,
        props.keyboardView && Platform.OS === 'android' && styles.forAndroid,
      ]}
    />
  );
};

export default React.memo(CustomInputToolbar);


const styles = StyleSheet.create({
  forAndroid: {
    bottom: -90,
    position: 'absolute',
  },
  inputBarStyle: {
    backgroundColor: '#fff',
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(12),
    marginTop: verticalScale(15),
    width: '82%',
    // height: verticalScale(40),
  },
});
