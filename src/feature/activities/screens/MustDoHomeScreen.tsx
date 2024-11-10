import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ActivityHomeCardComponent from '../components/ActivityHomeCardComponent';
import TextOnlyActivityComponent from '../components/TextOnlyActivityComponent';
import MustDoComponent from '../components/MustDoComponent';
import {getTodos} from '../../../api/homeapis';
import moment from 'moment';
import {None} from '../../../assets';
import { useRoute } from "@react-navigation/native";

type Props = {};

const MustDoHomeScreen = (props: Props) => {
  const route =useRoute();
  const {value}=route.params;
  const [todos, settodos] = useState([]);
  useEffect(() => {
    getTodos()
      .then(res => {
        settodos(res.data.content);
      })
      .catch(e => {
        Alert.alert('Something went wrong ');
      });
  }, []);
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: horizontalScale(10),
        backgroundColor: '#fff',
      }}>
      {todos.map((todo, i) => {
        return (
          <MustDoComponent
            key={i}
            description={todo.description}
            title="Must Dos"
            date={moment(new Date()).format('DD-MM-YYYY')}
          />
        );
      })}
      {todos.length === 0 && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: verticalScale(102),
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
            source={None}
          />
          <Text
            style={{
              fontSize: 18,
            }}>
            Your all caught up!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MustDoHomeScreen;

const styles = StyleSheet.create({});
