import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
import BackHeader from '../../../components/MainContainer/BackHeader';

type Props = {
  notes: string;
};

const SessionNotesViewScreen = (props: Props) => {
  const route = useRoute();
  useEffect(() => {
    console.log(route.params);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: verticalScale(40),
        backgroundColor: '#fff',
      }}>
      <BackHeader title="Session notes" />

      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.SecondaryDMSansMedium,
          }}>
          Title
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.PrimaryJakartaBold,
            paddingHorizontal: 5,
          }}>
          {route.params.notes.title}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.SecondaryDMSansBold,
            paddingVertical: 5,
          }}>
          Note
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.SecondaryDMSansMedium,
            paddingHorizontal: 5,
          }}>
          {route.params.notes.message}
        </Text>
      </View>
      <View></View>
    </View>
  );
};

export default SessionNotesViewScreen;

const styles = StyleSheet.create({});
