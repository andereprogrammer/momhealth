import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  stage: string;
  city: string;
  blood_group: string;
  doctor: string | null;
  profile_image: string | null;
  status: string;
};

type ServiceProvider = {};

type CareTeam = {
  service_providers: ServiceProvider[];
};

type PregnancyStage = {
  trimester: number;
  pregnancy_days: number;
  desc: string;
  avg_weight: number;
  avg_height: number;
  lmp: string;
  edd: string;
  type_of_pregnancy: string | null;
};

type PatientPackage = {
  patient_package_id: string;
  patient_id: string;
  program_name: string;
  package_status: string;
  package_type: string;
  program_id: string;
  tenure: number;
  package_expiry: string;
  package_id: string;
  amount: number;
};

type ToDo = {
  created: string;
  updated: string;
  id: string;
  type: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_by_id: string;
  created_by_type: string;
};

type ActivityTagValue = {
  value: string;
  id: number;
};

type ActivityTag = {
  type: string;
  id: number;
  values: ActivityTagValue[];
  mandatory: boolean;
};

type Activity = {
  id: string;
  title: string;
  description: string;
  content_link: string;
  content_type: string;
  image_link: string;
  creator: string;
  duration_in_minutes: number;
  created_by: string;
  created: string;
  tags: ActivityTag[];
  categories: string[];
  requirements: string | null;
};

type ActivityAssignment = {
  id: string;
  activity: Activity;
  patient_id: string;
  assignee: string | null;
  status: string;
  assigned_on: string;
};

type BabyDetails = {
  weight_in_grams: string;
  height_in_cms: string;
  fruit: string;
  fruit_image_link: string;
};

type Video = {
  title: string;
  video_link: string;
  thumbnail_link: string;
  description: string;
};

type FetalGrowthData = {
  title: string;
  thumbnail_link: string;
  description: string;
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

type PogWeekData = {
  baby_details: BabyDetails;
  yoga_videos: Video[];
  fetal_growth_data: FetalGrowthData;
  render_model_link: string;
  preview_video_link: string;
  full_screen_video_link: string;
  pog_videos: Video[];
  things_to_dos: ThingToDo[];
  body_changes: BodyChange[];
  common_issues: CommonIssue[];
  red_flags: string[];
};

type PogWeekDetail = {
  created: string;
  updated: string;
  id: number;
  week: number;
  week_data: PogWeekData;
  latest_version: number;
};

export type RootObject = {
  data: {
    patient: Patient;
    care_team: CareTeam;
    pregnancy_stage: PregnancyStage;
    articles: string | null;
    patient_packages: PatientPackage[];
    patient_reports: string[];
    to_dos: ToDo[];
    activities: ActivityAssignment[];
    pog_week_detail: PogWeekDetail;
  };
};

export const useFreemiumDataStore = create<DataStore>()(
  immer((set, get) => ({
    masterData: null,
    masterDataLoading: false,
    error: false,
    fetched: false,
    fetchMasterData: async () => {
      if (get().fetched) return; // Prevent fetching if already fetched

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

        set({
          error: false,
          fetched: true,
        });
      } catch (error) {
        set({error: true});
      }
    },
  })),
);
