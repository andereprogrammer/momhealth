import {listItem} from './types';

export const syptomslist: listItem[] = [
  {key: 1, syptom: 'Achieve a natural delivery', selected: false},
  {key: 2, syptom: 'Provide optimal nutrition for my baby\'s development', selected: false},
  {key: 3, syptom: 'Follow a safe and beneficial pregnancy yoga and exercise regimen', selected: false},
  {key: 4, syptom: 'Effectively manage any pregnancy symptom and complications', selected: false},
  {key: 5, syptom: 'Seek and receive emotional support throughout my pregnancy', selected: false},
  {key: 6, syptom: 'Stay well-informed to ensure a healthy pregnancy', selected: false},
  {key: 7, syptom: 'Foster a deeper connection with my baby through Garbhsanskar', selected: false},
];

export const newMomSymptomsMapping = [
  {
    question: 'Body Functions',
    options: [
      {symptom: 'Vaginal laxity', selected: false},
      {symptom: 'Urinary leakage', selected: false},
      {symptom: 'Sleep deprived', selected: false},
      {symptom: 'Lactation', selected: false},
    ],
  },
  {
    question: 'Fitness',
    options: [
      {symptom: 'Weight control', selected: false},
      {symptom: 'Bulging tummy', selected: false},
      {symptom: 'Leg swelling', selected: false},
    ],
  },
];
