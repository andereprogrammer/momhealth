import {
  CareFree,
  Consultation,
  GarbhFree,
  MentalFree,
  PhysioFree,
  YogaFree,
} from '../../../assets';

export const pregnancy_care_services = [
  {image: YogaFree, name: 'Yoga'},
  {image: GarbhFree, name: 'Weekly'},
  {image: Consultation, name: '1 on 1'},
  {image: PhysioFree, name: 'Pain'},
  {image: MentalFree, name: 'Diagnostic'},
  {image: CareFree, name: 'Birth'},
];

export const insightData = [
  {
    id: 1,
    image_link:
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/Pregnancy+Symptoms+Card-01.png',
    topic_title: 'Manage common symptoms',
    keyProp: 'symptoms',
  },

  {
    id: 1,
    image_link:
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/YogaAnd.png',
    topic_title: 'Yoga and garbh sanskar',
    keyProp: 'yoga',
  },
  {
    id: 1,
    image_link:
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/Emotional+Care+Card-01.png',
    topic_title: 'Emotional care',
    keyProp: 'mental',
  },
  {
    id: 1,
    image_link:
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/Nutrition.png',
    topic_title: 'Nutritional support',
    keyProp: 'nutritional support',
  },
  {
    id: 1,
    image_link:
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/Gynec.png',
    topic_title: 'Gynecologist support ',
    keyProp: 'gynecologist support ',
  },
  // {
  //   id: 1,
  //   image_link:
  //     'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/pog/Birthing+Support+Card-01.png',
  //   topic_title: 'Birthing support',
  //   keyProp: 'Delivery',
  // },
];
