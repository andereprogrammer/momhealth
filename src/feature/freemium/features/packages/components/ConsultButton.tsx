import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SupportIcon} from '../../../../../assets';
import {fonts} from '../../../../../theme/enum';

type ConsultButtonProps = {
  onClick: () => void;
};

const ConsultButton = ({onClick}: ConsultButtonProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.btnContainer}>
      <Text
        style={{
          fontSize: 17,
          fontFamily: fonts.PrimaryJakartaBold,
        }}>
        Consult before purchase
      </Text>
      <View
        style={{
          width: 30,
          height: 30,
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
          source={SupportIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ConsultButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#FFDD90',
    borderRadius: 30,
    alignSelf: 'center',
    paddingVertical: 6,
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
});
