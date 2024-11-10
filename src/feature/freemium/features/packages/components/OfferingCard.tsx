import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';

type OfferingProps = {
  image: string;
  title: string;
  description: string;
};

const OfferingCard = ({image, title, description}: OfferingProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{uri: image}}
          resizeMethod="resize"
          resizeMode="cover"
          style={styles.imageAspect}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default OfferingCard;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    backgroundColor: '#fff',
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
    alignSelf: 'center',
  },
  card: {
    width: '28%',
    height: 100,
  },
  imageAspect: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  description: {
    paddingTop: 10,
    fontSize: 13,
    fontFamily: fonts.SecondaryDMSansMedium,
  },
  textContainer: {
    width: '66%',
  },
});
