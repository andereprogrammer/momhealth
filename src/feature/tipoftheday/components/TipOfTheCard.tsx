import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts, Pallete} from '../../../theme/enum';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TipOfTheDayItem} from '../../../constants/types';

const TipOfTheCard = ({
  content,
  created,
  date,
  title,
  image,
  id,
}: TipOfTheDayItem) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('TipOfTheDayScreen', {id: id})}
      style={styles.container}>
      <View style={styles.imageView}>
        <Image
          resizeMethod="resize"
          resizeMode="cover"
          borderRadius={20}
          style={styles.imageAspect}
          source={{uri: image}}
        />
      </View>
      <View style={{flex: 0.8, padding: 1}}>
        <Text style={styles.title}>
          {title}
          <Text style={{fontSize: 13, textDecorationLine: 'underline'}}>
            ... read more
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TipOfTheCard;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH_WINDOW / 1.15,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 3,
    alignSelf: 'center',
    height: SCREEN_WIDTH_WINDOW / 4.1,
    marginHorizontal: 10,
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
  },
  imageView: {
    flex: 0.23,
    margin: 5,
    borderRadius: 20,
    height: '74%',
    padding: 3,
  },
  imageAspect: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: Pallete.Eggplant,
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 16,
  },
});
