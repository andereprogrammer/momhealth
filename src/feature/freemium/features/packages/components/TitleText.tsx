import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';

type Props = {
  type: string;
};

const TitleText = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.type === 'PREGNANCY' && (
        <Text style={styles.ensure}>
          Ensure a <Text style={styles.colorEnsure}>normal delivery, </Text>
          <Text style={styles.colorEnsure}>blissful pregnancy,</Text>
          and a <Text style={styles.colorEnsure}>bright future</Text> for your
          baby
        </Text>
      )}
      {props.type === 'POST_PARTUM' && (
        <Text style={styles.ensure}>
          Ensure a <Text style={styles.colorEnsure}>smooth recovery, </Text>
          <Text style={styles.colorEnsure}>a joyful post-delivery period,</Text>
          and a <Text style={styles.colorEnsure}>bright future</Text> for your
          baby
        </Text>
      )}
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  ensure: {
    color: '#8A3FAF',
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 25,
    letterSpacing: 1,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  colorEnsure: {
    color: '#60008E',
  },
});
