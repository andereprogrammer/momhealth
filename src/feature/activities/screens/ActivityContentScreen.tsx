import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {BackBtn, BookIcon, Placeholder, Play, QuickRead} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import MarkAsCompletedButton from '../components/MarkAsCompletedButton';
import TakeMeToButton from '../components/TakeMeToButton';
import ActivitySucess from '../components/ActivitySucess';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HighlightedBackButton from '../../../components/HighlightedBackButton';
import TextDescriptionComponent from '../../chat/components/TextDescriptionComponent';
import {Pallete, fonts} from '../../../theme/enum';
import theme from '../../../theme/Theme';
import InstructorInfoComponent from '../../session/components/InstructorInfoComponent';
import Instructorcomponent from '../../chat/components/Instructorcomponent';
import TextDateInfoComponent from '../../chat/components/TextDateInfoComponent';
import InstructorWithDate from '../components/InstructorWithDate';
import ActivityDetailsComponent from '../components/ActivityDetailsComponent';
import LinearGradient from 'react-native-linear-gradient';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import RequirementsComponent from '../components/RequirementsComponent';
import moment from 'moment';
import Orientation from 'react-native-orientation-locker';
import {tags} from 'react-native-svg/lib/typescript/xml';
import BackHeader from '../../../components/MainContainer/BackHeader';

