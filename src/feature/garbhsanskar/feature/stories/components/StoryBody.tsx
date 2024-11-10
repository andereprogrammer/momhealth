import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';
import {verticalScale} from '../../../../../helpers/layoutHelper';

type Props = {};

const StoryBody = (props: Props) => {
  const {height} = useWindowDimensions();
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
      }}>
      <Text
        style={{
          textAlign: 'justify',
          fontFamily: fonts.SecondaryDMSansMedium,
          fontSize: 19,
        }}>
        Lucy, a young woman in her late twenties, becomes a first-time mother to
        her daughter, Emma. Despite her initial excitement, Lucy finds herself
        overwhelmed by the demands of motherhood. Juggling diaper changes,
        sleepless nights, and the constant need for attention, she struggles to
        find balance in her new role. Feeling isolated and exhausted, Lucy
        stumbles upon a mindfulness workshop at a local community center.
        Intrigued by the concept of living in the present moment, she decides to
        give it a try. Under the guidance of a wise and compassionate
        instructor, Lucy learns to cultivate mindfulness in her daily life.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: fonts.PrimaryJakartaBold,
          fontSize: 15,
        }}>
        Page 1
      </Text>
    </View>
  );
};

export default StoryBody;

const styles = StyleSheet.create({});
