import moment from 'moment';
import {BASE_URL, apiEndPointList} from '../constants';
import {api} from './useAuth';
import {filterRender} from '../feature/activities/components/RenderFilterCard';
import {AttendeeStatus} from '../feature/session/constants/sessionDetails';

export const getAllSessionCategories = (): Promise<any> => {
  return api.get(apiEndPointList.GET_SESSION_CATEGORIES, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};

export const getAllSessionsForRangeUpcoming = (
  startDate: string,
  endDate: string,
): Promise<any> => {
  return api.get(
    apiEndPointList.GET_SESSIONS +
      `?startDate=${startDate}&endDate=${endDate}` +
      `&statuses=${AttendeeStatus.ASSIGNED},${AttendeeStatus.BOOKED},${AttendeeStatus.JOINED}`,
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllPastSessionsByCategoryWithDate = (
  categories: filterRender[],
  startDate: string,
  endDate: string,
): Promise<any> => {
  let today = new Date();
  let startDateFormatted = moment(startDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
  let endDateFormatted = moment(endDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
  let values: any = [];
  categories.map(category => {
    if (category.selected) {
      values.push(category.value);
    }
  });
  let valueString = values.join(',');
  console.log('Searching based on ', startDateFormatted, endDateFormatted);
  return api.get(
    apiEndPointList.GET_SESSIONS +
      `?startDate=${startDateFormatted}&endDate=${endDateFormatted}` +
      `&categories=${valueString}&statuses=${AttendeeStatus.SKIPPED},${AttendeeStatus.CANCELLED},${AttendeeStatus.COMPLETED},${AttendeeStatus.BOOKED}&sessionStatuses=COMPLETED,CANCELLED&sort=session.sessionStartTime,desc`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};
export const getAllUpcomingSessionsByCategoryWithDate = (
  categories: filterRender[],
  startDate: string,
  endDate: string,
): Promise<any> => {
  let today = new Date();
  let formated = moment(today).format('DD-MM-YYYY');
  let values: any = [];
  categories.map(category => {
    if (category.selected) {
      values.push(category.value);
    }
  });
  let valueString = values.join(',');
  return api.get(
    apiEndPointList.GET_SESSIONS +
      `?startDate=${startDate}&endDate=${endDate}` +
      `&categories=${valueString}&statuses=${AttendeeStatus.BOOKED},${AttendeeStatus.JOINED}&sessionStatuses=CREATED,STARTED,RESCHEDULED&sort=session.sessionStartTime`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllUpcomingSessionsByCategoryWithStartDate = (
  categories: filterRender[],
  startDate: string,
): Promise<any> => {
  let today = new Date();
  let formated = moment(today).format('DD-MM-YYYY');
  let values: any = [];
  categories.map(category => {
    if (category.selected) {
      values.push(category.value);
    }
  });
  let valueString = values.join(',');
  return api.get(
    apiEndPointList.GET_SESSIONS +
      // `?startDate=${startDate}` +
      `?statuses=${AttendeeStatus.BOOKED},${AttendeeStatus.JOINED}&sessionStatuses=CREATED,STARTED,RESCHEDULED&sort=session.sessionStartTime`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllPastBookedSessions = (): Promise<any> => {
  let today = new Date();
  let formated = moment(today).format('DD-MM-YYYY');
  return api.get(
    apiEndPointList.GET_SESSIONS +
      `?endDate=${formated}&statuses=${AttendeeStatus.COMPLETED},${AttendeeStatus.CANCELLED},${AttendeeStatus.SKIPPED},${AttendeeStatus.BOOKED}&sessionStatuses=COMPLETED,CANCELLED&size=100&sort=session.sessionStartTime,desc`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllBookedSessions = (): Promise<any> => {
  return api.get(
    apiEndPointList.GET_SESSIONS +
      `?statuses=${AttendeeStatus.BOOKED},${AttendeeStatus.JOINED}`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllPersonalSessions = (): Promise<any> => {
  return api.get(
    apiEndPointList.GET_PERSONAL_SESSIONS + '?size=100',

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllGroupSessions = (): Promise<any> => {
  return api.get(
    apiEndPointList.GET_GROUP_SESSIONS + '?size=100',

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllPersonalSessionsByCategories = (
  categories: filterRender[],
): Promise<any> => {
  let values: any = [];
  categories.map(category => {
    console.log('category', category);
    if (category.selected) {
      values.push(category.value);
    }
  });
  let valueString = values.join(',');
  return api.get(
    apiEndPointList.GET_PERSONAL_SESSIONS +
      `?categories=${valueString}&size=100`,
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllGroupSessionsByCategories = (
  categories: filterRender[],
): Promise<any> => {
  let values: any = [];
  categories.map(category => {
    console.log('category', category);
    if (category.selected) {
      values.push(category.value);
    }
  });
  let valueString = values.join(',');
  return api.get(
    apiEndPointList.GET_GROUP_SESSIONS + `?categories=${valueString}&size=100`,
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getSessionAttributes = () => {
  return api.get(apiEndPointList.SERVICE_PROVIDER_SESSION_ATTR);
};

export const bookSession = (id: string): Promise<any> => {
  console.log('I am booking ', id, BASE_URL);
  return api.post(
    BASE_URL + `/api/v1/patient-app/patients/sessions/${id}/book`,
    {},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};
export const bookPersonalSessions = (
  id: string,
  time: string,
): Promise<any> => {
  return api.post(
    BASE_URL + `/api/v1/patient-app/patients/sessions/${id}/book`,
    {session_start_time: time},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const bookGroupSessions = (id: string, time: string): Promise<any> => {
  return api.post(
    BASE_URL + `/api/v1/patient-app/patients/sessions/group/${id}/book`,
    {session_start_time: time},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const reschedulePersonalSessions = (
  id: string,
  time: string,
): Promise<any> => {
  return api.post(
    BASE_URL + `/api/v1/patient-app/patients/sessions/${id}/reschedule`,
    {session_start_time: time},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const joinSession = (id: string): Promise<any> => {
  console.log('The token should be sent', id);
  return api.post(
    BASE_URL + `/api/v1/patient-app/patients/sessions/${id}/join`,
    {},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getAllSlots = (id: string): Promise<any> => {
  console.log(id);
  return api.get(
    `/api/v1/patient-app/patients/sessions/${id}/slots?page=0&size=10&sort=desc`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getRoomInfo = (id: string): Promise<any> => {
  console.log(id);
  return api.get(`/api/v1/patient-app/patients/sessions/${id}/room`, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};

export const getAllGroupSlots = (id: string): Promise<any> => {
  console.log(id);
  return api.get(
    `/api/v1/patient-app/patients/sessions/group/${id}/slots?page=0&size=10&sort=desc`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};
export const getAllDetailsSession = (id: string): Promise<any> => {
  console.log(id);
  return api.get(
    `/api/v1/patient-app/patients/sessions/${id}`,

    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const cancelSession = (id: string): Promise<any> => {
  return api
    .post(BASE_URL + `/api/v1/patient-app/patients/sessions/${id}/cancel`, {})
    .then(() => {
      console.log('done');
    })
    .catch(e => {
      console.log(e);
    });
};

export const getSessionInfoById = (id: string): Promise<any> => {
  return api.get(apiEndPointList.GET_SESSIONS + `?sessionId=${id}`, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};
