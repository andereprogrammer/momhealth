type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  blood_group: BloodGroup;
  doctor: null;
}

interface SessionTemplate {
  created: string;
  updated: string;
  id: string;
  name: string;
  category: string;
  type: string;
  duration_in_minutes: number;
}

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  type: string;
  email: string;
  phone: string;
}

interface Room {
  created: string;
  updated: string;
  id: string;
  ref_id: string;
  type: string;
  provider_ref_id: string;
  provider: string;
}

interface Session {
  created: string;
  updated: string;
  id: string;
  session_template: SessionTemplate;
  session_start_time: string;
  duration_in_minutes: number;
  service_provider: ServiceProvider;
  room: Room;
}

interface SessionStatus {
  created: string;
  updated: string;
  id: string;
  patient: Patient;
  session: Session;
  status: string;
}

type Sessions = SessionStatus[];

export type MoodValue = {
  id: number;
  value: string;
  selected?: boolean;
  type: string;
};

export type MoodCategory = {
  id: number;
  name: string;
  category: string;
  values: MoodValue[];
  description: string;
  selected?: boolean;
};

export type MoodResponse = MoodCategory[];
