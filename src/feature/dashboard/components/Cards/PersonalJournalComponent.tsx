import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  //   TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import React from 'react';
import {horizontalScale} from '../../../../helpers/layoutHelper';
import {PersonalJOurnal} from '../../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import theme from '../../../../theme/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fonts} from '../../../../theme/enum';

type Props = {};

const PersonalJournalComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const takeMeToPersonalJounal = () => {
    navigation.navigate('ReportsUploadScreen');
  };

  return (
    <TouchableOpacity
      onPress={takeMeToPersonalJounal}
      style={styles.secondaryContainerView}>
      <View style={styles.internalCardView}>
        <ImageBackground
          source={PersonalJOurnal}
          imageStyle={styles.imgBackgroundAspect}
          style={styles.imageViewAspect}
        />
        <View style={styles.headingCardView}>
          <Text style={styles.secondartText} onPress={() => console.log('')}>
            Reports and prescriptions
          </Text>
          <TouchableOpacity
            style={styles.stleButtonView}
            onPress={takeMeToPersonalJounal}>
            <Text style={styles.actionText}>
              Upload documents
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonalJournalComponent;

const styles = StyleSheet.create({
  secondaryContainerView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalCardView: {
    width: '90%',
    height: '100%',
    borderRadius: horizontalScale(20),
    backgroundColor: 'rgba(255, 214, 246, 0.4)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    overflow: 'hidden',
  },
  headingCardView: {
    width: '70%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  secondartText: {fontFamily: fonts.SecondaryDMSansBold, fontSize: 16},
  actionText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    color: '#c3c3c3',
  },
  stleButtonView: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '80%',
    height: '50%',
    marginTop: 10,
    padding: 5,
  },
  imageViewAspect: {
    width: '22%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: '16%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cardPrimaryBackground,
    borderRadius: horizontalScale(5),
    marginHorizontal: horizontalScale(10),
  },
  imageAspext: {
    width: '50%',
    height: '50%',
    transform: [{rotate: '180deg'}],
    tintColor: '#FFF',
  },
  imgBackgroundAspect: {
    width: '100%',
  },
  customColor: {color: '#000'},
});
