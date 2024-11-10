import React from 'react';
import {View} from 'react-native';
import {horizontalScale} from '../../helpers/layoutHelper';
import {ProgressBar} from 'react-native-paper';
import {ProgressIndicator} from './types';
ProgressBar;

// import { Container } from './styles';

const ProgressBarComponent: React.FC<ProgressIndicator> = props => {
  return (
    <View
      style={{
        width: '96%',
        flexDirection: 'row',
        height: '5%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 8,
      }}>
      <View
        style={{
          width: '30%',
          height: '28%',
          borderRadius: 20,
          backgroundColor: '#F6F6F6',
        }}>
        <View
          style={{
            width: props.tile1,
            height: '100%',
            backgroundColor: '#FF76E1',
            borderRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          width: '30%',
          height: '28%',
          backgroundColor: '#F6F6F6',
          borderRadius: 20,
        }}>
        <View
          style={{
            width: props.tile2,
            height: '100%',
            backgroundColor: '#FF76E1',
            borderRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          width: '30%',
          height: '28%',

          borderRadius: 20,
          backgroundColor: '#F6F6F6',
        }}>
        <View
          style={{
            width: props.tile3,
            height: '100%',
            backgroundColor: '#FF76E1',
            borderRadius: 20,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBarComponent;
