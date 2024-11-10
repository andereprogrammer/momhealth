import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Placeholder} from '../../../assets';
import {designPalette} from '../../../theme/Theme';
import PrimaryHeadingTextComponent from '../../../components/TextComponents/PrimaryHeadingTextComponent';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {Pallete} from '../../../theme/enum';

type Props = {
  sessionName: string;
  textSize: number;
};

const SessionNameInfoCard = (props: Props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.containerView}>
        <Image
          source={Placeholder}
          style={styles.imageView}
          resizeMode="cover"
          resizeMethod="resize"
        />
      </View>
      <View style={styles.textView}>
        <PrimaryHeadingTextComponent
          text={props.sessionName}
          color="#000"
          fontSize={props.textSize}
        />
      </View>
    </View>
  );
};

export default SessionNameInfoCard;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '10%',
    borderRadius: horizontalScale(20),
    backgroundColor: Pallete.cardBgLightPink,
    borderWidth: 1,
    borderColor: designPalette.primary.lightPink,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  containerView: {
    width: '24%',
    height: '90%',
    overflow: 'hidden',
    margin: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  textView: {
    width: '74%',
    height: '100%',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imageView: {
    width: '80%',
    height: '100%',
    borderRadius: 20,
  },
});
