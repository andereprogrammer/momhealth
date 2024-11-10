import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Search} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BackHeader from '../../../components/MainContainer/BackHeader';

type Props = {
  searchTerm: (term: string) => {};
  nickName: string;
};

const ChatHeader = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [showSearch, setShowSearch] = useState(false);
  const handleInput = () => {
    navigation.navigate('ChatSearchScreen');
  };
  const handleChangeText = text => {
    props.searchTerm(text);
  };
  return (
    <BackHeader
      title={props.nickName}
      SecondaryComponent={
        <TouchableOpacity onPress={handleInput} style={styles.btnStyle}>
          <Image
            style={styles.imgAspect}
            tintColor={'black'}
            resizeMethod="resize"
            resizeMode="contain"
            source={Search}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  imgAspect: {
    width: '100%',
    height: '100%',
  },
});
