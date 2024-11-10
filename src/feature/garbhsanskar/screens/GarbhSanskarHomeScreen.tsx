import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GarbhSanskarTile from '../components/GarbhSanskarTile';
import {
  AffirmationIcon,
  BrainActivitiesIcon,
  GarbhSanskarBg,
  MantraIcon,
  MediatationIcon,
  OmIcon,
  StoriesIcon,
  VideoGuideIcon,
} from '../../../assets';
import {fonts} from '../../../theme/enum';

type Props = {};

const GarbhSanskarHomeScreen = ({navigation}) => {
  let features = [
    {
      name: 'Om chanting',
      icon: OmIcon,
      nav: 'OmChantingHomeScreen',
      locked: false,
    },

    {
      name: 'Mantra & Slokas',
      icon: MantraIcon,
      nav: 'MantraChantingHomeScreen',
      locked: false,
    },
    {
      name: 'Video guides',
      icon: VideoGuideIcon,
      nav: 'GarbhSanskarVideoGuide',
      locked: false,
    },
    {
      name: 'Brain Activities',
      icon: VideoGuideIcon,
      nav: 'BrainActivitiesHomeScreen',
      locked: false,
    },
    {
      name: 'Affirmation',
      icon: AffirmationIcon,
      nav: 'AffirmationHomeScreen',
      locked: false,
    },
    {
      name: 'Stories',
      icon: StoriesIcon,
      nav: 'GarbhSanskarStory',
      locked: true,
    },
    // {
    //   name: 'Brain activities',
    //   icon: BrainActivitiesIcon,
    //   nav: 'FreemiumPackageNavigation',
    //   locked: true,
    // },

    // {
    //   name: 'Meditation',
    //   icon: MediatationIcon,
    //   nav: 'FreemiumPackageNavigation',
    //   locked: true,
    // },
  ];
  return (
    <ScrollView style={styles.main}>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginVertical: 20,
          paddingHorizontal: 30,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.PrimaryJakartaBold,
          }}>
          Garbhsanskar
        </Text>
      </View>

      <ImageBackground
        source={GarbhSanskarBg}
        imageStyle={{
          width: '100%',
          height: '100%',
        }}
        style={{
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 10,
          }}>
          {features.map(feature => {
            return (
              <GarbhSanskarTile
                name={feature.name}
                iconImage={feature.icon}
                key={feature.name}
                nav={feature.nav}
                locked={feature.locked}
              />
            );
          })}
        </View>
      </ImageBackground>
      <View
        style={{
          height: 200,
        }}></View>
    </ScrollView>
  );
};

export default GarbhSanskarHomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 38,
    backgroundColor: '#fff',
  },
});
