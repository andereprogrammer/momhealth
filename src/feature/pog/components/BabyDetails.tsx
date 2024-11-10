import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../styles/pogStyles';
import BabyInfoComponent from './BabyInfoComponent';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import {
  HeightScaleImage,
  SampleFruit,
  WeightMachineImage,
} from '../../../assets';
import {stringLiterals} from '../constants';

type BabyDetailsProps = {
  babyHeight: number | undefined;
  babyWeight: number | undefined;
  babySizeByFruit: string | undefined;
  babyFruitImage: string | undefined;
  babyWeek: string | number;
};

const DottedLine = ({}) => {
  return <View style={styles.dottedLine} />;
};

const BabyDetails = ({
  babyHeight,
  babySizeByFruit,
  babyWeight,
  babyFruitImage,
  babyWeek,
}: BabyDetailsProps) => {
  return (
    <>
      <Text style={[commonStyles.headingText, commonStyles.innerSpacing]}>
        {stringLiterals.BABY_INFO_TITLE + ` ${babyWeek} weeks`}
      </Text>
      <View style={[commonStyles.flexRow, styles.container]}>
        <BabyInfoComponent
          infoHeading={stringLiterals.SIZE_FRUIT}
          infoDetail={babySizeByFruit}
          imageSource={babyFruitImage}
          staticImage={false}
        />
        <DottedLine />
        <BabyInfoComponent
          infoHeading={stringLiterals.WEIGHT}
          infoDetail={babyWeight}
          imageSource={WeightMachineImage}
          staticImage
        />
        <DottedLine />
        <BabyInfoComponent
          infoHeading={stringLiterals.HEIGHT}
          infoDetail={babyHeight}
          imageSource={HeightScaleImage}
          staticImage
        />
      </View>
    </>
  );
};

export default BabyDetails;

const styles = StyleSheet.create({
  dottedLine: {
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderColor: 'black',
    height: 100,
    alignSelf: 'center',
  },
  container: {
    height: SCREEN_WIDTH_WINDOW / 1.7,
  },
});
