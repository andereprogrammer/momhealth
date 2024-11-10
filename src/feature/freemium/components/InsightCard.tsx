import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Ok, Placeholder} from '../../../assets';
import {fonts, Pallete} from '../../../theme/enum';
import {
  horizontalScale,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import ImageWithView from '../../../components/ImageWithView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../context-store/useDataProvider';

type Props = {
  id: number;
  image_link: string;
  topic_title: string;
  keyProp: string;
};

const InsightCard = ({
  id = 0,
  image_link = '',
  topic_title,
  keyProp,
}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {setKeyProp} = useDataProvider();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setKeyProp(keyProp);
        console.log(keyProp);

        navigation.navigate('ContentInsightHome', {
          topic: keyProp,
        });
      }}
      style={{
        position: 'relative',
        shadowColor: '#777',
        shadowOpacity: 0.18,
        shadowRadius: 3,
        shadowOffset: {
          width: 1,
          height: 3,
        },
        elevation: 12,
        marginHorizontal: 2,
      }}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{topic_title}</Text>
      </View>
      <ImageWithView
        isLocalImage={false}
        imageSource={image_link}
        width={SCREEN_WIDTH_WINDOW / 2.3}
        height={SCREEN_WIDTH_WINDOW / 2}
        mode="cover"
        customStyle={styles.imgAspect}
      />
    </TouchableOpacity>
  );
};

export default InsightCard;

const styles = StyleSheet.create({
  imgAspect: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: Pallete.plainWhite,
    width: '100%',
  },
  textContainer: {
    width: '80%',
    position: 'absolute',
    top: verticalScale(8),
    left: horizontalScale(15),
    zIndex: 10,
  },
});
