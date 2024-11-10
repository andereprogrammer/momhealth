import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {Placeholder} from '../../../assets';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {Pallete, fonts} from '../../../theme/enum';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
type Props = {
  source: any;
  name: string;
  score: number;
  description: string;
};
const {width} = Dimensions.get('screen');

const TestimonialsCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.3,
          width: 50,
          height: 50,
          borderRadius: 50,
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: props.source}}
          resizeMethod="resize"
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          flex: 0.2,
        }}>
        <Text
          style={{
            fontFamily: fonts.SecondaryDMSansBold,
            fontSize: 17,
          }}>
          {props.name}
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StarRatingDisplay
          starSize={18}
          rating={props.score}
          starStyle={{
            margin: 0,
            padding: 0,
            width: 9,
            alignSelf: 'center',
          }}
          style={{
            width: '60%',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: horizontalScale(24),
          }}
          color={Pallete.Eggplant}
        />
      </View>
      <View
        style={{
          flex: 0.4,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontFamily: fonts.PrimaryJakartaMedium,
            color: '#000',
          }}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};

export default TestimonialsCard;

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    maxWidth: width - verticalScale(120),
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 8,
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    padding: 10,
  },
});
