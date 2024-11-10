import React, { 
  useEffect, 
  useRef, 
  useState, 
  useCallback 
} from 'react';
import {StyleSheet,View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import lodash from 'lodash';
import { pleasantMusic } from '../music';
import { MusicList } from '../interfaces';
import Controls from '../components/Controls';
import TracksList from '../components/TracksList';
import CardContainer from '../components/CardContainer';
import BlurredImageBackground from '../../../components/BlurredImageBackground';
import BackHeader from '../../../../../components/MainContainer/BackHeader';
import usePogStore from '../../../../freemium/store/usePogDataStore';
import { Pallete } from '../../../../../theme/enum';
import { OmBackground, PleasantMusic1 } from '../../../../../assets';
import { verticalScale } from '../../../../../helpers/layoutHelper';
import { api } from '../../../../../api/useAuth';
import { getWeeklyAffirmations } from '../../../../../api/homeapis';
import { useFocusEffect } from '@react-navigation/native';

const pleasantMusicList: MusicList[] = pleasantMusic.map((item, index) => { 
  return { ...item, id: `${index}`, duration: 15, image: PleasantMusic1 } 
});

const updateOptions = async () => {
  await TrackPlayer.add(pleasantMusicList);
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
    ],
    progressUpdateEventInterval: 2,
  });
}

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
};

const AffirmationHomeScreen = () => {
  const insets = useSafeAreaInsets();
  let swipeRef = useRef<Swiper<string> | null>(null);
  const tracks = lodash.uniqBy(pleasantMusicList, 'trackId').map((item: any) => item.title);
  const [modal, setModal] = useState(false);
  const [cardIndex, setCardIndex] = useState(1);
  const [week, setWeek] = useState(pleasantMusicList[0].week)
  const [activeTrack, setActiveTrack] = useState<MusicList | null | string>(null);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [affirmationData, setAffirmationData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await setupPlayer();
      }
      finally {
        await updateOptions();
      }
    })()
    return () => {
      TrackPlayer.reset();
    }
  }, []);

  useFocusEffect(useCallback(()=>{
    setLoading(true);
    getWeeklyAffirmations().then((resp)=>{
      setAffirmationData(resp.data);
      setLoading(false);
    });
  },[]))

  const onModalPress = useCallback(() => setModal(true),[]);

  const setActiveMusic = (arg:MusicList | string | null) => setActiveTrack(arg);

  const weekSet = (week:number) => setWeek(week);

  const updateCardIndex = (cardIndex:number) => setCardIndex(cardIndex);

  const setModalState = (state: boolean) => setModal(state);

  const setActiveTrackState = (state:MusicList | null | string) => setActiveTrack(state);

  const setCurrentTrackState = (state: MusicList | null | string) => setCurrentTrack(state);

  return (
    <View style={styles.screenContainer}>
      <BlurredImageBackground sourceImage={OmBackground}>
        <View style={{ height: verticalScale(insets.top) }}
        />
        <BackHeader
          showHighlightedIcon
          bgcolor={Pallete.Transparent}
          title={'Affirmation'}
          titleColor={Pallete.darkBlack}
        />
        <View style={styles.contentContainer}>
          <CardContainer 
          pleasantMusicList={pleasantMusicList}
          currentWeekData={affirmationData?.affirmation_data ?? null} 
          week={affirmationData?.gestation_week ?? null} 
          setWeek={weekSet} 
          cardIndex={cardIndex} 
          swipeRef={swipeRef} 
          setCardIndex={updateCardIndex} 
          length={affirmationData?.affirmation_data?.length ?? null}
          loading={loading} 
          />
          <Controls 
          setActiveMusic={setActiveMusic} 
          openModal={onModalPress} 
          currentTrack={currentTrack} 
          activeTrack={activeTrack} 
          pleasantMusicList={pleasantMusicList}
          loading={loading}
          />
        </View>
      </BlurredImageBackground>
      <TracksList 
      modal={modal}
      setModal={setModalState}
      pleasantMusicList={pleasantMusicList}
      activeTrack={activeTrack}
      setActiveTrack={setActiveTrackState}
      setCurrentTrack={setCurrentTrackState}
      />
    </View>
  );
};

export default AffirmationHomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  }
});
