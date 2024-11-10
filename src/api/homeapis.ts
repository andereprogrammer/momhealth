import {apiEndPointList} from '../constants';
import {api} from './useAuth';
import {Journal} from '../feature/personaljournal/components/PersonalJournalListingComponent';
import {FacebookEventLog} from '../helpers/facebook_events';

export const getCareTeam = (): Promise<any> => {
  return api.get(apiEndPointList.CARE_TEAM_HOME);
};

export const getHomeScreenInfo = (): Promise<any> => {
  return api.get(apiEndPointList.PATIENT_HOME);
};

export const getMasterclassBannerDetails = (): Promise<any> => {
 return api.get(apiEndPointList.GET_LATEST_MASTERCLASS)
}

export const getAllMasterclassDetails = (): Promise<any> => {
  return api.get(apiEndPointList.GET_ALL_MASTERCLASS)
 }

export const getPatientsPersonalJournals = (): Promise<any> => {
  return api.get(apiEndPointList.PATIENT_PERSONAL_JOURNAL_GET);
};

export const getPatientsMedicalJournals = (): Promise<any> => {
  return api.get(apiEndPointList.PATIENT_MEDICAL_JOURNAL);
};
export const getPatientMedicalJournalInfo = (id: string): Promise<any> => {
  return api.get(apiEndPointList.PATIENT_MEDICAL_JOURNAL_ID + id);
};

export const getPatientPersonalJournalInfo = (id: string): Promise<any> => {
  return api.get(apiEndPointList.PATIENT_PERSONAL_JOURNAL + id);
};

export const createJournal = (journal: Journal): Promise<any> => {
  return api.post(
    '/api/v1/patient-app/patients/journals?page=0&size=10&sort=desc',
    journal,
  );
};

export const createLogs = (log): Promise<any> => {
  return api.post('/api/v1/patient-app/patients/logs', log, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const getMoods = (): Promise<any> => {
  return api.get('/api/v1/patient-app/data/moods');
};

export const searchLogs = (): Promise<any> => {
  return api.get('/api/v1/patient-app/patients/logs/search?sort=id,desc');
};

export const getReports = (): Promise<any> => {
  return api.get(
    '/api/v1/patient-app/patients/reports/search?sort=id,desc&size=100',
  );
};
export const createReport = (report): Promise<any> => {
  console.log('createReport', report);
  const formData = new FormData();
  formData.append('data', {
    string: JSON.stringify(report.data), //This is how this dumb thing works :)
    type: 'application/json',
  });
  formData.append('report', {
    name: report.fileName,
    uri: report.report,
    type: '' + report.fileType,
  });
  return api.post('api/v1/patient-app/patients/reports', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const getActivities = (params: string): Promise<any> => {
  return api.get(
    `/api/v1/patient-app/patients/activities/search?page=0&size=100&${params}`,
  );
};

export const markActivityComplete = (
  patientActivityId: string,
): Promise<any> => {
  console.log('Marking ', patientActivityId);
  return api.post(
    `/api/v1/patient-app/patients/activities/${patientActivityId}/complete`,
  );
};
export const getTodos = (): Promise<any> => {
  return api.get('/api/v1/patient-app/patients/todos/search?page=0&size=100');
};

export const getActivePackages = (): Promise<any> => {
  return api.get('/api/v1/patient-app/patients/packages/active');
};

export const getMedicalJournal = (page: number): Promise<any> => {
  if (!page) {
    page = 0;
  }
  return api.get(`/api/v1/patient-app/patients/medical-journals?page=${page}`);
};

export const getMedicalJournalByServiceProvider = (
  serviceProviderId: string,
  page: number,
): Promise<any> => {
  if (!page) {
    page = 0;
  }
  console.log('fetch medical journal for ', serviceProviderId);
  return api.get(
    `/api/v1/patient-app/patients/medical-journals/service-providers/${serviceProviderId}`,
  );
};

export const getSessionNotes = (page: number): Promise<any> => {
  if (!page) {
    page = 0;
  }
  return api.get(`/api/v1/patient-app/patients/session-notes?page=${page}`);
};

export const getPatientBasic = (): Promise<any> => {
  return api.get(apiEndPointList.GET_PATIENT_BASIC);
};

export const markExpertnotesRead = (id): Promise<any> => {
  return api.patch(apiEndPointList.MARK_READ_EXPERTNOTES + `/${id}/mark-read`);
};
export const markSessionnotesRead = (id): Promise<any> => {
  return api.patch(apiEndPointList.MARK_READ_SESSIONOTES + `${id}/mark-read`);
};

export const markWebinarJoined = (): Promise<any> => {
  return api.post(apiEndPointList.MAR_WEBINAR_JOINED);
};
export const getNotifications = (): Promise<any> => {
  return api.get(
    '/api/v1/patient-app/patients/notifications-center/items?sort=id,desc',
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getWeeklyAffirmations = (): Promise<any> => {
  return api.get(apiEndPointList.GET_WEEKLY_AFFIRMATIONS)
}

export const postMarkAsRead = (id: string): Promise<any> => {
  return api.post(
    `/api/v1/patient-app/patients/notifications-center/items/${id}`,
    {},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};
export const logFacebookEvent = (event: FacebookEventLog): Promise<any> => {
  return api.post(apiEndPointList.FACEBOOK_EVENT_LOG, event);
};

export const requiresCallback = (query: string): Promise<any> => {
  let data = {
    query: query,
  };
  console.log('requires-callback', data);
  return api.post(apiEndPointList.TAG_PATIENT_AS_REQUIRES_CALLBACK, data);
};

export const getTipOfTheDay = (): Promise<any> => {
  return api.get(apiEndPointList.GET_ALL_TIPS, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};

export const getAllPogWeekData = (): Promise<any> => {
  return api.get(apiEndPointList.GET_ALL_POG_WEEK, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};

export const checkVersionPog = (version: number): Promise<any> => {
  return api.post(apiEndPointList.POST_CHECK_VERSION_POG(version), {});
};

export const getMidBrainPuzzles = (): Promise<any> => {
  return api.get(apiEndPointList.GET_BRAIN_ACTIVITIES("LEFT_BRAIN"))
}

export const setPuzzleStatus = (params:any): Promise<any> => {
  return api.post(apiEndPointList.SET_BRAIN_ACTIVITY_STAUS, params)
}
