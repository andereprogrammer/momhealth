import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {fonts, Pallete} from '../../../../../theme/enum';

type Props = {
  callText: string;
  selected: boolean;
};

const GradientButton = ({callText, selected}: Props) => {
  return (
    <>
      {selected ? (
        <LinearGradient
          style={[styles.container]}
          useAngle={true}
          angle={130}
          start={{
            x: 0,
            y: 5,
          }}
          end={{
            x: 1,
            y: 0,
          }}
          colors={['#fff', '#fff', '#d3d3d3']}>
          <Text style={styles.text}>{callText}</Text>
        </LinearGradient>
      ) : (
        <View
          style={[
            {
              backgroundColor: '#c3c3c3',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            },
          ]}>
          <Text style={styles.text}>{callText}</Text>
        </View>
      )}
    </>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    color: '#000',
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 17,
  },
});
