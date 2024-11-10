import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface ListItem {
  title: string;
  default_locked: boolean;
  video_link: string;
  image_link: string;
  category: string;
  type: string;
  trimester: string[];
}

interface SectionConfig {
  heading: {
    type: string;
    props: {
      text: string;
    };
  };
  list: {
    type: string;
    props: {
      subHeading: string;
      data: ListItem[];
    };
  }[];
}

interface MasterData {
  components: SectionConfig[];
}

interface DataStore {
  masterData: MasterData[] | null;
  loading: boolean;
  error: boolean;
  fetched: boolean;
  fetchMasterData: () => Promise<void>;
  setWeekOfPregnancy: (week: number) => void;
  weekOfPregnancy: number;
}

export const useDataStore = create<DataStore>()(
  immer((set, get) => ({
    masterData: null,
    loading: false,
    error: false,
    fetched: false,
    weekOfPregnancy: 10, // Default week, adjust as needed
    fetchMasterData: async () => {
      if (get().fetched) return; // Prevent fetching if already fetched
      set({loading: true});
      try {
        const response = await fetch(
          'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/insights/insights.json',
          {
            headers: {
              'Cache-Control': 'no-cache',
            },
          },
        );
        const data = await response.json();
        const trimester = getTrimester(get().weekOfPregnancy);
        const filteredData = filterActivitiesByTrimester(data, trimester);
        set({
          masterData: filteredData,
          loading: false,
          error: false,
          fetched: true,
        });
      } catch (error) {
        set({error: true, loading: false});
      }
    },
    setWeekOfPregnancy: week => set({weekOfPregnancy: week}),
  })),
);

const getTrimester = (week: number): string => {
  if (week >= 1 && week <= 13) return 'T1';
  if (week >= 14 && week <= 26) return 'T2';
  if (week >= 27 && week <= 40) return 'T3';
  return 'Invalid week';
};

const filterActivitiesByTrimester = (data: MasterData[], trimester: string) => {
  return data.map(section => ({
    ...section,
    list: section.list.map(carousel => ({
      ...carousel,
      props: {
        ...carousel.props,
        data: carousel.props.data.filter(activity =>
          activity.trimester.includes(trimester),
        ),
      },
    })),
  }));
};
