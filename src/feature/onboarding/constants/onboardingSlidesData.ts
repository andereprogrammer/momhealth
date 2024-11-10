import {
  Onborading1Bg,
  Onborading2Bg,
  Onborading3Bg,
  Onborading4Bg,
} from '../../../assets';
import {SlideProps} from './types';

export const slides: SlideProps[] = [
  {
    heroText: 'End to end support for a happy pregnancy and healthy baby',
    secondaryText: '',
    imageValue: Onborading2Bg,
    animationValue: require('../../../assets/animations/on3.json'),
    id: 1,
  },
  {
    heroText:
      'Track your baby’s progress and gain pregnancy insights for each week',
    secondaryText: '',
    imageValue: Onborading4Bg,
    animationValue: require('../../../assets/animations/on4.json'),
    id: 2,
  },
  {
    heroText: '24*7 access to tools and content for all your questions',
    secondaryText: '',
    imageValue: Onborading1Bg,
    animationValue: require('../../../assets/animations/on2.json'),
    id: 3,
  },

  {
    heroText:
      'Experts available including gynecologists, nutritionists, mental health counsellors,yoga and garbh sanskar instructors, physiotherapists, labor and lactation coaches',
    secondaryText: '',
    imageValue: Onborading3Bg,
    animationValue: require('../../../assets/animations/on1.json'),
    id: 4,
  },
];
