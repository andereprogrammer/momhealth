import {apiEndPointList} from '../constants';
import {api} from './useAuth';
export const getActivityTags = (): Promise<any> => {
  return api.get(apiEndPointList.GET_ACTIVITY_TAGS);
};
