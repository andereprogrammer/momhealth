import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { CounterCard } from '../../feature/freemium/components/CounterCard';
import { fonts, Pallete } from '../../theme/enum';
import MainCtaComponent from '../ButtonComponents/MainCtaComponent/MainCtaComponent';
import { horizontalScale } from '../../helpers/layoutHelper';

type HostDetailsProps = {
    hostName: string;
    hostDesignation: string;
}
type EventTimingProps = {
    date: string;
    startTime: string;
}

type SessionProps = { endTime: string, recordedMeetingUrl?: string } & EventTimingProps;

export type EventProps = { banner: boolean, title: string } & HostDetailsProps & EventTimingProps & SessionProps;

const Counter = ({ date, startTime }: EventTimingProps) => {
    const getDifference = useCallback((arg: string) => {
        return {
            days: moment(new Date(arg)).diff(moment(new Date()), 'days'),
            hours: moment(new Date(arg)).diff(moment(new Date()), 'hours'),
            mins: moment(new Date(arg)).diff(moment(new Date()), 'minutes')
        }
    }, [`${date} ${startTime}`])
    const { days, hours, mins } = getDifference(`${date} ${startTime}`);

    if (days < 0 || hours < 0 || mins < 0)
        return <View style={{ height: 24 }} />

    return (
        <View style={styles.counterContainer}>
            <CounterCard textColor={Pallete.whiteBackground}
                title={'days'}
                content={days} />
            {/* <Text style={styles.separator}>:</Text> */}
            <CounterCard textColor={Pallete.whiteBackground}
                title={'hours'}
                content={hours % 24} />
            {/* <Text style={styles.separator}>:</Text> */}
            <CounterCard textColor={Pallete.whiteBackground}
                title={'mins'}
                content={mins % 60} />
        </View>
    );
}

const EventTime = ({ date, startTime }: EventTimingProps) => {
    const getDate = useCallback((arg: string) => {
        const dateObj = new Date(arg);
        const momentObj = moment(dateObj);
        return {
            date: momentObj.format('dddd DD MMMM'),
            time: momentObj.format('hh:mm A')
        };
    }, [`${date} ${startTime}`])
    const { date: eventDate, time: eventTime } = getDate(`${date} ${startTime}`);

    return (
        <View style={styles.eventContainer}>
            <Text style={styles.eventText}>Date : {eventDate} </Text>
            <Text style={styles.eventText}>Timing: {eventTime}</Text>
        </View>
    );
}

const EventTimings = ({ date, startTime }: EventTimingProps) => {
    return (
        <View>
            <EventTime date={date} startTime={startTime} />
            <Counter date={date} startTime={startTime} />
        </View>
    );
}

const HostDetails = ({ hostName, hostDesignation }: HostDetailsProps) => {
    return (
        <View>
            <Text style={styles.nameText}>{hostName}</Text>
            <Text style={styles.designationText}>{hostDesignation}</Text>
        </View>
    );
}

const SessionStatus = ({ date, startTime, endTime, recordedMeetingUrl }: SessionProps) => {
    const isSessionActive = useCallback((start: string, end: string) => {
        const startDiff = moment(new Date(start)).diff(moment(new Date()), 'minutes')
        const endDiff = moment(new Date(end)).diff(moment(new Date()), 'minutes')
        if (startDiff <= 10 && endDiff > 0)
            return true;
        return false;
    }, [`${date} ${startTime}`, `${date} ${endTime}`])

    const openZoom = useCallback((url: string | null) => {
        if(typeof url === 'string') Linking.openURL(url)
    }, [recordedMeetingUrl])

    const sessionActive = isSessionActive(`${date} ${startTime}`, `${date} ${endTime}`);
    if (sessionActive)
        return (
            <MainCtaComponent
                  onClick={() => openZoom(recordedMeetingUrl as string)}
                  active={true}
                  style={{
                    marginHorizontal: horizontalScale(0),
                    borderRadius: horizontalScale(20),
                    height:30,
                    width:'80%',
                  }}>
                  <Text>
                    Join Now
                  </Text>
                </MainCtaComponent>
        );
    return null;
}

export const EventDetails = ({ banner, ...eventProps }: EventProps) => {
    const insets = useSafeAreaInsets();
    const {title,endTime,startTime,hostName,hostDesignation,date,recordedMeetingUrl} =  {...eventProps};
    return (
        <View style={[styles.container, { paddingTop: banner ? styles.container.paddingTop : insets.top + 36 }]}>
            <Text style={styles.headingText}>{title}</Text>
            <View style={styles.detailsContainer}>
                <HostDetails hostName={hostName} hostDesignation={hostDesignation} />
                <EventTimings date={date} startTime={startTime} />
                <View style={{marginTop: 12}}>
                <SessionStatus date={date} startTime={startTime} endTime={endTime} recordedMeetingUrl={recordedMeetingUrl}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: { marginHorizontal: 2, textAlignVertical: 'center', fontFamily: fonts.PrimaryJakartaExtraBold, color: 'white', fontSize: 18 },
    counterContainer: { marginTop: 12, flexDirection: 'row' },
    eventText: { fontFamily: fonts.SecondaryDMSansMedium, color: '#4A0180', fontSize: 12 },
    eventContainer: { marginTop: 12 },
    nameText: { fontFamily: fonts.PrimaryJakartaExtraBold, color: '#7232DA', fontSize: 14 },
    designationText: {
        fontFamily: fonts.PrimaryJakartaExtraBold, color: '#4A0180', fontSize: 12, marginTop: 8,
    },
    container: { width: '55%', maxWidth: '55%', paddingTop: 8, paddingLeft: 12, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
    headingText: { fontFamily: fonts.PrimaryJakartaExtraBold, color: Pallete.ScarletGum, fontSize: 16 },
    detailsContainer: { flex: 1, justifyContent: 'space-between', marginTop: 8, paddingBottom: 8 },
})

export default EventDetails;