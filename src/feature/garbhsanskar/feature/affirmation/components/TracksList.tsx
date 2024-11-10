import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import lodash from 'lodash';
import { DefaultModal } from '../../../../videoStreaming/components';
import Playlist from './PlayList';
import PlayIcon from './PlayIcon';
import PauseIcon from './PauseIcon';
import { fonts, Pallete } from '../../../../../theme/enum';
import { verticalScale } from '../../../../../helpers/layoutHelper';
import { MusicList, TrackList } from '../interfaces';

const ModalTopView = () => {
    return (
        <View style={styles.topView}>
        <Playlist />
        <View style={styles.headingContainer}>
            <Text style={styles.textHeading}>Pleasant Music</Text>
        </View>
    </View>
    );
}

const ModalItems = ({ pleasantMusicList, activeTrack, onIconPress }: any) => {
    return (
        <ScrollView>
            {lodash.uniqBy(pleasantMusicList, 'trackId').map((item:MusicList,index:number) => {
                const Icon = activeTrack?.id === item.id ? PauseIcon : PlayIcon;
                return (
                    <View style={styles.itemContainer}>
                        <Image source={item.image} style={styles.iconStyle} />
                        <Text style={styles.itemText}>{item.title}</Text>
                        <TouchableOpacity onPress={()=>onIconPress(item?.id,index,item)}>
                            <Icon />
                        </TouchableOpacity>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const onIconPress = async (
    trackId:string,
    itemId:number,
    index:number,
    pleasantMusicList:MusicList[],
    setActiveTrack: (track: MusicList | string | null)=>void,
    setCurrentTrack: (track: MusicList | string | null)=>void
) => {
    if (trackId === `${itemId}`) {
        await TrackPlayer.pause()
        setActiveTrack('');
    }
    else {
        await TrackPlayer.stop();
        await TrackPlayer.skip(index)
        await TrackPlayer.play();
        const active = await TrackPlayer.getActiveTrack();
        if(active) {
        setActiveTrack(pleasantMusicList.find((item)=>item.url === active?.url) as MusicList);
        setCurrentTrack((pleasantMusicList.find((item)=>item.url === active?.url) as MusicList).title)
        }
    }
}

const TracksList = ({
    modal,
    setModal,
    pleasantMusicList,
    activeTrack,
    setActiveTrack,
    setCurrentTrack,
}: TrackList) => {
    
    return (
    <DefaultModal modalVisible={modal} setModalVisible={setModal} viewStyle={styles.modalViewStyle}>
       <ModalTopView/>
        <ModalItems
            pleasantMusicList={pleasantMusicList}
            activeTrack={activeTrack}
            onIconPress={(id:number,index:number,item:any) => {
               
                onIconPress(
                activeTrack !== null ? (activeTrack as MusicList).id : item,
                id,
                index,
                pleasantMusicList,
                setActiveTrack,
                setCurrentTrack)}} />
    </DefaultModal>
    );
}

const styles = StyleSheet.create({
    modalViewStyle: {
        paddingLeft: 16,
        paddingRight: 20,
        maxHeight: '40%'
    },
    topView: {
        paddingVertical: 8,
        flexDirection: 'row',
        marginBottom: 12
    },
    headingContainer: {
        marginLeft: 16,
        paddingVertical: 4,
        justifyContent: 'center'
    },
    textHeading: {
        fontFamily: fonts.SecondaryDMSansBold,
        fontSize: 12,
        color: Pallete.whiteBackground,
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconStyle: {
        height: verticalScale(36),
        aspectRatio: 1
    },
    itemText: {
        fontFamily: fonts.SecondaryDMSansMedium,
        fontSize: 12,
        color: Pallete.whiteBackground,
    }
});

export default TracksList;