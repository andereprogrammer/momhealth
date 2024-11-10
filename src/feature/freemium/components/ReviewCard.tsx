import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
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

const ReviewCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          flex: 0.26,
        }}>
        <View
          style={{
            flex: 0.2,
            borderRadius: 60,
            overflow: 'hidden',
            maxHeight: 50,
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
            flex: 0.7,
            gap: 10,
          }}>
          <View style={{width: '100%', paddingLeft: 20}}>
            <Text
              style={{
                fontFamily: fonts.PrimaryJakartaBold,
                fontSize: 20,
              }}>
              {props.name}
            </Text>
          </View>
          <View
            style={{
              height: '17%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: 10,
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
        </View>
      </View>

      <View
        style={{
          flex: 0.7,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontFamily: fonts.PrimaryJakartaExtraBold,
          }}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;

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
    elevation: 5,
    shadowColor: Platform.OS === 'ios' ? '#c3c3c3' : '#777',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    padding: 10,
  },
});
