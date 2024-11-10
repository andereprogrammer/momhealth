import {StyleSheet, Text, View, Platform, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../helpers/layoutHelper';
import {fonts} from '../../../../../theme/enum';
import LanguageButton from './LanguageButton';

type MeaningPopUpProps = {
  meaning: {
    english: string;
    hindi: string;
  };
};

const MeaningPopUp = ({meaning}: MeaningPopUpProps) => {
  const [toggleLanguage, setToggleLanguage] = useState(true);
  const [meaningText, setMeaningText] = useState('');
  useEffect(() => {
    setMeaningText(meaning.english);
  }, []);
  const toggleLanguageLyrics = () => {
    if (toggleLanguage) {
      setMeaningText(meaning.hindi);
      setToggleLanguage(!toggleLanguage);
    } else {
      setMeaningText(meaning.english);
      setToggleLanguage(!toggleLanguage);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headingText}>
          {toggleLanguage ? 'Meaning of the Mantra :' : 'मंत्र का अर्थ'}
        </Text>
        <LanguageButton
          toggleLanguage={toggleLanguage}
          onClick={toggleLanguageLyrics}
        />
      </View>
      <ScrollView>
        {meaningText !== '' ? (
          <Text style={styles.meaningText}>{meaningText}</Text>
        ) : (
          <Text style={styles.meaningNotAvailableText}>
            Meaning not available
          </Text>
        )}
      </ScrollView>
      <View style={styles.arrowView}>
        <View style={styles.arrow} />
      </View>
    </View>
  );
};

export default MeaningPopUp;

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === 'android' ? 340 : 340,
    height: Platform.OS === 'android' ? verticalScale(110) : verticalScale(115),
    backgroundColor: '#000',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? verticalScale(40) : verticalScale(40),
    right: horizontalScale(10),
    padding: 15,
    borderRadius: verticalScale(10),
    zIndex: 300,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headingText: {
    fontSize: 17,
    color: '#fff',
    fontFamily: fonts.PrimaryJakartaBold,
  },
  meaningText: {
    fontSize: 14,
    color: '#fff',
    position: 'relative',
    fontFamily: fonts.SecondaryDMSansBold,
    padding: 2,
  },
  meaningNotAvailableText: {
    fontSize: 16,
    color: '#fff',
    position: 'relative',
    fontFamily: fonts.SecondaryDMSansBold,
    padding: 2,
  },
  arrowView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 40,
    width: 40,
    zIndex: 10,
    bottom: 0,
    right: 10,
    transform: [{rotate: '135deg'}],
  },
  arrow: {
    backgroundColor: '#000',
    width: 14,
    height: 14,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
