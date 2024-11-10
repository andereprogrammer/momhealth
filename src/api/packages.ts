import {api} from './useAuth';

export type WebsiteMeta = {
  package_heading: string;
  program_type: string;
  minimized_benefits: string;
  card_program_desc: string;
  section: string;
};

export type PatientProgram = {
  id: string;
  name: string;
  type: string;
  description: string;
  status: string;
  website_meta: WebsiteMeta;
  packages: PatientPackage[];
  app_meta: any;
};

export type PatientPackage = {
  id: string;
  name: string;
  description: string;
  status: string;
  tenure: number;
  amount: number;
  full_amount: number;
  default: boolean;
  discount: number;
};

export type InitPaymentResponse = {
  payment_id: string;
  gateway: string;
  pay_load: InitPaymentPayload;
  response_type: string;
};
export type InitPaymentPayload = {
  type: string;
  link: string;
  data: any;
};
export const getPackages = (): Promise<any> => {
  console.log('Calling Get Packages');
  return api.get('/api/v1/patient-app/patients/packages');
};

export const initPackagePay = (packageId: string): Promise<any> => {
  console.log('initPackagePay');
  let apiPath = `/api/v1/patient-app/patients/packages/${packageId}/pay/v2`;
  console.log('API Path', apiPath);
  return api.post(apiPath);
};

export const processPackagePay = (
  pg,
  paymentId,
  paymentResponse,
): Promise<any> => {
  console.log('paymentResponse', paymentResponse);
  let apiPath = `/api/v1/patient-app/patients/payments/${pg}/process/PATIENT_PACKAGE/${paymentId}`;
  console.log('API Path', apiPath);
  return api.post(apiPath, paymentResponse);
};

export const getEligiblePackages = (): Promise<any> => {
  console.log('Calling Get Packages');
  return api.get('/api/v1/patient-app/patients/packages/eligible');
};
