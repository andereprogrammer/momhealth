import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Pallete} from '../../../theme/enum';
import BabyDetails from '../components/BabyDetails';
import NormalChangesContainer from '../components/NormalChangesContainer';
import POGTrackerContainer from '../components/POGTrackerContainer';
import ThingsToDoContainer from '../components/ThingsToDoContainer';
import FoetalStatus from '../components/FoetalStatus';
import POGVideo from '../components/POGVideo';
import RecommendedVideo from '../components/RecommendedVideo';
import TabContainer from '../components/TabContainer';
import {stringLiterals} from '../constants';
import useDataProvider from '../../../context-store/useDataProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const PogBabyDetailsScreen = ({route}) => {
  const {currentWeekData} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const openVideo = (link: string) => {
    navigation.navigate('VideoScreen', {
      url: link,
    });
  };
  console.log(currentWeekData.week_data.yoga_videos[0]);
  return (
    <ScrollView nestedScrollEnabled style={styles.mainScreen}>
      <POGTrackerContainer
        week={currentWeekData.week}
        link={currentWeekData.week_data.preview_video_link}
      />
      <BabyDetails
        babyHeight={currentWeekData.week_data.baby_details.height_in_cms}
        babySizeByFruit={currentWeekData.week_data.baby_details.fruit}
        babyWeight={currentWeekData.week_data.baby_details.weight_in_grams}
        babyFruitImage={currentWeekData.week_data.baby_details.fruit_image_link}
        babyWeek={currentWeekData.week}
      />

      <POGVideo
        pogVideoTitle={currentWeekData.week_data.pog_videos[0].title}
        pogVideoDescription={
          currentWeekData.week_data.pog_videos[0].description
        }
        image_link={currentWeekData.week_data.pog_videos[0].thumbnail_link}
        video_link={currentWeekData.week_data.pog_videos[0].video_link}
        onClickFn={() =>
          openVideo(currentWeekData.week_data.pog_videos[0].video_link)
        }
      />
      <FoetalStatus
        statusHeading={stringLiterals.FOETAL_MOVEMENT_STATUS}
        statusDescription={
          currentWeekData.week_data.fetal_growth_data.description
        }
        imageSource={currentWeekData.week_data.fetal_growth_data.thumbnail_link}
      />
      <RecommendedVideo
        imageSource={currentWeekData.week_data.yoga_videos[0].image_link}
        yogaVideoTitle={currentWeekData.week_data.yoga_videos[0].title}
        yogaVideoDecription={
          currentWeekData.week_data.yoga_videos[0].description
        }
        onClickFn={() =>
          openVideo(currentWeekData.week_data.yoga_videos[0].video_link)
        }
      />
      <NormalChangesContainer
        changesList={currentWeekData.week_data.body_changes}
      />
      <ThingsToDoContainer
        thingsToDo={currentWeekData.week_data.things_to_dos}
      />
      <TabContainer
        issuesData={currentWeekData.week_data.common_issues}
        redFlagsData={currentWeekData.week_data.red_flags}
      />
    </ScrollView>
  );
};

export default PogBabyDetailsScreen;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: Pallete.plainWhite,
    position: 'relative',
  },
});
