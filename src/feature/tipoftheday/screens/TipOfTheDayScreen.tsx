import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TipOfTheDayBg} from '../../../assets';
import FullPageImageBg from '../../garbhsanskar/components/FullPageImageBg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../context-store/useDataProvider';
import {TipOfTheDayItem} from '../../../constants/types';
import {formatDate} from '../helpers';
import CloseBtn from '../components/CloseBtn';
import TipDateAndNavigation from '../components/TipDateAndNavigation';
import TitleCard from '../components/TitleCard';
import ContentCard from '../components/ContentCard';
import NoTipFound from '../components/NoTipFound';

type Props = {};

const TipOfTheDayScreen = ({route}: Props) => {
  const {contentTipOfDay} = useDataProvider();
  const initialId = route?.params?.id;
  const [currentTipId, setCurrentTipId] = useState(initialId);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const currentTipIndex = contentTipOfDay.findIndex(
    (tip: TipOfTheDayItem) => tip.id === currentTipId,
  );
  const currentTip = contentTipOfDay[currentTipIndex];
  const previousTip = contentTipOfDay[currentTipIndex - 1];
  const nextTip = contentTipOfDay[currentTipIndex + 1];
  const {dayOfWeek, formattedDate} = formatDate(currentTip.date);

  useEffect(() => {
    setCurrentTipId(initialId);
  }, [initialId]);

  const goToPreviousTip = () => {
    if (previousTip) {
      setCurrentTipId(previousTip.id);
    }
  };

  const goToNextTip = () => {
    if (nextTip) {
      setCurrentTipId(nextTip.id);
    }
  };

  return (
    <View style={styles.container}>
      <FullPageImageBg sourceImage={TipOfTheDayBg}>
        <CloseBtn close={() => navigation.goBack()} />
        {!currentTip ? (
          <NoTipFound />
        ) : (
          <>
            <TipDateAndNavigation
              goToNextTip={goToNextTip}
              goToPreviousTip={goToPreviousTip}
              dayOfWeek={dayOfWeek}
              formattedDate={formattedDate}
            />
            <TitleCard title={currentTip.title} image={currentTip.image} />
            <ContentCard content={currentTip.content} />
          </>
        )}
      </FullPageImageBg>
    </View>
  );
};

export default TipOfTheDayScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'transparent'},
});
