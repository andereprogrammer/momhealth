import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {commonStyles} from '../styles/pogStyles';
import BackHeader from '../../../components/MainContainer/BackHeader';
import useDataProvider from '../../../context-store/useDataProvider';
import usePogStore from '../../freemium/store/usePogDataStore';

type Props = {};

const PogBioDigitalScreen = (props: Props) => {
  const {currentWeekData} = usePogStore();
  let bioDigitalLink =
    '"https://human.biodigital.com/viewer/?id=5YrI&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&dk=b97f9bb3937df3c64996c6cfcaa9cfd93ad417df&paid=o_063343a4"';

  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000000000000000000,
        }}>
        <BackHeader title="" showHighlightedIcon bgcolor="transparent" />
      </View>
      <WebView
        style={{margin: 0, padding: 0, transform: [{scale: 1.005}]}}
        source={{
          uri: `${currentWeekData.week_data.render_model_link}`,
        }}
      />
    </>
  );
};

export default PogBioDigitalScreen;

const styles = StyleSheet.create({});
