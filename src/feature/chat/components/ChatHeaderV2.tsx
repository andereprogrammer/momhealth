import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackBtn,
  ChatPlacerHolder,
  groupChatIcon,
  Instructor,
  moreIcon,
  Search,
} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BackHeader, {
  navigationProps,
} from '../../../components/MainContainer/BackHeader';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../theme/enum';
import {XmppUser} from '../../../context-store/chat/type';

type Props = {
  searchTerm: (term: string) => {};
  nickName: string;
  subText: string;
  image?: string;
  isGroup: boolean;
  xmppUser: XmppUser;
};

const ChatHeaderV2 = (props: Props) => {
  const [showSearch, setShowSearch] = useState(false);
  const handleInput = () => {
    if (!props.isGroup) {
      navigation.navigate('CarePersonDetailsScreen', {
        name: props.xmppUser.name,
        category: props.xmppUser.role,
        id: props.xmppUser.jid.split('.')[0].toUpperCase(),
      });
    } else {
      navigation.navigate('ChatGroupDetailsScreen', {
        userId: props.xmppUser.jid,
      });
    }
  };
  const handleChangeText = text => {
    props.searchTerm(text);
  };
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  function takeMeback() {
    navigation.goBack();
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: verticalScale(5),
        paddingHorizontal: horizontalScale(5),
        justifyContent: 'flex-start',
        height: 45,
      }}>
      <View style={styles.viewStyle}>
        <TouchableWithoutFeedback
          style={styles.buttonStyle}
          hitSlop={30}
          onPress={() => takeMeback()}>
          <Image
            style={styles.imageStyle}
            source={BackBtn}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        {props.isGroup ? (
          <>
            <View
              style={{
                width: '12%',
                height: '100%',
                borderRadius: 10,
                backgroundColor: 'rgba(255, 214, 246, 0.7)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={groupChatIcon}
                resizeMethod="resize"
                resizeMode="contain"
                style={styles.groupIconStyle}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                width: '12%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconStyle}
                source={props?.image ? {uri: props?.image} : Instructor}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
          </>
        )}
        <View style={{width: '90%'}}>
          {props.isGroup ? (
            <View style={{width: '88%'}}>
              <Text numberOfLines={1} style={styles.groupStyle}>
                {props.nickName}
              </Text>
              <Text style={styles.subHeadingStyle}>
                Group - {props.xmppUser.members.length} participants
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.textStyle}>{props.nickName}</Text>
              <Text style={styles.subHeadingStyle}>{props.subText}</Text>
            </>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleInput} style={styles.btnStyle}>
        <Image
          style={styles.imgAspect}
          tintColor={'black'}
          resizeMethod="resize"
          resizeMode="contain"
          source={moreIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeaderV2;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 18,
    textAlign: 'left',
  },
  groupStyle: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
  },
  subHeadingStyle: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 12,
    textAlign: 'left',
    color: '#6F6871',
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    width: '90%',
    backgroundColor: Pallete.plainWhite,
  },
  buttonStyle: {
    height: 35,
  },
  imageStyle: {
    width: 20,
    height: '50%',
  },
  iconStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  groupIconStyle: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '10%',
  },
  imgAspect: {
    width: '50%',
    height: '70%',
  },
});
