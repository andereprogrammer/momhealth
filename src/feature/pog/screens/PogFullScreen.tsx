import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import POGTracker from '../components/POGTracker';
import BackHeader from '../../../components/MainContainer/BackHeader';
import useDataProvider from '../../../context-store/useDataProvider';

type Props = {};

const PogFullScreen = (props: Props) => {
  const {currentWeekData} = useDataProvider();

  return (
    <View
      style={{flex: 1, backgroundColor: 'transparent', position: 'relative'}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000000000000000000,
        }}>
        <BackHeader
          title={`Week ${currentWeekData.week}`}
          showHighlightedIcon
          bgcolor="transparent"
        />
      </View>
      <POGTracker
        week={currentWeekData.week}
        link={currentWeekData.week_data.preview_video_link}
      />
    </View>
  );
};

export default PogFullScreen;

const styles = StyleSheet.create({});
