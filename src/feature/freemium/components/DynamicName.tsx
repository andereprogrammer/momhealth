import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const DynamicName = (props: Props) => {
  return (
    <View>
      {/* <Animated.View style={[animatedStyle]}>
              <LinearGradient
                start={{x: 0, y: 2}}
                end={{x: 1.1, y: 2}}
                colors={[
                  Pallete.homeLineraGradientLight,
                  Pallete.homeLinearGradientDark,
                ]}
                style={{
                  height: verticalScale(50),
                  flexDirection: 'row',
                  paddingRight: 10,
                }}>
                <View style={styles.headingView}>
                  {data?.patient !== undefined && (
                    <HeadingFontComponent
                      style={{
                        color: Pallete.plainWhite,
                      }}>
                      Hi, {dynamicName || ''}
                    </HeadingFontComponent>
                  )}
                </View>
              </LinearGradient>
            </Animated.View> */}
    </View>
  );
};

export default DynamicName;

const styles = StyleSheet.create({});
