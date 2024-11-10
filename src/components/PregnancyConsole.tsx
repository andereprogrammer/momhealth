import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

type Props = {};

const Indicator = () => {
  return <View></View>;
};

const Tab = ({title, selectedTitle}) => {
  return (
    <View>
      <Text>{title}</Text>
      {selectedTitle === title && <Indicator />}
    </View>
  );
};

const PregnancyConsole = (props: Props) => {
  const [selectedTitle, setSelectedTitle] = useState('Fetal atlas');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Tab title={'Fetal atlas'} />
        <Tab title={'Doctors videos'} />

        <Tab title={'Diagnostic videos'} />
      </View>
    </View>
  );
};

export default PregnancyConsole;

const styles = StyleSheet.create({});
