import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';
import {horizontalScale} from '../../../../../helpers/layoutHelper';

type CareTeamCardProps = {
  image: string;
  name: string;
  qualifications: string;
  designation: string;
  experience: string;
};

const CareTeamCard = ({
  image = '',
  name = '',
  qualifications = '',
  designation = '',
  experience = '',
}: CareTeamCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          resizeMethod="resize"
          resizeMode="cover"
          source={{uri: image}}
          style={styles.imageAspect}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.qualification}>{qualifications}</Text>
        <Text style={styles.designation}>{designation}</Text>
        <Text style={styles.experience}>{experience} years of experience</Text>
      </View>
    </View>
  );
};

export default CareTeamCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(190),
    height: '100%',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  card: {
    width: '100%',
    height: '50%',
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imageAspect: {
    width: '100%',
    height: '100%',
  },
  textView: {
    width: '100%',
    height: '50%',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 16,
  },
  qualification: {
    fontFamily: fonts.PrimaryJakartaMedium,
    fontSize: 14,
    color: '#666666',
  },
  designation: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 15,
    color: '#6A6A6A',
  },
  experience: {
    fontFamily: fonts.PrimaryJakartaMedium,
    fontSize: 14,
    color: '#3A3A3A',
  },
});
