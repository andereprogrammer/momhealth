import {SectionList, Platform, StyleSheet, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {fonts, Pallete} from '../../../theme/enum';
import useDataProvider from '../../../context-store/useDataProvider';
import NotificationCard from '../components/NotificationCard';
import NotificationEmptyState from '../components/NotificationEmptyState';
import moment from 'moment';
import {getNotifications} from '../../../api/homeapis';
import {countNotReadNotifications} from '../../freemium/screens/FreemiumHomeScreen';
import {NOTIFICATION_POLLING_INTERVAL} from '../../../constants';

type Props = {};

const NotificationBayScreen = (props: Props) => {
  const {notifications, setNotifications, setCountNotification} =
    useDataProvider();

  const initNotifications = () => {
    getNotifications()
      .then(res => {
        setNotifications(res.data.content);
        let count = countNotReadNotifications(res.data.content);
        setCountNotification(count);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    initNotifications();
    const intervalId = setInterval(() => {
      initNotifications();
    }, NOTIFICATION_POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const isToday = date => {
    return moment.utc(date).isSame(moment.utc(), 'day');
  };

  const transformNotifications = (notificationsObj: any) => {
    const todayNotifications = [];
    const olderNotifications = [];

    notificationsObj.forEach((notification: any) => {
      if (isToday(notification.created)) {
        todayNotifications.push(notification);
      } else {
        olderNotifications.push(notification);
      }
    });

    const sections = [];
    if (todayNotifications.length > 0) {
      sections.push({title: 'Today', data: todayNotifications});
    }
    if (olderNotifications.length > 0) {
      sections.push({title: 'Older', data: olderNotifications});
    }

    return sections;
  };

  const sections = transformNotifications(notifications);

  return (
    <View style={styles.mainContainer}>
      <BackHeader title={'Notifications Panels'} />
      {notifications.length !== 0 ? (
        <SectionList
          sections={sections}
          renderItem={({item}) => (
            <NotificationCard
              header={item.item.title}
              message={item.item.content}
              iconSource={item.item.icon}
              ctas={item.item.actions}
              created={item.item.created}
              status={item.status}
              id={item.id}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      ) : (
        <NotificationEmptyState />
      )}
    </View>
  );
};

export default NotificationBayScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    backgroundColor: Pallete.whiteBackground,
  },
  sectionHeader: {
    fontSize: 18,
    backgroundColor: Pallete.whiteBackground,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    textTransform: 'capitalize',
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: '#555',
  },
});
