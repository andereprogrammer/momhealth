import {timestampToAMPM} from '../../insights/helpers/convertTimestamp';

export function timestampRelative(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMilliseconds = now.getTime() - date.getTime();

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths >= 1) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }
  if (diffInWeeks >= 1) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  }
  if (diffInDays >= 1) {
    return diffInDays === 1 ? '1d ago' : `${diffInDays}d ago`;
  }
  if (diffInHours >= 1) {
    return timestampToAMPM(timestamp);
  }
  if (diffInMinutes >= 1) {
    return timestampToAMPM(timestamp);
  }
  return timestampToAMPM(timestamp);
}
