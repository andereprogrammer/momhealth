import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CareTeamCardComponent from './Cards/CareTeamCardComponent';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import {verticalScale} from '../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import {Pallete} from '../../../theme/enum';

type Props = {};

const GradientHeader = (props: Props) => {
  return (
    <LinearGradient
      start={{x: 0.2, y: 0.2}}
      end={{x: 0.4, y: 1}}
      colors={[Pallete.homeLineraGradientLight, Pallete.homeLinearGradientDark]}
      style={{flex: 1, height: '72%'}}>
      <View style={styles.headingView}>
        {data?.patient !== undefined && (
          <HeadingFontComponent
            style={{
              color: Pallete.plainWhite,
              marginBottom: verticalScale(5),
            }}>
            Hi, {dynamicName || ''}
          </HeadingFontComponent>
        )}
      </View>

      <View style={{height: verticalScale(85)}} />
      {data !== undefined && (
        <View style={styles.careTeamView}>
          {data.care_team.service_providers.length !== 0 && (
            <CareTeamCardComponent
              name={careCordinator?.name}
              image={careCordinator?.profile_image}
            />
          )}
        </View>
      )}
      <View style={styles.placeholderView} />
    </LinearGradient>
  );
};

export default GradientHeader;

const styles = StyleSheet.create({});
