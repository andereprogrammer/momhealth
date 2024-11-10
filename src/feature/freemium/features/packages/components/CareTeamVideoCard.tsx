import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';
import {horizontalScale} from '../../../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import {Play, PlayBtn, PlayBtnFilled} from '../../../../../assets';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type CareTeamVideoCardProps = {
  image: string;
  name: string;
  qualifications: string;
  designation: string;
  experience: string;
  video: string;
};

const CareTeamVideoCard = ({
  image = '',
  name = '',
  qualifications = '',
  designation = '',
  experience = '',
  video = '',
}: CareTeamVideoCardProps) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const takeMeThere = () => {
    if (video !== null && video !== undefined) {
      navigation.navigate('VideoScreen', {
        url: video,
      });
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={takeMeThere}>
      <ImageBackground
        resizeMethod="resize"
        resizeMode="cover"
        source={{uri: image}}
        style={styles.imageAspect}>
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}>
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            useAngle={true}
            angle={130}
            colors={['rgba(0,0,0,0.3)', 'transparent']}
            style={styles.card}>
            <View style={styles.textView}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.qualification}>{qualifications}</Text>
              <Text style={styles.designation}>{designation}</Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text style={styles.experience}>
                {experience} years of experience
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                }}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={PlayBtnFilled}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CareTeamVideoCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(300),
    height: '100%',
    borderRadius: 20,
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
    borderWidth: 1,
    borderColor: '#fff',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageAspect: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  textView: {
    width: '100%',
    height: '80%',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  name: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 18,
    color: '#f1f1f1',
  },
  qualification: {
    fontFamily: fonts.PrimaryJakartaMedium,
    fontSize: 15,
    color: '#fff',
  },
  designation: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 15,
    color: '#f1f1f1',
  },
  experience: {
    fontFamily: fonts.PrimaryJakartaMedium,
    fontSize: 14,
    color: '#f1f1f1',
  },
});
