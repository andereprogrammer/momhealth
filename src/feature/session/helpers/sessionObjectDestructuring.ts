import {SessionObject} from '../../../constants/types';
import {faIR} from 'date-fns/locale';

export interface Session {
  created: string | null;
  updated: string | null;
  id: string;
  session_template: null;
  name: string;
  category: string;
  type: string;
  image: string;
  duration_in_minutes: number;
  description: string | null;
  prerequisites: string[];
  session_start_time: string;
  room: Room;
  created_by: string;
  created_by_type: string;
  session_status: string;
  session_hosts: SessionHost[];
  attendee_status: string | undefined;
  cancellation_allowed: boolean;
  notes: Note[];
}

export interface SessionTemplate {
  created: string | null;
  updated: string | null;
  id: string;
  name: string;
  category: string;
  type: string;
  image: string;
  duration_in_minutes: number;
  description: string | null;
  prerequisites: string[];
  recurrence_details: RecurrenceDetails;
  room_dto: Room;
  session_hosts: SessionHost[];
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

interface RecurrenceDetails {
  recurrence_pattern: RecurrencePattern;
  room_id: string;
}

interface RecurrencePattern {
  start_date: string;
  end_date: string;
  start_time: string;
  type: RecurrenceType;
}

interface RecurrenceType {
  frequency: string;
  interval: number;
  allowed_days: string[];
}

type Note = {
  id: string;
  session_id: string | null;
  title: string;
  description: string;
  created_by: string;
  creator_type: 'SERVICE_PROVIDER' | 'USER' | string; // Add more possible values if needed
  created: string; // It's in ISO 8601 format, you can also use a Date object
};

type NoteList = {
  notes: Note[];
};

interface SessionHost {
  created: string;
  updated: string;
  id: string;
  name: string;
  category: string;
  host_type: string;
  host_ref_id: string;
  status: string;
}

export function extractSessionInfo(sessionObjects: Session[]): SessionObject[] {
  return sessionObjects.map(session => {
    const sessionHostId = session.session_hosts[0].host_ref_id;
    const sessionHosts = session.session_hosts
      .map(host => host.name)
      .join(', ');
    const sessionHostImage = session.session_hosts[0].image;
    const sessionHostMetadata = session.session_hosts[0].metadata;
    return {
      sessionState: session.attendee_status || undefined,
      sessionName: session.name,
      sessionCarePerson: sessionHosts,
      sessionCarePersonId: sessionHostId,
      sessionCarePersonImage: sessionHostImage,
      sessionCarePersonMetadata: sessionHostMetadata,
      sessionTime: session.session_start_time,
      sessionType: session.type,
      sessionStatus: session.session_status,
      sessionTimeCount: undefined,
      sessionCta: undefined,
      sessionCategory: session.category,
      sessionImage: session.image,
      _id: session.id,
      unique_key: session.id,
      description: session.description || '',
      prerequisites: session.prerequisites,
      duration: session?.duration_in_minutes?.toString(),
      status: session.session_status,
      cancellation_allowed: session.cancellation_allowed,
      notes: session.notes,
    };
  });
}

export function extractSessionInfoFromTemplate(
  sessionObjects: SessionTemplate[],
): SessionObject[] {
  return sessionObjects.map(template => {
    const sessionHostId = template.session_hosts[0].host_ref_id;
    const sessionHostImage = template.session_hosts[0].image;
    const sessionHostMetadata = template.session_hosts[0].metadata;
    const sessionHosts = template.session_hosts
      .map(host => host.name)
      .join(', ');
    return {
      sessionState: 'ASSIGNED',
      sessionName: template.name,
      sessionCarePerson: sessionHosts,
      sessionCarePersonId: sessionHostId,
      sessionCarePersonImage: sessionHostImage,
      sessionCarePersonMetadata: sessionHostMetadata,
      sessionTime: null,
      sessionType: template.type,
      sessionStatus: 'CREATED',
      sessionTimeCount: undefined,
      sessionCta: undefined,
      sessionCategory: template.category,
      sessionImage: template.image,
      _id: template.id,
      unique_key: template.id,
      description: template.description || '',
      prerequisites: template.prerequisites,
      duration: template?.duration_in_minutes?.toString(),
      status: 'CREATED',
      cancellation_allowed: false,
      notes: [],
      room: template.room_dto,
    };
  });
}

export function extractSingleSessionInfo(session: Session): SessionObject {
  const sessionHosts = session.session_hosts.map(host => host.name).join(', ');
  const sessionHostId = session.session_hosts[0].host_ref_id;
  return {
    sessionState: session.attendee_status || undefined,
    sessionName: session.name,
    sessionCarePerson: sessionHosts,
    sessionCarePersonId: sessionHostId,
    sessionTime: session.session_start_time,
    sessionType: session.type,
    sessionTimeCount: undefined,
    sessionCta: undefined,
    sessionCategory: session.category,
    sessionImage: session.image,
    _id: session.id,
    unique_key: session.id,
    description: session.description || '',
    prerequisites: session.prerequisites,
    duration: session?.duration_in_minutes?.toString(),
    status: session.session_status,
    cancellation_allowed: session.cancellation_allowed,
    notes: session.notes,
  };
}

export type TimeSlot = {
  start_time: string;
  end_time: string;
  status: string;
};

export type DateTimeSlots = {
  [date: string]: TimeSlot[];
};

export function iterateDateTimeSlots(dateTimeSlots: DateTimeSlots): string[] {
  const datesWithTimeSlots: string[] = [];

  for (const date in dateTimeSlots) {
    if (dateTimeSlots.hasOwnProperty(date) && dateTimeSlots[date].length > 0) {
      datesWithTimeSlots.push(date);
    }
  }
  return datesWithTimeSlots;
}

export function getFirstDate(dateTimeSlots: DateTimeSlots): string {
  let first = '';
  for (const date in dateTimeSlots) {
    if (dateTimeSlots.hasOwnProperty(date) && dateTimeSlots[date].length > 0) {
      first = date;
      break;
    }
  }
  return first;
}

export function getTimeSlotsForDate(
  dateTimeSlots: DateTimeSlots,
  date: string,
): TimeSlot[] | undefined {
  return dateTimeSlots[date];
}
