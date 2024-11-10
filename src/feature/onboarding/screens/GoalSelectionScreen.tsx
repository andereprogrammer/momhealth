import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, Pallete} from '../../../theme/enum';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../context-store/useDataProvider';
import GoalsCard from '../components/GoalsCard';
import {goal_list} from '../constants/goalsList';
import {MotiView} from 'moti';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STAGES} from '../constants';

type Props = {};

const GoalSelectionScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [selectedGoals, setSelectedGoals] = useState(goal_list);
  const [select, setSelectedPath] = useState({
    pregnant: false,
    newMom: false,
  });
  const {setSyptomFinalList, setOnboardingPath} = useDataProvider();
  const updateGoalsSelection = (index: number) => {
    trigger('impactHeavy', options);
    setSelectedGoals(() => {
      let newGoals = [...selectedGoals];
      if (!newGoals[index].selected) {
        newGoals[index].selected = true;
      } else {
        newGoals[index].selected = false;
      }
      return newGoals;
    });
  };
  useEffect(() => {
    const value = JSON.stringify(false);
    AsyncStorage.setItem('onboarded', value);
    setOnboardingPath({...select, pregnant: true, newMom: false});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="" bgcolor="transparent" />
      <View style={styles.titleHeaderView}>
        <Text style={styles.primaryText}>My goals and interests </Text>
        <Text style={styles.secondaryText}>(choose as many as apply)</Text>
      </View>
      <View style={styles.goalList}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.listContainer}>
          {selectedGoals.map((item, index) => {
            return (
              <GoalsCard
                onGoalClicked={updateGoalsSelection}
                item={item}
                index={index}
                key={index}
              />
            );
          })}
          <View style={styles.spacer} />
        </ScrollView>
      </View>
      <View style={styles.btnSpacing}>
        <MainCtaComponent
          active
          style={{}}
          onClick={() => {
            setSyptomFinalList(selectedGoals.filter(goals => goals.selected));
            navigation.navigate('AnimatedScreen');
          }}>
          {selectedGoals.filter(goals => goals.selected).length > 0
            ? 'Next'
            : 'Skip'}
        </MainCtaComponent>
      </View>
    </SafeAreaView>
  );
};

export default GoalSelectionScreen;

const styles = StyleSheet.create({
  spacer: {
    height: 40,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Pallete.EbonyGray,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  primaryText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Pallete.black,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  titleHeaderView: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  goalList: {
    flex: 0.9,
    marginVertical: 10,
  },
  btnSpacing: {
    paddingHorizontal: 20,
  },
});
