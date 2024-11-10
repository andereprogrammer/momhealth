import {ReactNode} from 'react';
import {ImageProps, ViewToken, Animated} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export type CardsPropsSession = {
  heroText: string;
  secondaryText: string;
  imageValue: ImageProps['source'];
};

export type Listslides = {
  slidesList: ArrayLike<CardsPropsSession>;
};
export type SessionObject = {
  onConfrimProp?: (show: boolean, id: string) => void;
  sessionState?: string;
  sessionName: string;
  sessionStatus: string;
  sessionCarePerson: string;
  sessionCarePersonImage: string;
  sessionCarePersonMetadata: ServiceProviderMetadata;
  sessionCarePersonId: string;
  sessionTime: string;
  sessionType: string;
  sessionTimeCount?: string;
  sessionCta?: ReactNode;
  sessionCategory: string;
  sessionImage: string;
  _id: string;
  unique_key: string;
  description: string;
  prerequisites: string[];
  duration: string;
  status: string;
  showCta?: boolean;
  itemsViewed?: SharedValue<ViewToken[]>;
  isAnimated?: boolean;
  scrollX?: SharedValue<number>;
  index?: number;
  item?: SessionObject;
  cancellation_allowed: boolean;
  notes: any;
};

interface ServiceProviderMetadata {
  qualifications: string;
  designation: string;
  experience: string;
}

interface Activity {
  id: string;
  title: string | null | undefined;
  description: string | null | undefined;
  content_link: string | null | undefined;
  content_type: string | null | undefined;
  image_link: string | null | undefined;
  creator: string;
  created_by: string;
  tags: string[];
  categories: any;
  requirements: any;
  created: string;
  assigned_on: string;
}

export type AssignedActivity = {
  id: string;
  activity: Activity;
  patient_id: string;
  assignor_type: string;
  assigned_by: string;
  assigned_on: Date;
  status: string;
  itemsViewed?: SharedValue<ViewToken[]>;
  isAnimated?: boolean;
  scrollX?: SharedValue<number>;
  index: number;
  assignee: any;
};

export type TipOfTheDayItem = {
  created: string;
  updated: string;
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
};
