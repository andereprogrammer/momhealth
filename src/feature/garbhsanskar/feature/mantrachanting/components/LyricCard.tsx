import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../../../../theme/enum';
import {horizontalScale} from '../../../../../helpers/layoutHelper';
import LanguageButton from './LanguageButton';

type LyricCardProps = {
  lyrics: any;
  name: string;
};

const LyricCard = (props: LyricCardProps) => {
  const [toggleLanguage, setToggleLanguage] = useState(true);
  const [lyrics, setLyrics] = useState([]);
  useEffect(() => {
    setLyrics(props.lyrics.english);
  }, []);
  const toggleLanguageLyrics = () => {
    if (toggleLanguage) {
      setLyrics(props.lyrics.hindi);
      setToggleLanguage(!toggleLanguage);
    } else {
      setLyrics(props.lyrics.english);
      setToggleLanguage(!toggleLanguage);
    }
  };

  return (
    <LinearGradient
      start={{x: 1, y: 2.5}}
      end={{x: 3, y: 0}}
      colors={['#7E38EF', '#BD81F9', '#7E38EF']}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{props.name}</Text>
        <LanguageButton
          onClick={toggleLanguageLyrics}
          toggleLanguage={toggleLanguage}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {lyrics.length === 0 ? (
          <Text style={{color: '#fff', fontSize: 22}}>
            Lyrics not available
          </Text>
        ) : (
          lyrics.map(item => {
            return <Text style={{color: '#fff', fontSize: 22}}>{item}</Text>;
          })
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default LyricCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(300),
    height: 300,
    position: 'absolute',
    top: 9,
    borderRadius: 20,
    aspectRatio: 1,
    flex: 2,
  },
  header: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    width: '55%',
  },
  scrollView: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
