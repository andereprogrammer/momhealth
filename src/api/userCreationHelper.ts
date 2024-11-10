import axios from 'axios';
import {apiEndPointList} from '../constants';
import {api, authenticate} from './useAuth';
import {listItem} from '../components/MainContainer/SyptomsListComponent/types';
import {UploadedFile} from '../feature/profile/screens/EditProfileScreen';
import {items} from '@sentry/react-native/dist/js/utils/envelope';

type IUser = {
  email: string;
  firstName: string;
  city: string;
};

export const register = (phoneNumber: string): Promise<any> => {
  console.log(apiEndPointList.AUTH_LOGIN_MOBILE);
  console.log('phoneNumber', phoneNumber);
  return api.post(
    apiEndPointList.AUTH_LOGIN_MOBILE,
    {
      phone: phoneNumber,
    },
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const sendOtp = (phoneNumber: string): Promise<any> => {
  console.log(apiEndPointList.AUTH_OTP);
  return axios.post(
    apiEndPointList.AUTH_OTP,
    {
      phone: phoneNumber,
    },
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const validateOtp = (phoneNumber: string, otp: string): Promise<any> => {
  return authenticate(phoneNumber, otp);
};

export const logout = (phoneNumber: string, otp: string): Promise<any> => {
  console.log(apiEndPointList.AUTH_AUTHENTICATE, otp, phoneNumber);
  return axios.post(
    apiEndPointList.AUTH_AUTHENTICATE,
    {
      phone: phoneNumber,
      otp: otp,
    },
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const getSyptoms = (): Promise<any> => {
  return api.get(apiEndPointList.GET_SYMPTOMS);
};

export const getChallenges = (): Promise<any> => {
  return api.get(apiEndPointList.GET_CHALLENGES);
};

export const getChallengesV2 = (): Promise<any> => {
  return api.get(apiEndPointList.GET_CHALLENGES_V2);
};

export const addDcotors = (phoneNumber: string, otp: string): Promise<any> => {
  console.log(apiEndPointList.AUTH_AUTHENTICATE, otp, phoneNumber);
  return axios.post(
    apiEndPointList.AUTH_AUTHENTICATE,
    {
      phone: phoneNumber,
      otp: otp,
    },
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const setupPregnant = (
  lmp: string,
  edd: string,
  sypmtoms: listItem[],
): Promise<any> => {
  const reasonList = sypmtoms
    .filter(item => item.selected)
    .map(item => {
      return item.syptom;
    });
  let lmpFormated = lmp.split('/').reverse().join('-');
  let eddFormated = edd.split('/').reverse().join('-');
  return api.post(
    apiEndPointList.POST_MOTHERHOOD_PREGNANT,
    {
      lmp: lmpFormated,
      edd: eddFormated,
      reasons: reasonList,
    },
    {headers: {accept: '*/*', 'Content-Type': 'application/json'}},
  );
};

export const setupMom = (newMomDetails: any): Promise<any> => {
  console.log('Setting new Mom', JSON.stringify(newMomDetails));
  let challenges = [];
  if (newMomDetails.challenges) {
    challenges = newMomDetails.challenges
      .filter(option => option.selected)
      .map(option => option.key);
  }

  console.log('challenges', challenges);
  const data = {
    delivery_type: newMomDetails.deliveryType,
    no_of_babies: newMomDetails.noOfBabies,
    challenges: challenges,
    babies: newMomDetails.babies,
    delivery_date: newMomDetails.newMomDate,
  };
  console.log('newMom Request', JSON.stringify(data));
  return api.post(apiEndPointList.POST_MOTHERHOOD_MOM, data, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};

export const registerPatient = (
  bloodGroup: string,
  user: IUser,
  date: string,
): Promise<any> => {
  let dob = date.split('/').reverse().join('-');
  console.log(apiEndPointList.AUTH_REGISTER, bloodGroup);
  return api.post(apiEndPointList.AUTH_REGISTER, {
    name: user.firstName,
    city: user.city,
    email: user.email,
    blood_group: bloodGroup,
    dob: dob,
    doctor_id: 'string',
  });
};

export const updatePatient = (
  bloodGroup: string,
  user: IUser,
  date: string,
): Promise<any> => {
  let dob = date.split('/').reverse().join('-');
  console.log(apiEndPointList.PATIENT_UPDATE, bloodGroup);
  return api.put(apiEndPointList.PATIENT_UPDATE, {
    name: user.firstName,
    city: user.city,
    email: user.email,
    blood_group: bloodGroup,
    dob: dob,
  });
};

export const deactivate = (): Promise<any> => {
  console.log(apiEndPointList.DEACTIVATE_USER);
  return api.delete(apiEndPointList.DEACTIVATE_USER, {
    headers: {accept: '*/*', 'Content-Type': 'application/json'},
  });
};

export const patchPatient = (
  bloodGroup: string,
  user: IUser,
  date: string,
  photo: UploadedFile,
): Promise<any> => {
  console.log('patching', user, date);
  const formData = new FormData();
  let dob = date.split('/').reverse().join('-');
  let data = {
    name: user.firstName,
    city: user.city,
    email: user.email,
    blood_group: bloodGroup,
    dob: dob,
  };
  formData.append('data', {
    string: JSON.stringify(data), //This is how this dumb thing works :)
    type: 'application/json',
  });
  if (photo) {
    formData.append('photo', {
      name: photo.name,
      uri: photo.uri,
      type: '' + photo.type,
    });
  }

  console.log('update patient', JSON.stringify(formData));
  return api.put(apiEndPointList.PATIENT_UPDATE, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
