import React from 'react';
import {View, useWindowDimensions, Animated, StyleSheet} from 'react-native';
import theme from '../../../theme/Theme';
import {PatientProgram} from '../../../api/packages';

type Scroll = {
  scrollX: Animated.Value;
  packages: PatientProgram[] | undefined;
  onPage: boolean;
};
const PaginatorPackageComponent: React.FC<Scroll> = (props: Scroll) => {
  const {width} = useWindowDimensions();
  console.log('asdasdasd', props.scrollX);
  return (
    <>
      <View style={styles.viewStyle}>
        {props.packages.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dataWidth = props.scrollX.interpolate({
            inputRange,
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                width: dataWidth,
                backgroundColor: theme.colors.cardPrimaryBackground,
                borderRadius: 5,
                height: 10,
                marginHorizontal: 8,
              }}
            />
          );
        })}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default React.memo(PaginatorPackageComponent);
