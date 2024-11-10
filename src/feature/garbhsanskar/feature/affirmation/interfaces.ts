import { ImageSourcePropType } from "react-native";
export interface MusicList {
    id: string;
    duration: number;
    image: ImageSourcePropType;
    title: string;
    url: string;
    trackId: number;
    artist: string;
    week: number;
    cardIndex: number;
};

export interface CardProps {
    item: any;
}

export interface CardContainerProps {
    currentWeekData: any[];
    week: number;
    setWeek: (week:number) => void;
    length: number;
    setCardIndex: (week:number) => void;
    cardIndex: number;
    pleasantMusicList: MusicList[];
    loading: boolean;
}

export interface ControlsProps {
    openModal: () => void;
    currentTrack: string;
    activeTrack: MusicList | null | string;
    setActiveMusic: (arg: MusicList | null | string) => void;
    pleasantMusicList: MusicList[];
    loading: boolean;
}

export interface WeekProps {
    week: number;
    onPrevious: () => void;
    loading: boolean;
}

export interface TrackList {
    modal: boolean;
    setModal: (modal:boolean) => void;
    pleasantMusicList: MusicList[];
    activeTrack: MusicList | string | null;
    setActiveTrack: (track: MusicList | string | null) => void;
    setCurrentTrack: (track: MusicList | string | null) => void;
}