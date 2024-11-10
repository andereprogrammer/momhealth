import {api} from './useAuth';

export const authorizeUserchat = (): Promise<any> => {
  console.log('I am Registered');
  return api.post(
    '/api/v1/patient-app/patients/chats/oauth',
    {},
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};
