import {
  addWeeks,
  endOfWeek,
  format,
  getISOWeek,
  isSameMonth,
  startOfWeek,
} from 'date-fns';
import DeviceInfo from 'react-native-device-info';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import moment from "moment";
export interface DateTimeInfo {
  date: string | DateTimeInfo;
  time: string;
  countdown?: string; // Make countdown optional
}

export type ReturnTypeDate = 'date' | 'time' | 'countdown';

export function getDateTimeInfo(
  appointmentTime: string,
  returnType: ReturnTypeDate,
): DateTimeInfo | string | number | boolean {
  const appointmentDateTime = new Date(appointmentTime);
  const currentDate = new Date();

  if (returnType === 'date') {
    const formattedDate = appointmentDateTime.toLocaleDateString('en-GB');
    return formattedDate; // DD/MM/YYYY format
  }

  if (returnType === 'time') {
    const formattedTime = appointmentDateTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return formattedTime; // HH:MM format
  }

  if (returnType === 'countdown') {
    if (
      appointmentDateTime > currentDate &&
      isSameDate(appointmentDateTime, currentDate)
    ) {
      const countdown = Math.floor(
        (appointmentDateTime.getTime() - currentDate.getTime()) / 1000,
      );
      return countdown; // Countdown in seconds
    } else if (appointmentDateTime > currentDate) {
      const formattedDate = appointmentDateTime.toLocaleDateString('en-IN');
      const formattedTime = appointmentDateTime.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return {
        date: formattedDate,
        time: formattedTime,
      }; // Future date and time
    } else {
      return false; // Past date
    }
  }

  return false; // Return false for non-matching conditions
}

function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isTodayOrTomorrow(dateString: string): boolean {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  // Get the current date without the time component
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Set the target date to the same year, month, and day as the current date
  targetDate.setFullYear(currentYear, currentMonth, currentDay);

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  // Calculate the number of days difference
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Check if the date is today (0 days difference) or tomorrow (1 day difference)
  return daysDifference === 0 || daysDifference === 1;
}

// Example usage:

// WeekDates.ts

// WeekDates.ts

// WeekDates.ts

export interface WeekDates {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
}

export const getCurrentMonthWeekDates = (): WeekDates => {
  const currentDate = new Date();
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);
  const weekNumber = getWeekNumberInMonth(currentDate);
  return {weekNumber, startDate, endDate};
};

export const getNextMonthWeekDates = (currentEndDate: Date): WeekDates => {
  const nextStartDate = addWeeks(currentEndDate, 1);
  const nextEndDate = addWeeks(nextStartDate, 1);
  const weekNumber = getWeekNumberInMonth(nextStartDate);
  return {weekNumber, startDate: nextStartDate, endDate: nextEndDate};
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

const calculateWeekNumber = (start: Date, end: Date): number => {
  let currentDate = start;
  let weekNumber = 1;

  while (currentDate <= end) {
    if (isSameMonth(currentDate, end)) {
      weekNumber = getISOWeek(currentDate);
    }
    currentDate = addWeeks(currentDate, 1);
  }

  return weekNumber;
};

function getWeekNumberInMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth, {weekStartsOn: 1}); // Assuming Monday is the first day of the week

  const diffInWeeks = Math.floor(
    (date - firstDayOfWeek) / (7 * 24 * 60 * 60 * 1000),
  );

  return diffInWeeks + 1; // Adding 1 to make it 1-based index
}

export function getMonthStartEndDates(
  month: number,
  year: number,
): {startDate: string; endDate: string; month: number} {
  // If the input is any other month or year
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    month: month,
  };
}

// Example usage:
const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

const {startDate, endDate} = getMonthStartEndDates(currentMonth, currentYear);
console.log(`Start Date: ${startDate}`);
console.log(`End Date: ${endDate}`);

export function formatTimeSession(
  inputTime: string,
  is24HourFormat: boolean,
): string {
  let formattedTime = inputTime;
  if (!is24HourFormat) {
    let [hours, minutes] = inputTime.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    if (minutes == 0) {
      minutes = '00';
    }
    if (hours === 0) {
      formattedTime = `12:${minutes} ${period}`;
    } else if (hours > 12) {
      formattedTime = `${hours - 12}:${minutes} ${period}`;
    } else {
      formattedTime = `${hours}:${minutes} ${period}`;
    }
  }

  return formattedTime;
}
export function isTimeDifferenceWithinFiveMinutes(targetTime: string): boolean {
  const targetDate = new Date(targetTime);
  const currentDate = new Date();
  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 0; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000,
  );

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  return Math.abs(timeDifference) <= 300000;
}
export function getTimeDifference(utcString: string): number {
  const utcDate = new Date(utcString);
  return moment.utc(utcDate).diff(moment.now(), 'minutes');
}

// Example usage
// const utcString = '2023-10-31T13:00:00Z';
// const timeDifference = getTimeDifference(utcString);
// console.log(`Time Difference: ${timeDifference}`);

export function convertDateToUTCStringFormatted(date: Date) {
  let dateISOString = date.toISOString();
  let dateParts = dateISOString.split('T');
  let dateString = dateParts[0].split('-');
  let datePart = dateString[2] + '-' + dateString[1] + '-' + dateString[0];
  let timePart = dateParts[1].slice(0, 8);
  return datePart + ' ' + timePart;
}
