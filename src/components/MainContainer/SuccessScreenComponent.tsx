import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {styled} from 'styled-components/native';
import IllustrationImageComponent from '../ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import theme from '../../theme/Theme';
import {SuccessProps} from './types';
import {Pregnant} from '../../assets/animations';

// import { Container } from './styles';

const SuccessScreenComponent: React.FC<SuccessProps> = props => {
  const ChoosePathView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props.bg};
    gap: 20px;
  `;
  return (
    <>
      <ChoosePathView style={props.style}>
        <TouchableOpacity activeOpacity={1} style={styles.containerOpacity}>
          <IllustrationImageComponent
            animationSource={props.animationSource}
            source={props.imageVar}
            Viewstyle={[styles.viewStyleImage, styles.borderSelected]}
            Imagestyle={styles.imageStyle}
          />
          {props.showExtraText && (
            <Text style={styles.selectionText}>{props.shortText}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.congratsText}>{props.successText}</Text>
      </ChoosePathView>
    </>
  );
};
const styles = StyleSheet.create({
  borderSelected: {
    borderColor: theme.colors.cardPrimaryBackground,
    // borderWidth: 2,
  },
  viewStyleImage: {
    width: 180,
    height: 240,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsText: {
    fontWeight: '700',
    fontSize: 24,
    flexWrap: 'wrap',
    padding: 20,
    textAlign: 'center',
    color: '#000',
  },
  selectionText: {fontWeight: '500', fontSize: 18, color: '#000'},
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    overflow: 'hidden',
    transform: [{scaleX: 1.75}, {scaleY: 1.8}],
  },
  containerOpacity: {alignItems: 'center', gap: 10},
  headingText: {fontWeight: '800', fontSize: 18},
});
export default SuccessScreenComponent;
