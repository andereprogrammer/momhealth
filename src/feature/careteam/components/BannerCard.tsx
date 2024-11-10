import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import theme from '../../../theme/Theme';
import {fonts, Pallete} from '../../../theme/enum';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {MedicalJournal} from '../../chat/screens/ChatExpertNotesScreen';
import {markExpertnotesRead} from '../../../api/homeapis';
import {Icon} from 'react-native-elements';
import { Bell, InformationIcon } from "../../../assets";

type Props = {
  text: string;
};

const BannerCard = (props: Props) => {
  return (
    <View style={stylesNotesCard.containerView}>
      <View style={stylesNotesCard.mainView}>
        <View style={stylesNotesCard.dateView}>
          <Image source={InformationIcon} style={{width: 20, height: 20}} />
        </View>
        <View style={stylesNotesCard.headingDataView}>
          <Text style={stylesNotesCard.userName}>{props.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default BannerCard;

export const stylesNotesCard = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mainView: {
    width: '90%',
    minHeight: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Pallete.backgroundPink,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
    borderRadius: horizontalScale(20),
    marginVertical: verticalScale(6),
    borderColor: 'rgba(250, 242, 255, 1)',
    // borderWidth: 1,
    elevation: 20,
    shadowColor:
      Platform.OS === 'ios'
        ? 'rgba(71, 31, 185, 0.4)'
        : 'rgba(71, 31, 185, 0.2)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  headingDataView: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
  },
  userName: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 12,
  },
  dateView: {
    width: '10%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    alignSelf: 'flex-start',
    gap: 10,
  },
});
