import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import {SessionObject} from '../../../constants/types';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {
  getAllDetailsSession,
  getSessionInfoById,
} from '../../../api/sessionBooking';
import {
  extractSessionInfo,
  extractSingleSessionInfo,
} from '../helpers/sessionObjectDestructuring';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/SessionFlowNavigation';
import useDataProvider from "../../../context-store/useDataProvider";

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    'SessionFullDetailsScreen'
  > {}

const SessionNotificationNavigationScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const sessionId: SessionObject = route?.params?.id;
  const {setID} = useDataProvider();

  useEffect(() => {
    if (sessionId) {
      console.log('SessionNotificationNavigationScreen', sessionId);
      getSessionInfoById(sessionId).then(res => {
        console.log('getSessionInfoById', res.data.content);
        const sessionObjs = extractSessionInfo(res.data.content);
        console.log('extractSessionInfo', sessionObjs);
        setID(sessionObjs[0]._id);
        navigation.dispatch(
          StackActions.replace('SessionFullDetailsScreen', {
            sessionObject: sessionObjs[0],
          }),
        );
        // navigation.navigate('SessionFullDetailsScreen', {
        //   sessionObject: sessionObjs[0],
        // });
      });
    }
  }, [sessionId]);

  return (
    <View style={styles.homeContainer}>
      <LoadingAnimationScreen />
    </View>
  );
};

export default SessionNotificationNavigationScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
