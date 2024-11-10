import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import useDataProvider from '../../../context-store/useDataProvider';
import {createJournal} from '../../../api/homeapis';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../profile/components/CustomHeader';

type Props = {
  title: string;
  description: string;
};

const PersonalJournalView = (props: Props) => {
  const {dateForJournal, setDateForJournal} = useDataProvider();
  let formatedDate = moment(new Date()).format('DD-MM-YYYY');
  const navigation = useNavigation<NavigationProp<any, any>>();

  const [height, setHeight] = useState(0);
  const keyboardDidShowF = event => {
    setHeight(event.endCoordinates.height - 100);
  };
  const keyboardDidHideF = event => {
    setHeight(0);
  };
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  const createJournals = () => {
    Keyboard.dismiss();
    let journal = {
      title: title,
      description: description,
      date: dateForJournal !== undefined ? dateForJournal : formatedDate,
    };
    createJournal(journal)
      .then(res => {
        navigation.navigate('PersonalJournalHomeScreen');
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  const handleTitle = (titleJ: string) => {
    setTitle(titleJ);
  };
  const handleChangeDesc = (descJ: string) => {
    console.log(descJ);

    setDescription(descJ);
  };

  useEffect(() => {
    let keyboardDidshow = Keyboard.addListener('keyboardDidShow', e =>
      keyboardDidShowF(e),
    );
    let keyboardDidHide = Keyboard.addListener('keyboardDidHide', e =>
      keyboardDidHideF(e),
    );
  }, []);
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: '#FAF2FF',
        position: 'relative',
        paddingVertical: 80,
      }}>
      <View
        style={{
          height: 700,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            paddingHorizontal: 50,
          }}>
          <Text>Title</Text>
          <TextInput
            placeholder="Title"
            style={styles.titleInput}
            placeholderTextColor={'#c3c3c3'}
            onChangeText={text => handleTitle(text)}
            value={props.title}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            paddingHorizontal: 50,
          }}>
          <Text>Description</Text>
          <TextInput
            multiline
            placeholder="Description"
            style={styles.descriptionInput}
            onChangeText={text => handleChangeDesc(text)}
            value={props.description}
          />
        </View>

        <View style={styles.placeHolderView}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PersonalJournalView;

const styles = StyleSheet.create({
  titleInput: {
    borderWidth: 0,
    width: '90%',
    height: '10%',
    paddingHorizontal: 5,
    paddingVertical: verticalScale(20),
    fontSize: 16,
  },
  descriptionInput: {
    width: '90%',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    height: '50%',
  },
  placeHolderView: {
    // height: verticalScale(150),
  },
});
