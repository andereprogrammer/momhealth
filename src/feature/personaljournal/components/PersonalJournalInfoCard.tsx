import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {BackBtn, PersonalFiller} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {getHomeScreenInfo} from '../../../api/homeapis';

type Props = {};

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  blood_group: string;
  doctor: null | any; // Replace 'any' with the actual type of 'doctor' if needed
  profile_image: null | any; // Replace 'any' with the actual type of 'profile_image' if needed
};

type CareTeam = {
  service_providers: any[]; // Replace 'any' with the actual type of 'service_providers' if needed
};

type PregnancyStage = {
  trimester: number;
  pregnancy_days: number;
  desc: string;
  avg_weight: number;
  avg_height: number;
};

type PatientData = {
  patient: Patient;
  care_team: CareTeam;
  pregnancy_stage: PregnancyStage;
  articles: null | any; // Replace 'any' with the actual type of 'articles' if needed
  patient_packages: any[]; // Replace 'any' with the actual type of 'patient_packages' if needed
};

const PersonalJournalInfoCard = (props: Props) => {
  const {width} = useWindowDimensions();

  const [data, setData] = useState<PatientData>();

  useEffect(() => {
    getHomeScreenInfo()
      .then(res => {
        if (res.data) {
          console.log(res.data);
          setData(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View
      style={{
        width: width,
        height: '16%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2A0C5F', '#7C30B2', '#A65ED8']}
        style={styles.mainContainerView}>
        <View style={styles.textView}>
          <Text style={styles.textViewCard}>
            Good morning {data?.patient?.name}
          </Text>
          <Text style={styles.infoTextView}>
            Well done on being regular with your journaling this month!
          </Text>
        </View>
        <View style={styles.imageView}>
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            source={PersonalFiller}
            style={styles.mainImageAspect}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default PersonalJournalInfoCard;

const styles = StyleSheet.create({
  mainContainerView: {
    width: '95%',
    borderRadius: horizontalScale(20),
    elevation: 10,
    shadowColor: '#c3c3c3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: horizontalScale(10),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  textView: {
    width: '55%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 3,
  },
  textViewCard: {
    fontFamily: 'DMSans-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: '#fff',
    padding: horizontalScale(4),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoTextView: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    textAlign: 'left',
    color: '#fff',
    padding: horizontalScale(3),
    marginLeft: verticalScale(5),
  },
  imageWrapperView: {
    width: '10%',
    height: '55%',
    justifyContent: 'center',
    backgroundColor: 'rgba(92, 25, 141, 1)',
    alignItems: 'center',
    borderRadius: horizontalScale(10),

    transform: [{rotate: '-180deg'}],
  },
  imageAspect: {width: '100%', height: '40%', tintColor: '#fff'},
  imageView: {
    width: '45%',
    height: '100%',
  },
  mainImageAspect: {width: '100%', height: '100%'},
});
