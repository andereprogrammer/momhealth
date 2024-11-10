import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ImageStyle, ViewStyle } from 'react-native';
import { MasterclassStaticBanner, NavigateForward } from '../../assets';
import { fonts } from '../../theme/enum';
import EventDetails, { EventProps } from './EventDetails';
import ImageContainer, { ImageProps } from './ImageContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Shimmer from '../SkeletonComponent/Shimmer';

type Props = {
    id?: string;
    loading: boolean;
    showHeader?: boolean;
    banner?: boolean;
    extraStyles?: ViewStyle;
    extraImageStyles?: ImageStyle;
    backgroundImage: any;
    children: any;
    bannerImageUrl: string;
    hostCredentials: string[];
    recordedMeetingUrl: string | null;
    videoDuration: string | null;
    staticBanner?: boolean;
} & EventProps & ImageProps;

export type NavEventProps = {
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    hostDesignation: string;
    hostName: string;
    recordedMeetingUrl?: string | null;
    staticBanner: boolean;
}

export type NavProps = {
    eventDetails:NavEventProps,
    hostCredentials: string[];
    bannerImageUrl: string;
    hostImageUrl: string;
    banner: boolean;
}

const { width } = Dimensions.get('window');
const MasterclassBanner: React.FC<Props> = ({
    hostName,
    showHeader = true,
    banner = true,
    extraStyles,
    extraImageStyles,
    title,
    hostDesignation,
    date,
    startTime,
    endTime,
    bannerImageUrl,
    hostImageUrl,
    hostCredentials,
    staticBanner,
    recordedMeetingUrl
}: Props) => {
    const navigation = useNavigation<NavigationProp<any,any>>()
    const navigateToMasterclass = (navProps: NavProps) => {
        navigation.navigate('MasterclassScreen',navProps)
    }
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {showHeader && <View style={styles.header}>
                <Text style={styles.heading}>Pregnancy Masterclass Series</Text>
                <TouchableOpacity onPress={() => navigateToMasterclass({eventDetails:{hostName,title,hostDesignation,date,startTime,endTime,recordedMeetingUrl}, banner, hostCredentials,bannerImageUrl,hostImageUrl})} style={styles.navigationContainer}>
                    <Image source={NavigateForward} style={styles.forwardImage} />
                </TouchableOpacity>
            </View>}
            <TouchableOpacity 
            onPress={() => navigateToMasterclass({
                eventDetails:{
                    hostName,
                    title,
                    hostDesignation,
                    date,
                    startTime,
                    endTime}, 
                    banner, 
                    hostCredentials,
                    bannerImageUrl,
                    hostImageUrl,
                    staticBanner,
                })} 
            style={[styles.bannerContainer, extraStyles]}>
                {!staticBanner && <ImageBackground onLoad={()=>setLoaded(true)} defaultSource={undefined} source={{uri: bannerImageUrl}} style={styles.imageBackgroundStyle} imageStyle={styles.imageBackgroundContainerStyle}>
                {!loaded ? <Shimmer width={'100%'} height={200}/> : null}
                    {loaded ? <>
                    <EventDetails hostName={hostName} banner={banner} title={title} hostDesignation={hostDesignation} date={date} startTime={startTime} endTime={endTime} recordedMeetingUrl={recordedMeetingUrl}/>
                    <ImageContainer resizeMode='stretch' defaultSource={undefined} extraImageStyles={extraImageStyles as ImageStyle} banner={banner} hostImageUrl={hostImageUrl}/>
                    </>: null}
                </ImageBackground>}
                {staticBanner && <ImageBackground imageStyle={{borderRadius:12}} source={MasterclassStaticBanner} style={{aspectRatio:2}}/>}
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    heading: {
        fontFamily: fonts.PrimaryJakartaExtraBold,
        fontSize: 18,
        color: '#0E0F11'
    },
    navigationContainer: {
        backgroundColor: '#F1EBFB',
        width: 12, height: 12,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    forwardImage: {
        width: 16,
        height: 16
    },
    bannerContainer: {
        width: width - 32,
        minHeight: (width - 32) / 2,
        borderRadius: 8
    },
    imageBackgroundStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    imageBackgroundContainerStyle: { borderRadius: 24 },
})

export default MasterclassBanner;