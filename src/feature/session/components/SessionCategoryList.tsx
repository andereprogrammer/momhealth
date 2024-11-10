import {
  Animated,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Aerobics,
  Lama,
  LamazeIcon,
  MentalLock,
  Mutrilock,
  Physio,
  PhysioIcon,
  Physiolock,
  YogaILS,
  YogaIcon,
  Yogalock,
} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {FlatList} from 'react-native';
import theme from '../../../theme/Theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type SessionProps = {
  sessionName: string;
  sessionIcon: ImageProps['source'];
};
type SessionOrientation = {
  orientation: boolean;
  col: number | undefined;
};

const SessionCategoryList = ({orientation, col}: SessionOrientation) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const onboardingRef = useRef(null);
  const sessionList: SessionProps[] = [
    {
      sessionName: 'Nutrition',
      sessionIcon: Mutrilock,
    },
    {
      sessionName: 'Physio',
      sessionIcon: Physiolock,
    },
    {
      sessionName: 'Mental',
      sessionIcon: MentalLock,
    },
    {
      sessionName: 'Aerobics',
      sessionIcon: Aerobics,
    },
  ];
  function takeMetoInput() {
    navigation.navigate('InputMobileNumberScreen');
  }
  const viewAbleItemChanged = useRef(
    ({viewableItems, changed}: {viewableItems: ViewToken[]}) => {
      console.log(changed);
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={sessionList}
        horizontal={true}
        style={{
          flex: 1,
          paddingHorizontal: horizontalScale(10),
        }}
        contentContainerStyle={{
          gap: 4,
          paddingRight: 20,
        }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        viewabilityConfig={viewConfig}
        keyExtractor={item => item.sessionName}
        ref={onboardingRef}
        renderItem={({item}: {item: SessionProps}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('LockedFeaturesScreen')}
            style={{
              width: horizontalScale(140),
              height: horizontalScale(180),
              backgroundColor: '#fff',
              borderRadius: horizontalScale(20),
              elevation: 12,
              shadowColor: theme.colors.inputBg,
              borderColor: theme.colors.inputBg,
            }}>
            <View
              style={{
                width: '100%',
                height: '95%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 12,
                shadowColor: theme.colors.inputBg,
                borderColor: theme.colors.inputBg,
                shadowOpacity: 1,
                shadowRadius: 4,
              }}>
              <View style={{width: '100%', height: '70%', borderRadius: 40}}>
                <Image
                  resizeMode="cover"
                  resizeMethod="resize"
                  source={item.sessionIcon}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              {/* <Text>{item.sessionName}</Text> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SessionCategoryList;

const styles = StyleSheet.create({});
