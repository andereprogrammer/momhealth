import {FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/ChatScreenNavigation';
import {Pallete, fonts} from '../../../theme/enum';
import ChatContext from '../../../context-store/chat/ChatContext';
import {Instructor, groupChatIcon} from '../../../assets';
import useDataProvider from '../../../context-store/useDataProvider';

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    'ChatGroupDetailsScreen'
  > {}
const ChatGroupDetailsScreen: React.FC<Props> = ({route}) => {
  const {users} = useContext(ChatContext);
  const {patientDetails} = useDataProvider();
  const userId: string = route?.params?.userId;
  const user = users.get(userId);
  console.log('allusers', users);
  let members = user?.members
    .map(item => users.get(item.jid))
    .filter(item => item?.jid);
  members?.push({name: 'You', role: '', jid: 'self'});

  const Item = ({jid, name, role}: ItemProps) => {
    let user;
    if (jid === 'self') {
      user = {profile_image: patientDetails.patient.profile_image};
    } else {
      const id = jid.split('@')[0].toUpperCase().split('.')[0];
      user = patientDetails.care_team.service_providers.filter(
        s => s.id === id,
      )[0];
    }
    console.log('user', user);
    return (
      <View style={styles.item}>
        <View style={styles.itemImageView}>
          <Image
            style={styles.instructorImageAspect}
            source={
              user?.profile_image ? {uri: user.profile_image} : Instructor
            }
          />
        </View>
        <View style={styles.itemTextView}>
          <Text style={styles.instructorName}>{name}</Text>
          <Text style={styles.instructorRole}>{role}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <BackHeader title={' Group Info'} />
      <View style={styles.mainView}>
        <View style={styles.viewStyle}>
          <View style={styles.groupInfoView}>
            <Image
              source={groupChatIcon}
              resizeMethod="resize"
              resizeMode="contain"
              style={styles.groupIconStyle}
            />
          </View>
          <Text style={styles.userNameText}>{user?.name}</Text>
          <Text style={styles.participantSubText}>
            {members?.length} participants
          </Text>
        </View>
      </View>
      <Text style={styles.participantHeading}>
        {members?.length} participants
      </Text>

      <FlatList
        data={members}
        renderItem={({item, index}) => (
          <Item key={index} name={item.name} role={item.role} jid={item.jid} />
        )}
        keyExtractor={item => item?.jid}
        contentContainerStyle={{}}
      />
    </View>
  );
};

type ItemProps = {jid: string; name: string; role: string};

export default ChatGroupDetailsScreen;

const styles = StyleSheet.create({
  instructorImageAspect: {
    width: '80%',
    height: '90%',
    borderRadius: horizontalScale(10),
  },
  instructorName: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#333',
  },
  instructorRole: {
    fontFamily: fonts.SecondaryDMSansMedium,
    color: '#777',
  },
  itemTextView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(8),
  },
  itemImageView: {
    width: '25%',
    height: '100%',
    borderRadius: horizontalScale(10),
  },
  participantHeading: {
    fontFamily: fonts.SecondaryDMSansMedium,
    color: '#000',
    fontSize: 20,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  participantSubText: {
    fontFamily: fonts.SecondaryDMSansRegular,
    color: 'rgba(111, 104, 113, 1)',
  },
  userNameText: {
    fontFamily: fonts.SecondaryDMSansRegular,
    color: 'rgba(15, 4, 18, 1)',
  },
  groupInfoView: {
    width: '20%',
    height: '45%',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 214, 246, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flexDirection: 'column',
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    justifyContent: 'center',
    height: verticalScale(165),
    width: '100%',
    backgroundColor: 'rgba(255, 242, 209, 1)',
  },
  containerView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? verticalScale(38) : verticalScale(5),
    backgroundColor: Pallete.plainWhite,
  },
  item: {
    backgroundColor: Pallete.plainWhite,
    marginVertical: 8,
    borderRadius: horizontalScale(10),
    borderColor: 'rgba(250, 242, 255, 1)',
    elevation: 30,
    shadowColor: 'rgba(71, 31, 185, 0.12)',
    shadowOffset: {width: 4, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(5),
    width: '94%',
    alignSelf: 'center',
    maxHeight: verticalScale(80),
    flexDirection: 'row',
  },
  viewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: 'rgba(255, 242, 209, 1)',
  },
  textStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: '90%',
    backgroundColor: Pallete.plainWhite,
  },
  scrollView: {flex: 1, backgroundColor: Pallete.plainWhite},
  nameSpacing: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textStyleName: {
    fontSize: 15,
    fontFamily: fonts.SecondaryDMSansMedium,
  },
  groupStyle: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
  },
  groupIconStyle: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
  },
  role: {
    color: '#777',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  userName: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 16,
  },
});
