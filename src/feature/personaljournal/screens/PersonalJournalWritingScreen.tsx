import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import useDataProvider from '../../../context-store/useDataProvider';
import {createJournal} from '../../../api/homeapis';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {};

const PersonalJournalWritingScreen = (props: Props) => {
  const {dateForJournal, setDateForJournal} = useDataProvider();
  let formatedDate = moment(new Date()).format('DD-MM-YYYY');
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    Keyboard.dismiss();
    let journal = {
      title: title,
      description: description,
      date: dateForJournal !== undefined ? dateForJournal : formatedDate,
    };
    createJournal(journal)
      .then(res => {
        setLoading(false);
        navigation.navigate('PersonalJournalHomeScreen');
      })
      .catch(e => {
        setLoading(false);

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
      }}>
      <View
        style={{
          height: 700,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TextInput
          placeholder="Title"
          style={styles.titleInput}
          placeholderTextColor={'#c3c3c3'}
          onChangeText={text => handleTitle(text)}
        />
        <TextInput
          multiline
          placeholder="Description"
          style={styles.descriptionInput}
          onChangeText={text => handleChangeDesc(text)}
        />
        <View style={styles.placeHolderView}></View>
        <View style={{width: '95%', bottom: height, position: 'absolute'}}>
          <MainCtaComponent
            onClick={() => createJournals()}
            active={true}
            loading={loading}
            style={{}}>
            <Text>Save</Text>
          </MainCtaComponent>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PersonalJournalWritingScreen;

const styles = StyleSheet.create({
  titleInput: {
    borderWidth: 0,
    width: '90%',
    height: '10%',
    padding: 20,
    fontSize: 16,
  },
  descriptionInput: {
    width: '90%',
    padding: 22,
    height: '50%',
  },
  placeHolderView: {
    // height: verticalScale(150),
  },
});
