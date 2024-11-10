import {
  Image,
  ImageBackground,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {BackBtn, Placeholder} from '../../../assets';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';

import useDataProvider from '../../../context-store/useDataProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {markActivityComplete} from '../../../api/homeapis';
import {fonts} from '../../../theme/enum';
import theme from '../../../theme/Theme';

type Props = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description: string;
  tags: any;
  url: string;
  status: string;
  content_type: string;
  content_link: string;
  // onUpdate: (params: string) => void;
  category: any;
  requirements: any;
  assignee: any;
  created: any;
  assigned_on: string;
  duration_in_minutes: string;
};
type Activity = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description: string;
  tags: any;
  url: string;
  status: string;
  content_type: string;
  content_link: string;
  category: any;
  requirements: any;
  assignee: any;
  created: any;
  assigned_on: string;
  duration_in_minutes: string;
};
const ActivityHomeCardComponent = (props: Props) => {
  const [steps, setSteps] = useState([]);
  const [contentUrlS, setContent] = useState();
  const {contentUrl, setContentUrl} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const isCompleted = props.status === 'COMPLETED';
  const markAsCompleted = async () => {
    await markActivityComplete(props.id);
    // props.onUpdate(`status=ASSIGNED`);
  };

  useEffect(() => {
    if (props.url !== undefined) {
      setContentUrl(props.url);
    }
  }, []);

  const handleShowActivity = () => {
    let activityData: Activity = {
      id: props.id,
      title: props.title,
      image: props.image,
      description: props.description,
      tags: props.tags,
      url: props.url,
      status: props.status,
      content_link: props.content_link,
      content_type: props.content_type,
      category: props.category,
      assignee: props.assignee,
      requirements: props.requirements,
      created: props.created,
      duration_in_minutes: props.duration_in_minutes,
    };
    navigation.navigate('ActivityContentScreen', {
      activity: activityData,
    });
  };
  const handleClick = () => {
    if (props.content_type === 'VIDEO') {
      navigation.navigate('VideoActivityScreen', {
        url: props.content_link,
      });
    } else {
      navigation.navigate('PDFActivityScreen', {
        url: props.content_link,
      });
    }
  };
  return (
    <View style={styles.mainView}>
      <View
        style={{
          width: '100%',
          height: '48%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={{uri: props.image}}
          style={{
            width: '100%',
            height: '95%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
          imageStyle={{
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: verticalScale(0),
              backgroundColor: '#f2f2f2',
              shadowRadius: 30,
              shadowColor: '#c3c3c3',
              shadowOpacity: 0.4,
              shadowOffset: 4,
              elevation: 12,
              opacity: 0.8,
              height: '20%',
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 16,
                color: '#000',
                paddingHorizontal: horizontalScale(10),
                // padding: verticalScale(10),
                textTransform: 'capitalize',
                fontFamily: 'PlusJakartaSans-Bold',
              }}>
              {props.title}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          height: '8%',
          width: '100%',
          paddingHorizontal: horizontalScale(10),
          paddingVertical: verticalScale(2),
          gap: 10,
        }}>
        {props.category ? (
          <>
            {props.category.map((cat,index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 'auto',
                    height: '100%',
                    paddingHorizontal: 10,
                    backgroundColor: theme.colors.inputBg,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={4}
                    style={{
                      fontSize: 12,
                      fontFamily: fonts.SecondaryDMSansMedium,
                      textTransform: 'uppercase',
                    }}>
                    {cat}
                  </Text>
                </View>
              );
            })}
          </>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: '25%',
          width: '100%',
          padding: 10,
          gap: 5,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.SecondaryDMSansBold,
          }}>
          Directions
        </Text>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            color: '#a1a1a1',
            fontFamily: fonts.SecondaryDMSansMedium,
          }}>
          {props.description}
        </Text>
      </View>
      <View
        style={{
          height: '15%',
          width: '100%',
          flexDirection: 'row',
          gap: 3,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={handleShowActivity}
          style={{
            height: '90%',
            width: '45%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#d3d3d3',
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(5),
            display: 'flex',
            borderWidth: 1,
            borderRadius: 20,
            marginBottom: 7,
          }}>
          <Text
            style={{
              padding: 1,
              fontFamily: fonts.SecondaryDMSansBold,
            }}>
            View Activity
          </Text>
        </TouchableOpacity>
        <View style={{height: '100%', width: '45%'}}>
          <MainCtaComponent style={{}} active onClick={handleClick}>
            Begin
          </MainCtaComponent>
        </View>
      </View>

      {/* <View
        style={{
          width: '100%',
          height: '12%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#E8F8D4',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        {isCompleted ? (
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              Completed
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={markAsCompleted}
            style={{
              width: '95%',
              height: '80%',
              padding: 0,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#777',
                fontFamily: fonts.SecondaryDMSansBold,
              }}>
              Mark as Completed
            </Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

export default ActivityHomeCardComponent;

const styles = StyleSheet.create({
  mainView: {
    width: '93%',
    height: verticalScale(300),
    backgroundColor: '#fff',
    elevation: 12,
    shadowColor: '#a3a3a3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    borderRadius: horizontalScale(20),
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    marginVertical: verticalScale(10),
  },
});
