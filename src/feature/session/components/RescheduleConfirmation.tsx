import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {Placeholder} from '../../../assets';
import {designPalette} from '../../../theme/Theme';
import SessionNameInfoCard from './SessionNameInfoCard';

type Props = {
  onCancelClicked: () => void;
  onReschedule: () => void;
};

const RescheduleConfirmation = (props: Props) => {
  return (
    <>
      <SessionNameInfoCard
        textSize={14}
        sessionName="You can also reschedule this session instead of cancelling"
      />
      <View
        style={{
          width: '100%',
          height: '20%',
          flexDirection: 'row',
          alignItems: 'center',
          padding: horizontalScale(15),
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => props.onCancelClicked()}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '40%',
          }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '40%',
            height: '80%',
          }}>
          <MainCtaComponent
            style={{}}
            active
            onClick={() => props.onReschedule()}>
            Reschedule
          </MainCtaComponent>
        </View>
      </View>
    </>
  );
};

export default RescheduleConfirmation;

const styles = StyleSheet.create({});
