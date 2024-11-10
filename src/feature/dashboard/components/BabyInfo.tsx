import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Pallete} from '../../../theme/enum';

const BabyInfo = ({babyData, heading}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading} Development </Text>
      <View style={styles.bulletContainer}>
        {babyData.split('\n').map((value, i) => (
          <>
            {value ? (
              <Text key={i} style={styles.bullet}>
                • {value}
              </Text>
            ) : null}
          </>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Pallete.plainWhite,
  },
  bulletContainer: {
    marginLeft: 16,
  },
  bullet: {
    fontSize: 14,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    color: Pallete.plainWhite,
  },
});

export default BabyInfo;
