import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import {syptomslist} from '../../../components/MainContainer/SyptomsListComponent/listOfSyptoms';
import ItemCardComponent from '../../../components/MainContainer/SyptomsListComponent/ItemCardComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {getSyptoms, setupPregnant} from '../../../api/userCreationHelper';
import useDataProvider from '../../../context-store/useDataProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ProgressBarComponent from '../../../components/MainContainer/ProgressBarComponent';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {items} from '@sentry/react-native/dist/js/utils/envelope';
import {fonts} from '../../../theme/enum';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Item = {
  key: number;
  syptom: string;
  selected: boolean;
};
const NewMomDeliveryDetailsScreen: React.FC = () => {
  const {newMomDetails, setNewMomDetails} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [babies, setBabies] = useState([]);

  const [completed, setCompleted] = useState(true);

  const [skip, setCanSkip] = useState(true);

  console.log('newMomDetails', newMomDetails);

  const deliveryType = ['Vaginal', 'Cesarean'];
  const noOfBabies = [
    {display: 'One', value: 1},
    {display: 'Twins', value: 2},
    {display: 'Triplets', value: 3},
  ];

  const babyGenders = ['Male', 'Female'];

  let syptomsListLocal = syptomslist;
  let [selectedItems, setSelectedItems] = useState(syptomsListLocal);

  useEffect(() => {
    validateComplete();
    changeSkip();
  }, [newMomDetails]);

  const changeSkip = () => {
    let canSkip = true;
    if (babies.length === 0) {
      canSkip = true;
    } else {
      canSkip = false;
    }
    if (newMomDetails.deliveryType === undefined) {
      canSkip = canSkip && true;
    } else {
      canSkip = false;
    }
    setCanSkip(canSkip);
  };

  const setDeliveryType = (type: string) => {
    setNewMomDetails({...newMomDetails, deliveryType: type});
    console.log('deliveryType', newMomDetails);
  };
  const setNoOfBabies = (no: number) => {
    if (babies.length < no) {
      setBabies(prevState => {
        return prevState.concat(Array(no - babies.length));
      });
    } else if (babies.length > no) {
      setBabies(prevState => {
        return prevState.slice(0, no);
      });
    }
    setNewMomDetails({...newMomDetails, noOfBabies: no, babies: babies});
    console.log('setNoOfBabies', newMomDetails);
  };

  const setBabyDetailOfIndex = (index: number, type: string, value: any) => {
    console.log(index, ' type', type, 'value', value);
    setBabies(prevState => {
      let baby = prevState.at(index);
      if (baby === undefined) {
        baby = {};
      }
      baby[type] = value;
      prevState[index] = baby;
      console.log('babies', prevState);
      return Array.from(prevState);
    });
    setNewMomDetails({...newMomDetails, babies: babies});
  };
  const setUpProfile = (item: Item) => {
    setSelectedItems(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (item.key === it.key) {
          it.selected = !it.selected;
        }
      });

      return newVal;
    });
  };

  const validateComplete = () => {
    for (let babyIndex = 0; babyIndex < newMomDetails.noOfBabies; babyIndex++) {
      if (newMomDetails.babies[babyIndex] === undefined) {
        setCompleted(false);
        return;
      } else {
        if (newMomDetails.babies[babyIndex].gender === undefined) {
          setCompleted(false);
          return;
        }
        if (newMomDetails.babies[babyIndex].weight === undefined) {
          setCompleted(false);
          return;
        }
      }
    }
    setCompleted(true);
  };
  const finishDeliveryDetails = () => {
    validateComplete();
    console.log('Finish Clicked', completed);
    if (completed) {
      navigation.navigate('SyptomsSelectionScreen');
    }
  };
  return (
    <SafeAreaView style={styles.default}>
      <BackHeader title="" />
      <ProgressBarComponent tile1="100%" tile2="100%" tile3="0%" />
      <ScrollView>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            paddingHorizontal: horizontalScale(10),
            marginVertical: Platform.OS === 'android' ? verticalScale(20) : 0,
            // flexGrow: 1,
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>What type of delivery occurred?</Text>
          </View>
          <View style={styles.wordCloud}>
            {deliveryType.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setDeliveryType(item)}>
                  <ItemCardComponent
                    style={
                      newMomDetails.deliveryType === item && styles.cardSeletecd
                    }
                    key={index}
                    syptom={item}
                    selected={newMomDetails.deliveryType === item}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              {' '}
              How many babies did you give birth to?
            </Text>
          </View>
          <View style={styles.wordCloud}>
            {noOfBabies.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setNoOfBabies(item.value)}>
                  <ItemCardComponent
                    style={
                      newMomDetails.noOfBabies === item.value &&
                      styles.cardSeletecd
                    }
                    key={index}
                    syptom={item.display}
                    selected={newMomDetails.noOfBabies === item.value}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          {Array.from(Array(newMomDetails.noOfBabies).keys()).map(
            (value, i) => {
              return (
                <React.Fragment key={i}>
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                      {' '}
                      What is the gender of your baby
                      {newMomDetails.noOfBabies > 1 ? ` #${value + 1}` : ''}?
                    </Text>
                  </View>

                  <View style={styles.wordCloud}>
                    {babyGenders.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            setBabyDetailOfIndex(value, 'gender', item)
                          }>
                          <ItemCardComponent
                            style={
                              babies[value]?.gender === item &&
                              styles.cardSeletecd
                            }
                            key={index}
                            syptom={item}
                            selected={babies[value]?.gender === item}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                      {' '}
                      What was the birth weight of your baby
                      {newMomDetails.noOfBabies > 1 ? ` #${value + 1}` : ''}?
                    </Text>
                  </View>
                  <View style={styles.wordCloud}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(250, 242, 255, 1)',
                      }}
                      outlineStyle={{borderRadius: 20, borderWidth: 0}}
                      value={babies[value]?.weight}
                      onChangeText={e =>
                        setBabyDetailOfIndex(value, 'weight', e)
                      }
                      keyboardType={'decimal-pad'}
                      right={<TextInput.Affix text="Kgs" />}
                    />
                  </View>
                </React.Fragment>
              );
            },
          )}
          <View style={{marginBottom: '10%'}}>
            <Text>{''}</Text>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            width: '90%',
            marginRight: horizontalScale(20),
            marginBottom: horizontalScale(20),
          }}>
          <MainCtaComponent
            onClick={() => finishDeliveryDetails()}
            active={completed}
            style={styles.cta}>
            {skip ? 'Skip for now' : 'Continue'}
          </MainCtaComponent>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cta: {
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    position: 'absolute',
    marginLeft: verticalScale(10),
  },
  cardSeletecd: {
    backgroundColor: 'rgba(255, 242, 209, 1)',
    borderColor: 'rgba(255, 222, 145, 1)',
    borderWidth: 1,
    color: 'rgba(39, 29, 42, 1)',
  },
  default: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(10),
    height: '100%',
    position: 'relative',
  },
  wordCloud: {
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10,
    paddingVertical: 2,
  },
  shortText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    justifyContent: 'flex-start',
    color: '#000',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  mainText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 0,
    color: '#000',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    color: '#000',
    paddingHorizontal: horizontalScale(10),
  },
});

export default NewMomDeliveryDetailsScreen;
