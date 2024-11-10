import React, { useCallback, useEffect, useState } from 'react';
import Shimmer from '../../../../components/SkeletonComponent/Shimmer';
import { ImageBackground, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { fonts, Pallete } from '../../../../theme/enum';
import moment from 'moment';
import Svg, { Path } from "react-native-svg";
import { NavigationProp, useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window')

export type PreviousSessionItem = {
    title: string; 
    date: string, 
    host_designation: string, 
    host_name: string, 
    banner_image_url: string, 
    host_image_url: string, 
    recorded_meeting_url: string, 
    video_duration: string,
}

const UploadButton = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M4.875 15c-1.138 0-2.11-.394-2.916-1.181C1.153 13.03.75 12.069.75 10.93c0-.975.294-1.843.881-2.606a3.898 3.898 0 0 1 2.306-1.462 5.09 5.09 0 0 1 1.876-2.794C6.75 3.356 7.813 3 9 3c1.463 0 2.703.51 3.722 1.528 1.019 1.019 1.528 2.26 1.528 3.722.863.1 1.578.472 2.147 1.116.569.643.853 1.396.853 2.259 0 .938-.328 1.734-.984 2.39-.657.657-1.453.985-2.391.985H9.75c-.412 0-.766-.147-1.06-.44a1.445 1.445 0 0 1-.44-1.06V9.637L7.05 10.8 6 9.75l3-3 3 3-1.05 1.05-1.2-1.163V13.5h4.125a1.81 1.81 0 0 0 1.331-.544 1.81 1.81 0 0 0 .544-1.331 1.81 1.81 0 0 0-.544-1.331 1.81 1.81 0 0 0-1.331-.544H12.75v-1.5a3.614 3.614 0 0 0-1.097-2.653A3.614 3.614 0 0 0 9 4.5a3.614 3.614 0 0 0-2.653 1.097A3.614 3.614 0 0 0 5.25 8.25h-.375a2.53 2.53 0 0 0-1.856.769 2.53 2.53 0 0 0-.769 1.856c0 .725.256 1.344.769 1.856a2.53 2.53 0 0 0 1.856.769H6.75V15H4.875Z"
    />
  </Svg>
)


const PlayButton = (props: any) => {
    const { url } = props;
    const navigation =  useNavigation<NavigationProp<any,any>>()
    const onPlayPress = useCallback(() => {
        navigation.navigate('VideoScreen', {url})
    },[url])
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill="none"
            onPress={onPlayPress}
            {...props}
        >
            <Path
                fill="#000"
                d="M15.836 7.001a2.093 2.093 0 0 1 0 3.696l-8.944 4.864c-1.44.784-3.21-.235-3.21-1.847V3.985c0-1.613 1.77-2.631 3.21-1.849l8.944 4.865Z"
            />
        </Svg>
    );
}

const PreviousEventDetails = ({ title, date }: any) => {
    const getDate = useCallback((arg: string) => {
        const dateObj = new Date(arg);
        const momentObj = moment(dateObj);
        return {
            date: momentObj.format('dddd DD MMMM'),
        };
    },[date])
    const { date: eventDate } = getDate(`${date}`);
    return (
        <View>
            <Text style={styles.primaryText}>{title}</Text>
            <Text style={styles.dateText}>Date : {eventDate} </Text>
        </View>
    );
}


const PreviousMasterclass = ({ item }: {item: PreviousSessionItem}) => {
    const { 
        title, 
        date, 
        host_designation, 
        host_name, 
        banner_image_url, 
        host_image_url, 
        recorded_meeting_url, 
        video_duration 
    } = item;
    const [loaded, setLoaded] = useState(false);
    return (
        <ImageBackground 
        defaultSource={undefined} 
        onLoad={()=>setLoaded(true)} 
        source={{ uri: banner_image_url }} 
        style={[styles.previousMasterclassContainer]} 
        imageStyle={styles.previousWebinarContainer}>
            {!loaded ? <Shimmer width={'100%'} height={200}/> : null}
            {loaded ? <View style={styles.hostDetailsContainer}>
                <PreviousEventDetails title={title} date={date} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.hostName}>{host_name}</Text>
                    <Text style={styles.hostDesignation}>{host_designation}</Text>
                </View>
                <View style={styles.playContainer}>
                    {typeof recorded_meeting_url === 'string' && recorded_meeting_url.length ? <PlayButton url={recorded_meeting_url} /> : <UploadButton/>}
                </View>
            </View> : null}
            {loaded ? <View style={styles.imageContainer}>
                <Image 
                defaultSource={undefined} 
                source={{ uri: host_image_url }} 
                style={styles.imageStyle} 
                resizeMode='stretch' />
                {video_duration !== null && <View style={styles.durationContainer}>
                    <Text style={styles.durationText}>{video_duration}</Text>
                </View>}
            </View> : null}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
    },
    headingText: {
        marginLeft: 16,
        color: Pallete.whiteBackground,
        fontFamily: fonts.PrimaryJakartaMedium,
        fontSize: 16,
    },
    body: {
        flex: 1,
        backgroundColor: Pallete.whiteBackground,
    },
    imageContainer: { width: '45%', borderTopRightRadius: 8, borderBottomRightRadius: 8 },
    imageStyle: { height: '100%', width: '95%', position: 'absolute', bottom:0, right: 0 },
    container: { flex: 1, backgroundColor: Pallete.whiteBackground },
    scrollContainer: { height: '90%', backgroundColor: Pallete.whiteBackground },
    backgroundContainer: { flex: 1 },
    bannerExtraStyles: { width, minHeight: width / 2 },
    bannerImageExtraStyles: { top: 0, height: '100%' },
    imageBackground: { width, paddingVertical: 16, paddingHorizontal: 20 },
    separator: { height: 12 },
    footerContainer: { paddingHorizontal: 20, paddingBottom: 24, backgroundColor:Pallete.whiteBackground },
    footerHeading: { marginBottom: 16, fontFamily: fonts.SecondaryDMSansBold, fontSize: 25, color: Pallete.black },
    previousMasterclassContainer: { width: '100%', flexDirection: 'row' },
    hostDetailsContainer: { maxWidth: '55%', width: '60%', paddingTop: 12, paddingLeft: 12, paddingBottom: 4 },
    primaryText: { fontFamily: fonts.SecondaryDMSansBold, fontSize: 16, color: Pallete.ScarletGum, marginBottom: 4 },
    dateText: { fontFamily: fonts.SecondaryDMSansMedium, fontSize: 14, color: '#4A0180' },
    detailsContainer: { marginTop: 12, marginBottom: 28, height:96 },
    hostName: { fontFamily: fonts.SecondaryDMSansMedium, fontSize: 16, color: '#7232DA', marginBottom: 4 },
    hostDesignation: { fontFamily: fonts.SecondaryDMSansMedium, fontSize: 14, color: '#4A0180' },
    playContainer: { width: 25, height: 25, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: Pallete.whiteBackground, position: 'absolute', bottom: 8, left: 8 },
    durationContainer: { position: 'absolute', right: 8, bottom: 8, borderRadius: 28, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(0, 0, 0, 0.30)' },
    durationText: { fontFamily: fonts.PrimaryJakartaBold, color: Pallete.whiteBackground, fontSize: 14 },
    bannerContainer: { width: width - 32, minHeight: (width - 32) / 2, borderRadius: 8 },
    imageBackgroundStyle: { flex: 1, flexDirection: 'row' },
    insetsContainer: { position: 'absolute', zIndex: 200 },
    previousWebinarContainer: { borderRadius: 12 }
})

export default PreviousMasterclass;