const ActivityContentScreen = ({route}) => {
  const activity = route.params.activity;
  const navigation = useNavigation<NavigationProp<any, any>>();

  const [derived, setDerived] = useState();
  const handleClick = () => {
    if (activity.content_type === 'VIDEO') {
      navigation.navigate('VideoActivityScreen', {
        url: activity.content_link,
      });
    } else {
      navigation.navigate('PDFActivityScreen', {
        url: activity.content_link,
      });
    }
  };
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(activity.status);
  console.log('assigned on Log', JSON.stringify(activity));

  useEffect(() => {
    const trimesters = activity.tags.filter(tag => tag.type === 'TRIMESTER');
    if (trimesters && trimesters.length > 0) {
      setDerived({
        ...derived,
        trimester: trimesters[0]?.values[0]?.value,
      });
    }
  }, []);

  return (
    <>
      {success ? (
        <ActivitySucess
          home="ActivityTopNavigation"
          message="Marked Completed"
          time={2000}
          onSuccess={() => console.log('done')}
          dontTakeMe={false}
        />
      ) : (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={[styles.topImageView]}>
            <ImageBackground
              source={activity.image ? {uri: activity.image} : Placeholder}
              imageStyle={[styles.imageAspect]}
              resizeMethod="resize"
              resizeMode="contain"
              style={styles.imgBgView}>
              <View style={styles.wrapperOverlay} />
              <View
                style={{
                  height: verticalScale(10),
                }}
              />
              <BackHeader
                showHighlightedIcon
                bgcolor="transparent"
                title={''}
                titleColor={'#000'}
              />
              <View style={styles.infoView}>
                <Text style={styles.name}>{activity.title}</Text>
                {activity.category === null ? (
                  <></>
                ) : (
                  <View
                    style={[
                      styles.tagFullView,
                      activity.category !== null && {
                        height: verticalScale(20),
                        marginVertical: verticalScale(10),
                      },
                    ]}>
                    {activity?.category?.map((cat, index) => {
                      return (
                        <View key={index} style={styles.tagContainer}>
                          <Text
                            style={{
                              color: Pallete.Eggplant,
                              textTransform: 'uppercase',
                              fontSize: 12,
                            }}>
                            {cat}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </ImageBackground>
            <TouchableOpacity
              onPress={handleClick}
              style={{
                position: 'absolute',
                right: 15,
                bottom: 40,
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <LinearGradient
                colors={[
                  Pallete.linearGradientDark,
                  Pallete.linearGradientLight,
                ]}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={activity.content_type === 'VIDEO' ? Play : BookIcon}
                  tintColor={'#fff'}
                  style={{width: '50%', height: '50%'}}
                />
              </LinearGradient>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 20,
                position: 'absolute',
                bottom: -20,
                height: 40,
              }}
            />
          </View>
          <ScrollView style={[styles.mainView]}>
            <View style={[styles.mainView]}>
              {/* <InstructorWithDate
                image={activity?.assignee?.image}
                activityInstrutor={activity?.assignee?.name}
                role={activity?.assignee?.category}
                date={moment(activity?.assigned_on).format('MMM. DD, YYYY')}
              /> */}
              <ActivityDetailsComponent
                trimester={derived?.trimester}
                duration={activity?.duration_in_minutes}
                category={activity.category}
                contentType={activity.content_type}
                sessionTime=""
              />

              <View style={styles.mainTextView}>
                <Text style={styles.textHeading}>Overview</Text>
              </View>
              <TextDescriptionComponent description={activity?.description} />
              {activity.requirements ? (
                <RequirementsComponent requirements={activity?.requirements} />
              ) : (
                <></>
              )}

              {/* <View style={styles.spacingView} /> */}
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <MainCtaComponent style={{}} active onClick={handleClick}>
                  Begin
                </MainCtaComponent>
              </View>
              {/* <TakeMeToButton
                videoUrl={activity.content_link}
                type={activity.content_type}
              /> */}
            </View>
            <View style={styles.footerView} />
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ActivityContentScreen;

const styles = StyleSheet.create({
  infoView: {
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    position: 'absolute',
    bottom: 20,
  },
  textView: {
    backgroundColor: '#EFE8F4',
    paddingHorizontal: horizontalScale(8),
    width: '35%',
    paddingVertical: horizontalScale(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  category: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: theme.colors.cardPrimaryBackground,
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#FFF',
    fontSize: 22,
    // marginBottom: 20,
    width: '75%',
  },
  mainTextView: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: horizontalScale(18),
  },
  wrapperOverlay: {
    width: '100%',
    height: '100%',
    top: 0,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.3,
  },
  blackColor: {
    color: '#000',
  },
  backBtnImg: {
    width: horizontalScale(15),
    height: verticalScale(20),
  },
  imgBgView: {
    width: '100%',
    height: '100%',
  },
  footerView: {
    height: 100,
  },
  spacingView: {
    height: verticalScale(30),
  },
  backBtnView: {
    position: 'absolute',
    top: verticalScale(30),
    width: '100%',
    height: verticalScale(30),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  textHeading: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  videoView: {
    width: '100%',
    height: '50%',
  },
  mainView: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  completed: {
    backgroundColor: '#A0C870',
    padding: verticalScale(6),
    borderRadius: verticalScale(4),
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notcompleted: {
    backgroundColor: '#FFDE91',
    padding: verticalScale(6),
    borderRadius: verticalScale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagFullView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: horizontalScale(14),
    // paddingHorizontal: horizontalScale(20),
  },
  topImageView: {
    width: '100%',
    height: verticalScale(280),
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tagView: {
    width: '10%',
    height: '30%',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  tagContainer: {
    height: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD6F6',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  textContainerView: {
    // backgroundColor: '#fff',
    color: '#fff',
  },
  textContainerFullView: {
    flexDirection: 'row',
    width: '100%',
    height: '6%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: horizontalScale(20),
  },
  textContainerTagView: {
    flexDirection: 'row',
    width: '100%',
    height: '7%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: horizontalScale(20),
  },
  textContainer: {
    backgroundColor: '#FFF1FC',
    padding: horizontalScale(7),
    borderRadius: verticalScale(10),
  },
  text: {},
  imageAspect: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  descriptionTextView: {
    width: '100%',
  },
  buttonContainerView: {},
  positionOver: {
    position: 'absolute',
    bottom: verticalScale(20),
    // backgroundColor: '#fff',
    width: '100%',
    height: '20%',
    borderTopEndRadius: verticalScale(15),
    borderTopStartRadius: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#fff',
  },
});
