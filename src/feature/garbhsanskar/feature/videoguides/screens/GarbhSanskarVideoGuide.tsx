import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HighlightedBackButton from '../../../../../components/HighlightedBackButton';
import RecommendedVideoList from '../components/RecommendedVideoList';
import AllVideosList from '../components/AllVideosList';
import FullPageImageBg from '../../../components/FullPageImageBg';
import {VideoGuideBg} from '../../../../../assets';
import {fonts} from '../../../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LoadingAnimationScreen from '../../../../animations/LoadingAnimationScreen';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../helpers/layoutHelper';
import BackHeader from '../../../../../components/MainContainer/BackHeader';

type Props = {};

const GarbhSanskarVideoGuide = ({}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [videoGuides, setVideoGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVideoGuides = () => {
    fetch(
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/tools/video_guides.json',
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    )
      .then(res => {
        res.json().then(video_guide => {
          setVideoGuides(video_guide.data);
          setLoading(false);
        });
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };
  useEffect(() => {
    getVideoGuides();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <View style={styles.screenContainer}>
          <FullPageImageBg sourceImage={VideoGuideBg}>
            <View style={{height: 1}} />
            <BackHeader
              showHighlightedIcon
              title="Video Guides"
              bgcolor="transparent"
            />
            <Text style={styles.primaryHeading}>Featured videos</Text>
            <RecommendedVideoList videos={videoGuides.slice(0, 3)} />
            <Text style={styles.secondaryHeading}>
              Garbhsanskar video library
            </Text>
            <AllVideosList videos={videoGuides} />
          </FullPageImageBg>
        </View>
      )}
    </>
  );
};

export default GarbhSanskarVideoGuide;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screenHeadingOverlay: {
    position: 'absolute',
    top: verticalScale(40),
    left: horizontalScale(60),
  },
  overLay: {
    zIndex: 10000,
    position: 'relative',
  },
  spacer: {
    height: 120,
  },
  primaryHeading: {
    paddingHorizontal: 10,
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
    paddingVertical: 10,
  },
  secondaryHeading: {
    paddingHorizontal: 10,
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
    paddingVertical: 10,
    marginVertical: 10,
  },
});
