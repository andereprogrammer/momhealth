import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MoodImage, PersonalJOurnal} from '../../../../assets';
import {horizontalScale} from '../../../../helpers/layoutHelper';
import {fonts} from '../../../../theme/enum';
import theme from '../../../../theme/Theme';

type Props = {};

const MoodJournalComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const takeMeToPersonalJounal = () => {
    navigation.navigate('InsightMainScreen');
  };

  return (
    <TouchableOpacity
      onPress={takeMeToPersonalJounal}
      style={styles.secondaryContainerView}>
      <View style={styles.internalCardView}>
        <ImageBackground
          source={MoodImage}
          imageStyle={styles.imgBackgroundAspect}
          style={styles.imageViewAspect}
        />
        <View style={styles.headingCardView}>
          <Text style={styles.secondartText} onPress={() => console.log('')}>
            Journal
          </Text>
          <TouchableOpacity
            style={styles.stleButtonView}
            onPress={takeMeToPersonalJounal}>
            <Text style={styles.actionText}>Add check in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MoodJournalComponent;

const styles = StyleSheet.create({
  secondaryContainerView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  internalCardView: {
    width: '90%',
    height: '100%',
    borderRadius: horizontalScale(20),
    backgroundColor: '#FFD6F6',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    overflow: 'hidden',
  },
  headingCardView: {
    width: '60%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  secondartText: {fontFamily: fonts.SecondaryDMSansBold, fontSize: 16},
  actionText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    color: '#c3c3c3',
    textAlign: 'left',
  },
  stleButtonView: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    width: '60%',
    height: '30%',
    marginTop: 10,
    padding: 5,
  },
  imageViewAspect: {
    width: '30%',
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
