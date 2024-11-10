import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {ElementType, ReactNode} from 'react';
import {commonStyles} from '../styles/pogStyles';

type Props = {
  ListComponent: ElementType;
  list: any;
};

const MappedVerticalList = ({ListComponent, list}: Props) => {
  return (
    <FlatList
      data={list}
      style={{
        flex: 1,
      }}
      contentContainerStyle={[commonStyles.spacing]}
      renderItem={({item}) => {
        return <ListComponent {...item} />;
      }}
    />
  );
};

export default MappedVerticalList;

const styles = StyleSheet.create({});
