import {TipOfTheDayItem} from '../../../constants/types';

export function sortTipsByDate(tips: TipOfTheDayItem[]): TipOfTheDayItem[] {
  return tips.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });
}
