import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomReportsHeader from '../components/CustomReportsHeader';
import ReportCards from '../components/ReportCard';
import {getReports} from '../../../api/homeapis';
import ReportsHolderCard from '../../dashboard/components/Cards/ReportsHolderCard';
import {useFocusEffect} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {};

const ReportsHomeScreen = (props: Props) => {
  let [reports, setReports] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getReports()
        .then(res => {
          setReports(res.data.content);
        })
        .catch(e => {
          Alert.alert('Oops something went wrong');
        });
    }, []),
  );
  return (
    <View
      style={[
        styles.mainContainerView,
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <CustomReportsHeader />
      <Text
        style={{
          paddingHorizontal: horizontalScale(20),
          paddingVertical: verticalScale(10),
          fontSize: 16,
          color: '#c3c3c3',
        }}>
        Latest Reports
      </Text>
      <ScrollView
        style={{
          flex: 1,
        }}>
        {reports.length === 0 && (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text
              style={{
                fontWeight: '500',
                textAlign: 'center',
                fontSize: 16,
              }}>
              No Reports found at the momment , click on the add button to
              upload a Report
            </Text>
          </View>
        )}

        {reports.map((report, i) => {
          return (
            // <ReportCards
            //   key={i}
            //   reportName={report.title}
            //   date="3 rd October"
            // />
            <View
              key={i}
              style={{
                width: '100%',
                height: verticalScale(75),
                marginVertical: verticalScale(2),
                alignItems: 'center',
              }}>
              <ReportsHolderCard report={report} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ReportsHomeScreen;

const styles = StyleSheet.create({
  mainContainerView: {
    height: '100%',
    backgroundColor: '#fff',
  },
});
