import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {
  Clock,
  Instructor,
  Privacy,
  ProfileCare,
  Scholar,
  StethoScope,
} from '../../../assets';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import theme from '../../../theme/Theme';
import ExpertNotesCard from '../components/ExpertNotesCard';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SessionObject} from '../../../constants/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../session/navigation/SessionFlowNavigation';
import {getMedicalJournalByServiceProvider} from '../../../api/homeapis';
import ExpertNotesCardV2 from '../components/ExpertNotesCardV2';
import {MedicalJournal} from '../../chat/screens/ChatExpertNotesScreen';
import ChatContext from '../../../context-store/chat/ChatContext';
import {MessageStatus, XmppMessage} from '../../../context-store/chat/type';
import useDataProvider from '../../../context-store/useDataProvider';

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    'SessionFullDetailsScreen'
  > {}

const SP_XMPP_DOMAIN = '.sp@everheal';
const CarePersonDetailsScreen: React.FC<Props> = ({route}) => {
  const name: string = route?.params?.name;
  const category: string = route?.params?.category;
  const id: string = route?.params?.id;
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [medicalJournals, setMedicalJournals] = useState<MedicalJournal[]>([]);
  const {users, unreadMessageMap, messages} = useContext(ChatContext);
  const [user, setUser] = useState(null);
  const [sp, setSp] = useState(null);
  const {patientDetails} = useDataProvider();

  const {jidUser} = useDataProvider();
  const [unreadMessageId, setUnreadMessageId] = useState<string>(null);

  const isUnread = (msg: XmppMessage) => {
    switch (msg.status) {
      case MessageStatus.received:
        return true;
      default:
        return false;
    }
  };

  const calcFirstUnreadMessage = user => {
    let conversationId = `${user.jid}_${jidUser}`;
    // console.log('messages', messages);
    console.log('conversationId', conversationId);
    console.log('messages of all', messages);
    let relevantMessagesMap = messages.conversationOf(conversationId);
    if (relevantMessagesMap) {
      // console.log('messages of conversationId', conversationId, relevantMessagesMap);
      let relevantMessages = Array.from(relevantMessagesMap.values());
      relevantMessages?.sort((a, b) => {
        return a.generated.valueOf() - b.generated.valueOf();
      });

      let unreadCount = unreadMessageMap.get(user.jid);
      let isUnreadAdded = false;
      if (unreadCount && unreadCount > 0) {
        for (
          let relIndex = 0;
          relIndex < relevantMessages?.length;
          relIndex++
        ) {
          let relMessage = relevantMessages[relIndex];
          if (isUnread(relMessage) && unreadCount && !isUnreadAdded) {
            setUnreadMessageId(relMessage.id);
            isUnreadAdded = true;
          }
        }
      }
    }
  };

  useEffect(() => {
    let jid = id.toLowerCase() + SP_XMPP_DOMAIN;
    console.log('Searching ', jid);
    let user = users.get(jid);
    setUser(user);
    if (user && user.isVisible) {
      calcFirstUnreadMessage(user);
    }
  }, [unreadMessageMap]);


  useEffect(() => {
    if (id) {
      getMedicalJournalByServiceProvider(id, 0).then(res => {
        setMedicalJournals(res.data.content);
      });
      let sps = patientDetails.care_team.service_providers.filter(
        s => s.id === id,
      );
      if (sps && sps.length != 0) {
        setSp(sps[0]);
      }
    }
  }, []);

  const navigateToChat = () => {
    console.log('user ', user);
    if (user) {
      let count = unreadMessageMap.has(user.jid)
        ? unreadMessageMap.get(user.jid)
        : 0;
      navigation.navigate({
        name: 'CareTeamChat',
        key: user?.jid,
        params: {
          xmppUser: user,
          jid: user?.jid,
          name: user?.name,
          isGroup: user?.isGroup,
          role: user?.role,
          scrollToMessage: null,
          image: sp?.profile_image,
          unreadMessage: {
            count: count,
            firstMessageId: unreadMessageId,
          },
        },
      });
    }
  };

  return (
    <View
      style={[
        {flex: 1, backgroundColor: '#fff'},
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <BackHeader title={name} />
      <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
        <View
          style={{
            width: '98%',
            height: verticalScale(90),
            paddingVertical: verticalScale(5),
            marginVertical: verticalScale(10),
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '95%',
              height: '100%',
              borderRadius: horizontalScale(20),
              backgroundColor: 'rgba(255, 255, 255, 1)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: horizontalScale(1),
              paddingVertical: horizontalScale(5),
              elevation: 30,
              shadowColor: '#C3C3C3',
              shadowOpacity: 0.8,
              shadowOffset: {width: 1, height: 1},
            }}>
            <View
              style={{
                width: '22%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: horizontalScale(10),
                borderRadius: horizontalScale(15),
              }}>
              <Image
                style={{
                  width: '95%',
                  height: '90%',
                  borderRadius: horizontalScale(10),
                }}
                resizeMethod="resize"
                resizeMode="cover"
                source={
                  sp?.profile_image !== null
                    ? {uri: sp?.profile_image}
                    : Instructor
                }
              />
            </View>
            <View
              style={{
                width: '70%',
                height: '100%',
                paddingVertical: verticalScale(5),
              }}>
              <HeadingFontComponent style={{fontSize: 16, color: 'black'}}>
                {name}
              </HeadingFontComponent>
              <View
                style={{
                  width: '100%',
                  height: '25%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <View
                  style={{
                    width: '65%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {sp?.metadata?.designation ? (
                    <Text style={{color: '#777'}}>
                      {sp?.metadata?.designation}
                    </Text>
                  ) : (
                    <Text style={{color: '#777'}}>NA</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '25%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <View
                  style={{
                    width: '75%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#777'}}>
                    {sp?.metadata?.experience} experience
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '35%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={Scholar}
                  style={{width: '10%', height: '60%'}}
                />
                <View
                  style={{
                    width: '75%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {sp?.metadata?.qualifications ? (
                    <Text style={{color: '#777'}}>
                      {sp?.metadata?.qualifications}
                    </Text>
                  ) : (
                    <Text style={{color: '#777'}}>NA</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        {user?.isVisible && (
          <View
            style={{
              width: '100%',
              height: verticalScale(90),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: horizontalScale(10),
            }}>
            <TouchableOpacity
              onPress={navigateToChat}
              style={{
                width: '45%',
                height: '62%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: horizontalScale(25),
                elevation: 10,
                shadowColor: '#c3c3c3',
                padding: horizontalScale(20),
                gap: 2,
                borderWidth: 1,
                backgroundColor: '#FFF',
                borderColor: '#FFF2F1',
              }}>
              <View
                style={{
                  width: '30%',
                  height: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                  source={Privacy}
                />
              </View>
              <Text style={{fontFamily: 'DMSans-Medium'}}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            alignItems: 'flex-start',
            paddingHorizontal: horizontalScale(10),
          }}>
          <HeadingFontComponent style={{fontSize: 16, color: '#000'}}>
            Expert's notes
          </HeadingFontComponent>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            paddingHorizontal: horizontalScale(10),
          }}>
          {medicalJournals &&
            medicalJournals.map(medicalJournal => {
              return (
                <ExpertNotesCardV2
                  key={medicalJournal.id}
                  journal={medicalJournal}
                  showSP={false}
                />
              );
            })}
          {medicalJournals.length === 0 && (
            <View
              style={{
                paddingVertical: 20,
              }}>
              <Text>No notes</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CarePersonDetailsScreen;

const styles = StyleSheet.create({});
