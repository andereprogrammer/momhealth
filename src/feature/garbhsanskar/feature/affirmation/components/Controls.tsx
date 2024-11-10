import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import Playlist from './PlayList';
import PlayIcon from './PlayIcon';
import { fonts } from '../../../../../theme/enum';
import { ControlsProps, MusicList } from '../interfaces';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';
import PauseIcon from './PauseIcon';

const Controls = ({
    openModal,
    currentTrack,
    setActiveMusic,
    activeTrack,
    pleasantMusicList,
    loading,
}: ControlsProps) => {
    const onIconPress = useCallback(async () => {
        if ((activeTrack !== null) && (activeTrack !== '')) {
            await TrackPlayer.stop();
            setActiveMusic('');
        }
        else {
            await TrackPlayer.play()
            const track = await TrackPlayer.getActiveTrack()
            console.log('Track',track)
            if (track && Object.keys(track).length) setActiveMusic(pleasantMusicList.find((item)=>item.url === track.url) as MusicList)
        }
    }, [activeTrack])

    if(loading) return (
        <View style={styles.container}>
            <View style={styles.playListContainer}>
               <Shimmer width={24} height={24}/>
            </View>
            <Shimmer width={100} height={14}/>
            <View>
            <Shimmer width={13} height={15}/>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.playListContainer}>
                <Playlist onOpenList={openModal} />
            </View>
            <Text style={styles.trackNameText}>{currentTrack}</Text>
            <TouchableOpacity onPress={onIconPress}>
                {activeTrack === null || activeTrack === '' ? <PlayIcon /> : <PauseIcon/>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    playListContainer: {
        left: 0,
    },
    trackNameText: {
        fontFamily: fonts.SecondaryDMSansBold,
        fontSize: 16,
        color: '#fff'
    }
});

export default Controls;