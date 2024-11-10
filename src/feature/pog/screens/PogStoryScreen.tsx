import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useDataProvider from '../../../context-store/useDataProvider';
import ImageWithView from '../../../components/ImageWithView';
import {Pallete} from '../../../theme/enum';
import {commonStyles} from '../styles/pogStyles';
import {SCREEN_HEIGHT_WINDOW} from '../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ChangesInYourBodyCard from '../components/ChangesInYourBodyCard';
import ThingsToDoCard from '../components/ThingsToDoCard';
import CommonIssueDropDown from '../components/CommonIssueDropDown';

type Props = {};

const PogStoryScreen = ({route}: Props) => {
  const {key} = route.params;
  const {currentWeekData} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  let [content, setContent] = useState(currentWeekData.week_data[key]);
  const [current, setCurrent] = useState<number>(0);

  const progressRef = useRef(new Animated.Value(0)).current;
  const next = () => {
    if (current) {
      if (current !== content.length - 1) {
        let tempData = content;
        setContent(tempData);
        progressRef.setValue(0);
        setCurrent(prev => prev + 1);
      } else {
        close();
      }
    }
  };
  const previous = () => {
    if (current) {
      if (content.length - 1 >= 0) {
        let tempData = content;
        setContent(tempData);
        progressRef.setValue(0);
        setCurrent((prev: any) => prev - 1);
      } else {
        close();
      }
    }
  };
  const close = () => {
    navigation.goBack();
  };
  const start = () => {
    Animated.timing(progressRef, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      } else {
        close();
      }
    });
  };
  useEffect(() => {
    progressRef.setValue(0);
  }, [current]);
  const componentRegistry = {
    body_changes: ChangesInYourBodyCard,
    things_to_dos: ThingsToDoCard,
    common_issues: CommonIssueDropDown,
  };
  const Component = componentRegistry[key];

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: Pallete.backgroundPink,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 80,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          zIndex: 100,
        }}>
        {content.map((item, index) => {
          return (
            <View
              style={{
                height: 3,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 20,
                flex: 1,
                marginLeft: 5,
                flexDirection: 'row',
              }}>
              <Animated.View
                style={{
                  flex: current === index ? 1 : 0,
                  backgroundColor: '#000',
                  height: 3,
                  borderRadius: 20,
                }}
              />
            </View>
          );
        })}
      </View>
      <Component {...content[current]} />
      <LinearGradient
        style={{
          height: 80,
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
        colors={[
          'rgba(0, 0, 0, 0.3)',
          Pallete.backgroundPink,
        ]}></LinearGradient>

      <View
        style={{
          position: 'absolute',
          top: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setCurrent((prev: any) => prev - 1);
            console.log('object');
          }}
          activeOpacity={1}
          style={{
            width: '20%',
            height: '100%',
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (current !== content.length - 1) {
              setCurrent((prev: any) => prev + 1);
            } else {
              close();
              console.log('object');
            }
          }}
          activeOpacity={1}
          style={{width: '20%', height: '100%'}}></TouchableOpacity>
      </View>
    </View>
  );
};

export default PogStoryScreen;

const styles = StyleSheet.create({});
