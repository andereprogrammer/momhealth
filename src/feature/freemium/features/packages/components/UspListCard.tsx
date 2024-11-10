import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';
import {Ok} from '../../../../../assets';

type UspListCardProps = {
  usp: string;
};

const UspListCard = ({usp}: UspListCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          tintColor={'#60008E'}
          resizeMethod="resize"
          resizeMode="cover"
          source={Ok}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.uspText}>{usp}</Text>
        {usp.length < 20 && (
          <Text
            style={[
              styles.uspText,
              {
                opacity: 0,
              },
            ]}>
            {usp}
          </Text>
        )}
      </View>
    </View>
  );
};

export default UspListCard;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    flexDirection: 'row',
    gap: 2,
  },
  uspText: {
    fontSize: 15,
    fontFamily: fonts.PrimaryJakartaBold,
    color: '#60008E',
  },
  iconView: {
    width: 20,
    height: 20,
  },
});
