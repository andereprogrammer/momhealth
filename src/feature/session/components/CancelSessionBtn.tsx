import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Pallete, fonts} from '../../../theme/enum';

type Props = {
  rejected: () => void;
};

const CancelSessionBtn = (props: Props) => {
  const handleRejection = () => {
    props.rejected();
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.containerView}>
        <TouchableOpacity
          style={styles.touchableView}
          onPress={handleRejection}>
          <Text
            style={{
              fontFamily: fonts.SecondaryDMSansBold,
              color: Pallete.pinkTextColor,
              textDecorationLine: 'underline',
            }}>
            Unable to attend the Session
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CancelSessionBtn;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(8),
    height: verticalScale(40),
  },
  containerView: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFF2FC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    borderRadius: 20,
  },
  touchableView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
});
