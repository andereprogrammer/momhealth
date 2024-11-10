import RNFS from 'react-native-fs';

interface MeetingWithGyne {
  description: string;
  ecv: string;
}

interface Mother {
  fetal_movement: string;
  baby_bump_and_clothing: string;
  vaginal_discharge: string;
  cramps: string;
  linea_nigra: string;
  breasts: string;
  joints: string;
  stretch_marks: string;
  balance: string;
  libido: string;
  fatigue: string;
  swelling: string;
  urinary_incontinence: string;
  nesting_instinct: string;
  shortness_of_breath: string;
  urine: string;
  dizziness: string;
  leg_cramps: string;
  diarrhea: string;
  changes_in_vulva: string;
  hair_changes: string;
  thirst: string;
}

interface Hiccups {
  false_labor_pains_braxton_hicks_: string;
  pregnancy_gingivitis: string;
  melasma: string;
  hemorrhoids: string;
  sleep_disturbances: string;
  nosebleed: string;
  puppp: string;
  acne: string;
  spider_veins_varicose_veins: string;
  back_pain: string;
  round_ligament_pain: string;
  pelvic_girldle_pain: string;
  hand_and_wrist_problems: string;
  food_aversion_nausea_and_vomiting: string;
  food_cravings: string;
  bloating_and_constipation: string;
  gerd: string;
  appetite: string;
  mood_swings: string;
  anxiety: string;
}

interface POGTracker {
  baby: {
    length_cms_: string;
    size_equivalent: string;
    description: string;
    fetal_movement: string;
    weight: string;
  };
  mother: Mother;
  meeting_with_gyne: MeetingWithGyne;
  hiccups: Hiccups;
}

export interface OutputJSON {
  [key: string]: POGTracker;
}

export function readOutputJSONFile(filePath: string): OutputJSON | null {
  try {
    // Read the file synchronously
    // const fileContent = await RNFS.readFile(filePath);

    // Parse the JSON content
    // const jsonData: OutputJSON = JSON.parse(fileContent);
    const jsonData = require('../../../constants/output.json');

    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
}

// Example usage
