import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fonts, Pallete} from '../../../theme/enum';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import ImageWithView from '../../../components/ImageWithView';
import {Placeholder} from '../../../assets';

type Props = {};

const PogCategoryList = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const keys = [
    {
      key: 'things_to_dos',
      title: 'Things to Do',
      imageLink:
        'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/things_to_dos.png',
    },
    {
      key: 'body_changes',
      title: 'Body Changes',
      imageLink:
        'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/body_changes.png',
    },
    {
      key: 'common_issues',
      title: 'Common Issues',
      imageLink:
        'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/common_issues.png',
    },
    // {
    //   key: 'red_flags',
    //   title: 'Red Flags',
    //   imageLink:
    //     'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/POG+cards-08.png',
    // },
  ];
  return (
    <ScrollView
      horizontal
      style={{flex: 1}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      {keys.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              width: SCREEN_WIDTH_WINDOW / 3.1,
              height: SCREEN_WIDTH_WINDOW / 2.4,
              backgroundColor: Pallete.plainWhite,
              borderColor: Pallete.Eggplant,
              borderRadius: 10,
              shadowColor: '#777',
              shadowOpacity: 0.1,
              marginVertical: 6,
              shadowRadius: 3,
              marginHorizontal: 10,
              shadowOffset: {
                width: 1,
                height: 2,
              },
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
              }}
              onPress={() =>
                navigation.navigate('PogStoryScreen', {key: item.key})
              }>
              <ImageWithView
                isLocalImage={false}
                width={'100%'}
                height={'100%'}
                imageSource={item.imageLink}
                customStyle={{
                  borderRadius: 10,
                }}
                imageStyle={{
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.PrimaryJakartaBold,
                  color: Pallete.plainWhite,
                  paddingVertical: 8,
                  position: 'absolute',
                  bottom: 0,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PogCategoryList;

const styles = StyleSheet.create({});
