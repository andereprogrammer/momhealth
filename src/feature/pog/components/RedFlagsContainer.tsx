import {StyleSheet, View} from 'react-native';
import React from 'react';
import RedFlagCard from './RedFlagCard';

type Props = {
  redflagsData: any;
};

const RedFlagsContainer = ({redflagsData}: Props) => {
  return (
    <View>
      {redflagsData.map((redFlag: any, index: number) => {
        return (
          <RedFlagCard
            key={index}
            redFlagTitle={redFlag.title}
            listOfRedFlags={redFlag.list}
          />
        );
      })}
    </View>
  );
};

export default RedFlagsContainer;

const styles = StyleSheet.create({});
