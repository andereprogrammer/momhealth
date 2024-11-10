import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Animated, View, ViewToken} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {horizontalScale} from '../../../helpers/layoutHelper';
import UserCardComponent, {
  UserCardProps,
} from '../components/UserCardComponent';

// import { Container } from './styles';
import {users} from '../../../constants/dummyList';

const SessionListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const onboardingRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
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
        data={users}
        ItemSeparatorComponent={() => (
          <View style={{borderWidth: 1, borderColor: '#d3d3d3'}} />
        )}
        viewabilityConfig={viewConfig}
        keyExtractor={item => item.userName}
        // onViewableItemsChanged={viewAbleItemChanged}
        ref={onboardingRef}
        renderItem={({item}: {item: UserCardProps}) => (
          <UserCardComponent
            source={item.source}
            userName={item.userName}
            notifications={item.notifications}
          />
        )}
      />
    </View>
  );
};

export default SessionListScreen;
