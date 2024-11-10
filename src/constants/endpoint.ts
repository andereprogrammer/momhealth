export const BASE_URL = process.env.REACT_APP_NEXUS_BASE_URL;

export const apiEndPointList = {
  //Journal APis
  //Auth Apis:
  MARK_READ_EXPERTNOTES:
    BASE_URL + '/api/v1/patient-app/patients/medical-journals',
  MARK_READ_SESSIONOTES:
    BASE_URL + '/api/v1/patient-app/patients/session-notes/',
  AUTH_LOGIN_MOBILE: BASE_URL + '/api/v1/patient-app/auth/loginOrSignup',
  AUTH_REGISTER: BASE_URL + '/api/v1/patient-app/auth/register',
  AUTH_AUTHENTICATE: BASE_URL + '/api/v1/patient-app/auth/authenticate',
  AUTH_LOGOUT_ALL: BASE_URL + '/api/v1/patient-app/auth/logout/all',
  AUTH_LOGOUT: BASE_URL + '/api/v1/patient-app/auth/logout',
  AUTH_OTP: BASE_URL + '/api/v1/patient-app/auth/otp',
  AUTH_REFRESH_TOKEN: BASE_URL + '/api/v1/patient-app/auth/refresh-token',
  DEACTIVATE_USER: BASE_URL + '/api/v1/patient-app/patients/deactivate',

  //GET API's:
  GET_CHALLENGES: BASE_URL + '/api/v1/patient-app/data/challenges',
  GET_CHALLENGES_V2: BASE_URL + '/api/v1/patient-app/data/challenges/v2',
  GET_SYMPTOMS: BASE_URL + '/api/v1/patient-app/data/symptoms',
  GET_PATIENT_HOME: BASE_URL + '/api/v1/patient-app/patients/home',
  GET_PATIENT_BASIC: BASE_URL + '/api/v1/patient-app/patients/basic',
  GET_DOCTORS_SEARCH: BASE_URL + '/api/v1/patient-app/data/doctors/search',
  GET_ACTIVITY_TAGS: BASE_URL + '/api/v1/patient-app/data/activity-tags',
  GET_LATEST_MASTERCLASS: BASE_URL + '/api/v1/patient-app/patients/getLatestMasterClass',
  GET_ALL_MASTERCLASS: BASE_URL + '/api/v1/patient-app/patients/getAllMasterClass',

  //POST API's:
  POST_SYMPTOMS: BASE_URL + '/api/v1/patient-app/data/symptoms',
  POST_CHALLENGES: BASE_URL + '/api/v1/patient-app/data/challenges',
  POST_MOTHERHOOD_MOM: BASE_URL + '/api/v1/patient-app/patients/motherhood/mom',
  POST_MOTHERHOOD_PREGNANT:
    BASE_URL + '/api/v1/patient-app/patients/motherhood/pregnant',

  //SESSION API's:
  POST_BOOK_SESSION:
    BASE_URL +
    '/api/v1/patient-app/patients/service-providers/sessions/0CTF0WBMPGQBH/book',
  POST_JOIN_SESSION:
    BASE_URL + '/api/v1/patient-app/patients/sessions/0CTEZEB2CEEE5',
  GET_SESSIONS: BASE_URL + '/api/v1/patient-app/patients/sessions/search',
  GET_PERSONAL_SESSIONS:
    BASE_URL + '/api/v1/patient-app/patients/sessions/personal/search',
  GET_GROUP_SESSIONS:
    BASE_URL + '/api/v1/patient-app/patients/sessions/group/search',
  GET_SESSION_CATEGORIES:
    BASE_URL + '/api/v1/patient-app/data/sessions/categories',

  SERVICE_PROVIDER_SESSION_ATTR:
    BASE_URL + '/api/v1/service-provider-app/data/session-attributes',

  //CHAT API's
  CHAT_OAUTH: BASE_URL + '/api/v1/patient-app/patients/chats/oauth',

  CARE_TEAM_HOME: BASE_URL + '/api/v1/patient-app/patients/care-team',
  PATIENT_HOME: BASE_URL + '/api/v1/patient-app/patients/home',
  PATIENT_LOGS: BASE_URL + '/api/v1/patient-app/patients/logs',
  PATIENT_MEDICAL_JOURNAL:
    BASE_URL +
    '/api/v1/patient-app/patients/medical-journals?page=0&size=10&sort=desc',
  PATIENT_MEDICAL_JOURNAL_ID:
    BASE_URL + '/api/v1/patient-app/patients/medical-journals/',
  PATIENT_PERSONAL_JOURNAL_GET:
    BASE_URL +
    '/api/v1/patient-app/patients/journals?page=0&size=10&sort=id,desc',
  PATIENT_PERSONAL_JOURNAL: BASE_URL + '/api/v1/patient-app/patients/journals',
  PATIENT_UPDATE: BASE_URL + '/api/v1/patient-app/patients/',
  DEVICE_REGISTER: BASE_URL + '/api/v1/patient-app/patients/devices',
  DEVICE_LOG: BASE_URL + '/api/v1/patient-app/patients/devices/log',
  MAR_WEBINAR_JOINED:
    BASE_URL + '/api/v1/patient-app/patients/webinars/mark-joined',
  FACEBOOK_EVENT_LOG:
    BASE_URL + '/api/v1/patient-app/patients/events/facebook/log',
  TAG_PATIENT_AS_REQUIRES_CALLBACK:
    BASE_URL + '/api/v1/patient-app/patients/packages/requires-callback',

  //TIP of the day
  GET_ALL_TIPS:
    BASE_URL + '/api/v1/patient-app/patients/tips/today?sort=id,asc',

  //GET ALL POG WEEK DATA
  GET_ALL_POG_WEEK:
    BASE_URL + '/api/v1/patient-app/data/pregnancy/week-details',

  POST_CHECK_VERSION_POG: (version: number) =>
    `${BASE_URL}/api/v1/patient-app/data/pregnancy/week-details/${version}`,


  GET_WEEKLY_AFFIRMATIONS: 
    `${BASE_URL}/api/v1/patient-app/patients/garbh-sanskar/get-affrimations`,

  GET_BRAIN_ACTIVITIES: (module: string) =>
    BASE_URL + `/api/v1/patient-app/patients/garbh-sanskar/get-brain-activities?module=${module}`,

  SET_BRAIN_ACTIVITY_STAUS: 
    BASE_URL + '/api/v1/patient-app/patients/garbh-sanskar/update-brain-activity-status',

};
