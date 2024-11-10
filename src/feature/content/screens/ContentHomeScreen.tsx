import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderTextComponent from '../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import ContentListComponent from '../../dashboard/components/FlatListComponents/ContentListComponent';
import ContentCardComponent from '../../dashboard/components/FlatListComponents/ContentCardComponent';
import CategoryCardComponent from '../components/CategoryCardComponent';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {};

const ContentHomeScreen = (props: Props) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginVertical: verticalScale(10),
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <HeaderTextComponent
          mainText="What to expect in 12 weeks"
          callTextPresent={true}
          callText="View all"
          style={{}}
        />
        <ContentListComponent />
        {/* <View style={{width: '100%', height: '40%', alignItems: 'center'}}> */}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: horizontalScale(30),
          }}>
          <CategoryCardComponent />
          <CategoryCardComponent />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: horizontalScale(30),
          }}>
          <CategoryCardComponent />
          <CategoryCardComponent />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: horizontalScale(30),
          }}>
          <CategoryCardComponent />
          <CategoryCardComponent />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: horizontalScale(30),
          }}>
          <CategoryCardComponent />
          <CategoryCardComponent />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: horizontalScale(30),
          }}>
          <CategoryCardComponent />
          <CategoryCardComponent />
        </View>
      </View>
    </ScrollView>
  );
};

export default ContentHomeScreen;

const styles = StyleSheet.create({});
