import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SessionCategoryList from '../components/SessionCategoryList';
import theme from '../../../theme/Theme';

type Props = {};

const PerosnalSessionHome = (props: Props) => {
  return (
    <View style={[theme.textVariants.defaults, styles.container]}>
      <>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text style={{padding: 30}}>Book a 1-1 personal session</Text>
        </View>
        <View
          style={{
            flex: 0.8,

            marginTop: 20,
            marginRight: 10,
          }}>
          <SessionCategoryList orientation={false} col={2} />
        </View>
      </>
    </View>
  );
};

export default PerosnalSessionHome;

export const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
});
