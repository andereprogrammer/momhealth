import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MotherInfo = ({motherData, heading}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading}</Text>
      <View style={styles.bulletContainer}>
        {Object.entries(motherData).map(([key, value]) => (
          <>
            {value ? (
              <Text key={key} style={styles.bullet}>
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
  },
  bulletContainer: {
    marginLeft: 16,
  },
  bullet: {
    fontSize: 14,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MotherInfo;
