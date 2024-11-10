import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Pallete} from '../../../../theme/enum';
import ViewShimmer from './ViewShimmer';

const PopUpScreenSkeleton = () => {
  return (
    <View style={styles.screenContainer}>
      <ViewShimmer height={200} width={'50%'} />
      <ViewShimmer height={20} width={'90%'} />
      <ViewShimmer height={20} width={'80%'} />
      {[1, 2, 3, 4].map(item => {
        return <ViewShimmer height={80} key={item} width={'60%'} />;
      })}
      <ViewShimmer height={40} width={'60%'} />
      <ViewShimmer height={20} width={'80%'} />
    </View>
  );
};

export default PopUpScreenSkeleton;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Pallete.plainWhite,
    paddingVertical: 50,
  },
});
