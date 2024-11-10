import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styled} from 'styled-components/native';
import {CardProps} from '../types';

// import { Container } from './styles';

const SelectionCardComponent: React.FC<CardProps> = props => {
  const SelectionCard = styled.View`
    width: 280px;
    height: 60px;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #e9e7ea;
    padding: 20px;
  `;
  return (
    <>
      <SelectionCard>
        <Text style={styles.shortText}>{props.shortText}</Text>
        <Text style={styles.mainText}>{props.mainText}</Text>
      </SelectionCard>
    </>
  );
};
const styles = StyleSheet.create({
  shortText: {
    fontWeight: '400',
    fontSize: 16,
  },
  mainText: {
    fontWeight: '500',
    fontSize: 16,
  },
});
export default SelectionCardComponent;
