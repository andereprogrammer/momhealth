import {BackBtn, CareTeam, PL2, PL3, Placeholder, SessionYoga} from '../assets';
import {UserCardProps} from '../feature/chat/components/UserCardComponent';
import {PackageProps} from '../feature/packages/screens/PackagesHomeScreen';
import {CardsPropsSession, SessionObject} from './types';

export const cards: CardsPropsSession[] = [
  {
    heroText:
      'Physiotherapy for Trimester 1 mothers.A path to heal and explore',
    secondaryText: 'Mental Health',
    imageValue: SessionYoga,
  },
  {
    heroText: 'Group Physio for Trimester 1 mothers.',
    secondaryText: 'Mental Health',
    imageValue: PL3,
  },
  {
    heroText: 'Yoga Session for Trimester 1 mothers',
    secondaryText: 'Mental Health',
    imageValue: PL2,
  },
  {
    heroText: 'Mental Well being session for Trimester 1 mothers',
    secondaryText: 'Mental Health',
    imageValue: Placeholder,
  },
];
export const users: UserCardProps[] = [
  {
    source: CareTeam,
    userName: 'Keshav',
    notifications: 9,
  },
  {
    source: CareTeam,
    userName: 'Joe',
    notifications: 9,
  },
  {
    source: CareTeam,
    userName: 'Raghu',
    notifications: 9,
  },
];
export const sessionup: SessionObject[] = [
  {
    sessionCarePerson: 'Akshya',
    sessionCategory: 'Yoga',
    sessionType: 'Group',
    sessionState: 'Not Confirmed',
    sessionName: 'PhysioTherapy for Trimester 1',
    sessionTime: 'Mar 02,12 : 50 pm',
  },
  {
    sessionCarePerson: 'Akshya',
    sessionCategory: 'Yoga',
    sessionType: 'Individual',
    sessionState: 'Not Confirmed',
    sessionName: 'Mental health for Trimester 1',
    sessionTime: 'Mar 02,12 : 40 pm',
  },
  {
    sessionCarePerson: 'Madhumitha',
    sessionCategory: 'Yoga',
    sessionType: 'Group',
    sessionState: 'Not Confirmed',
    sessionName: 'Yoga for Trimester 1',
    sessionTime: 'Mar 02,12 : 33 pm',
  },
  {
    sessionCarePerson: 'Hemali',
    sessionCategory: 'Yoga',
    sessionType: 'Group',
    sessionState: 'Not Confirmed',
    sessionName: 'Yoga for Trimester 1',
    sessionTime: 'Mar 02,12 : 32 pm',
  },
  {
    sessionCarePerson: 'Akshya',
    sessionCategory: 'Yoga',
    sessionType: 'Group',
    sessionState: 'Not Confirmed',
    sessionName: 'PhysioTherapy for Trimester 1',
    sessionTime: 'Mar 02,12 : 31 pm',
  },
];

export const Packages: PackageProps[] = [
  {
    packageName: 'Love that bump',
    description:
      'This is the base package which is all inlcusive of the consulesr the care team adn the session wich si for jtne likef e ',
    packages: [
      {
        id: '837r89w',
      },
    ],
    website_meta: {
      name: 'something',
      description: 'something',
    },
  },
  {
    packageName: 'Preconception',
    description: 'something',
    packages: [
      {
        id: '837r89w',
      },
    ],
    website_meta: {
      name: 'something',
      description: 'something',
    },
  },
];
