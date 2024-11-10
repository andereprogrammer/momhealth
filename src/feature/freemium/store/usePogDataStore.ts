// store.ts
import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkVersionPog,
  getAllPogWeekData,
  getHomeScreenInfo,
} from '../../../api/homeapis';
import {RootObject} from './useFreemiumDataStore';

type YogaVideo = {
  title: string;
  video_link: string;
  thumbnail_link: string;
  description: string;
};

type PogVideo = {
  title: string;
  video_link: string;
  thumbnail_link: string;
  description: string;
  duration_in_minutes: number;
};

type ThingToDo = {
  title: string;
  image_link: string;
  description_in_markdown: string;
};

type BodyChange = {
  title: string;
  description: string;
  image_link: string;
};

type Issue = {
  title: string;
  description: string;
  image_link: string;
};

type CommonIssue = {
  title: string;
  issues: Issue[];
};

type WeekData = {
  baby_details: {
    weight_in_grams: string;
    height_in_cms: string;
    fruit: string;
    fruit_image_link: string;
  };
  yoga_videos: YogaVideo[];
  fetal_growth_data: {
    title: string;
    thumbnail_link: string;
    description: string;
  };
  render_model_link: string;
  preview_video_link: string;
  full_screen_video_link: string;
  pog_videos: PogVideo[];
  things_to_dos: ThingToDo[];
  body_changes: BodyChange[];
  common_issues: CommonIssue[];
  red_flags: any[];
};

export type PregnancyWeek = {
  created: string;
  updated: string;
  id: number;
  week: number;
  week_data: WeekData;
  latest_version: number;
};

interface PogState {
  pogWeek: PregnancyWeek[];
  weekSelected: number;
  pog_days: number;
  currentWeekData: PregnancyWeek | null;
  loading: boolean;
  setWeekSelected: (week: number) => void;
  fetchCachedData: () => void;
  fetchWeekInfo: () => void;
  setWeekOfPregnancy: (week: number) => void;
  checkAndUpdateWeekData: () => void;
  currentWeek: number;
  refreshData: () => Promise<any>;
}

type PogPersist = (
  config: (set: any, get: any, api: any) => PogState,
  options: PersistOptions<PogState>,
) => (set: any, get: any, api: any) => PogState;

const usePogStore = create<PogState>(
  (persist as PogPersist)(
    (set, get) => ({
      pogWeek: [],
      weekSelected: 0,
      pog_days: 0,
      currentWeekData: null,
      currentWeek: 0,
      loading: false,
      setWeekSelected: (week: number) => {
        set({weekSelected: week});
        const pogWeek = get().pogWeek;
        const currentWeekDetails = pogWeek.filter(
          (x: PregnancyWeek) => x.week === week,
        );
        set({currentWeekData: currentWeekDetails[0]});
      },
      setWeekOfPregnancy: (week: number) => {
        set({weekOfPregnancy: week});
      },
      fetchWeekInfo: async () => {
        set({loading: true});
        try {
          const res: RootObject = await getHomeScreenInfo();
          if (res.data.pog_week_detail !== null) {
            console.log('from the store', res.data.pog_week_detail.week);
            console.log(
              'from the store',
              res.data.pregnancy_stage.pregnancy_days,
            );
            const days = res.data.pregnancy_stage.pregnancy_days;
            const week = res.data.pog_week_detail.week;

            if (week <= 5) {
              set({
                weekSelected: 5,
                loading: false,
                currentWeek: 5,
                pog_days: days,
              });
              get().setWeekSelected(week);
              set({loading: false});
            } else {
              set({
                weekSelected: week,
                loading: false,
                currentWeek: week,
                pog_days: days,
              });
              get().setWeekSelected(week);
              set({loading: false});
            }
          } else {
            set({
              weekSelected: 5,
              loading: false,
              currentWeek: 5,
              pog_days: 35,
            });
            get().setWeekSelected(5);
            set({loading: false});
          }
        } catch (error) {
          console.log('loaded time', error);
          set({loading: false});
        }
      },
      fetchCachedData: async () => {
        if (get().pogWeek.length > 0) return;
        set({loading: true});
        try {
          const getVersionFromLocalStorage = async () => {
            const jsonString = await AsyncStorage.getItem('pog_data_version');
            if (jsonString !== null) {
              return JSON.parse(jsonString);
            }
            console.log('No version found');
          };

          const getData = async () => {
            const jsonString = await AsyncStorage.getItem('week_all_details');
            if (jsonString !== null) {
              return JSON.parse(jsonString);
            }
            console.log('No data found');
          };

          const checkStoredVersion = async () => {
            try {
              const stored_version = await getVersionFromLocalStorage();
              console.log('stored_version1', stored_version);
              const versionApiRes = await checkVersionPog(stored_version);
              console.log('versionApiRes.data1', versionApiRes.data);
              return versionApiRes.data.needs_update;
            } catch (error) {
              console.log('pogversionError', error);
            }
          };

          const storeData = async (value: any, name: string) => {
            try {
              console.log('storing values', value);
              const jsonValue = JSON.stringify(value);
              await AsyncStorage.setItem(name, jsonValue);
            } catch (e) {
              console.error('Error saving value to AsyncStorage', e);
            }
          };

          const fetchPogData = async () => {
            set({loading: true});
            try {
              const res = await getAllPogWeekData();
              set({pogWeek: res.data.week_details});
              await storeData(res.data.week_details, 'week_all_details');
              await storeData(res.data.latest_version, 'pog_data_version');
              set({loading: false});
            } catch (e) {
              console.log(e);
              set({loading: false});
            }
          };

          const stored_week_data = await getData();
          let needs_update = await checkStoredVersion();
          if (stored_week_data && !needs_update) {
            console.log('The pog data was fetched from cache');
            set({pogWeek: stored_week_data, loading: false});
          } else {
            console.log('The pog data needed an update making the api call');
            await fetchPogData();
          }
        } catch (error) {
          console.log(error);
          set({loading: false});
        }
      },
      checkAndUpdateWeekData: async () => {
        const getVersionFromLocalStorage = async () => {
          const jsonString = await AsyncStorage.getItem('pog_data_version');
          if (jsonString !== null) {
            return JSON.parse(jsonString);
          }
        };

        const checkStoredVersion = async () => {
          try {
            const stored_version = await getVersionFromLocalStorage();
            const versionApiRes = await checkVersionPog(stored_version);
            return versionApiRes.data.needs_update;
          } catch (error) {
            console.error(error);
          }
        };

        const fetchPogData = async () => {
          try {
            const res = await getAllPogWeekData();
            set({pogWeek: res.data.week_details});
            set({loading: false});

            await AsyncStorage.setItem(
              'week_all_details',
              JSON.stringify(res.data.week_details),
            );
            await AsyncStorage.setItem(
              'pog_data_version',
              JSON.stringify(res.data.latest_version),
            );
          } catch (e) {
            console.error(e);
            set({loading: false});
          }
        };

        const needs_update = await checkStoredVersion();
        if (needs_update) {
          set({loading: true});
          await fetchPogData();
        }
      },
      refreshData: async () => {
        set({loading: true});
        try {
          const res = await getHomeScreenInfo();
          if (res.data) {
            const week = res.data.pog_week_detail.week;
            set({
              weekSelected: week,
              loading: false,
              currentWeek: week,
            });
            get().setCurrentWeekData(week);
          }
        } catch (error) {
          set({loading: false});
        }
      },
    }),
    {
      name: 'pog-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default usePogStore;
