import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';

import {ReportCard} from '../../../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PatientReport} from '../../screens/HomeScreen';
import moment, {ISO_8601} from 'moment/moment';
import {fonts} from '../../../../theme/enum';
type Props = {
  report: PatientReport;
};
const ReportsHolderCard = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  let date = moment(props.report.created, ISO_8601).format('DD-MMM-YYYY');
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DownloadWebViewScreen', {
            link: props.report.link,
            name: props.report.title,
            type: props.report.content_type,
            id: props.report.id,
          })
        }
        style={styles.cardView}>
        <View style={styles.imageView}>
          <View style={styles.imageContainer}>
            <Image
              source={ReportCard}
              resizeMethod="resize"
              resizeMode="contain"
              style={styles.imageAspect}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.titleText}>{props.report.title}</Text>
            <Text style={styles.dateText}>Added on {date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReportsHolderCard;

const styles = StyleSheet.create({
  mainView: {
    width: '95%',
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    width: '95%',
    height: '100%',
    borderWidth: 1,
    borderRadius: horizontalScale(20),
    backgroundColor: '#FFF',
    flexDirection: 'row',
    elevation: 12,
    shadowColor: '#FAF2FF',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderColor: '#FAF2FF',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    marginHorizontal: horizontalScale(10),
    gap: 10,
  },
  imageContainer: {
    width: '20%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageAspect: {
    width: '100%',
    height: '80%',
    borderRadius: horizontalScale(10),
    marginLeft: horizontalScale(5),
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
  },
  titleText: {
    fontSize: 18,
    flexWrap: 'wrap',
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    paddingVertical: verticalScale(5),
  },
  dateText: {
    fontSize: horizontalScale(12),
    flexWrap: 'wrap',
    fontFamily: fonts.SecondaryDMSansMedium,
    color: '#000',
    paddingVertical: verticalScale(5),
  },
});
