import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles';

const NoTipFound = () => {
  return (
    <View style={styles.container}>
      <Text style={commonStyles.headingText}>Tip not found</Text>
    </View>
  );
};

export default NoTipFound;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
