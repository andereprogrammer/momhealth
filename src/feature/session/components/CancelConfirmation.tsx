import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {NotAvailable} from '../../../assets';
import {designPalette} from '../../../theme/Theme';

type Props = {
  onCanceled: () => void;
  onGoBack: () => void;
};

const CancelConfirmation = (props: Props) => {
  return (
    <>
      <View style={styles.mainView}>
        <Text
          style={{
            padding: 5,
          }}>
          Your cancelling the session
        </Text>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
          source={NotAvailable}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => props.onGoBack()}>
          <Text>No, go back</Text>
        </TouchableOpacity>
        <View style={styles.primaryBtnView}>
          <MainCtaComponent
            style={{}}
            active
            onClick={() => props.onCanceled()}>
            Yes, cancel
          </MainCtaComponent>
        </View>
      </View>
    </>
  );
};

export default CancelConfirmation;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '12%',
    borderRadius: 30,
    borderColor: designPalette.primary.lightPink,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  btnContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: horizontalScale(15),
    justifyContent: 'space-between',
  },
  secondaryBtn: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  primaryBtnView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: '80%',
  },
});
