import React from 'react';
import {styled} from 'styled-components/native';
import {CTAProps} from './types';
import theme from '../../../theme/Theme';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {Pallete} from '../../../theme/enum';

const MainCtaComponent: React.FC<CTAProps> = props => {
  const handleclick = () => {
    if (props.active) {
      props.onClick();
    }
  };
  const CtaText = styled.Text`
    ${theme.textVariants.cta}
  `;
  return (
    <React.Fragment>
      <LinearGradient
        colors={
          props.active
            ? props.colors ?? [
                Pallete.linearGradientDark,
                Pallete.linearGradientMedium,
                Pallete.linearGradientLight,
              ]
            : [theme.colors.ctadisabled, theme.colors.ctadisabled]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.btnStyle,props.style]}>
        <TouchableOpacity style={styles.btnView} onPress={handleclick}>
          {props.loading ? (
            <ActivityIndicator color={'#fff'} animating />
          ) : (
            <CtaText>{props.children}</CtaText>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </React.Fragment>
  );
};
export const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  btnView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainCtaComponent;
