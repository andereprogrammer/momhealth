import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainCtaComponent from '../../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {Cross} from '../../../../../assets';
import {fonts, Pallete} from '../../../../../theme/enum';

type ConsultationFeedbackModalProps = {
  closeModal: () => void;
  onScheduleSubmit: () => void;
  query: string;
  onChange: (t: string) => void;
};

const ConsultationFeedbackModal = ({
  closeModal,
  onScheduleSubmit,
  query,
  onChange,
}: ConsultationFeedbackModalProps) => {
  return (
    <View style={styles.modal}>
      <View style={styles.header}>
        <Text style={styles.headingText}>
          Thank you for your request for a consultation!
        </Text>
        <TouchableOpacity style={styles.iconAspect} onPress={closeModal}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.imageAspect}
            source={Cross}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.bodyText}>
        If there's any additional information you'd like to share, please type
        it in the space below.
      </Text>
      <TextInput
        editable
        multiline
        placeholder="Please type your query"
        onChangeText={onChange}
        value={query}
        style={styles.inputText}
      />
      <View style={styles.btnText}>
        <MainCtaComponent active style={{}} onClick={onScheduleSubmit}>
          Submit
        </MainCtaComponent>
      </View>
      <Text style={styles.infoText}>
        One of our team members will get in touch with you within 24 hours to
        gather further details
      </Text>
    </View>
  );
};

export default ConsultationFeedbackModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Pallete.plainWhite,
    width: '88%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headingText: {
    width: '100%',
    alignSelf: 'flex-start',
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
  },
  imageAspect: {
    width: '100%',
    height: '100%',
  },
  iconAspect: {
    width: 25,
    height: 25,
  },
  bodyText: {
    fontFamily: fonts.PrimaryJakartaMedium,
    paddingVertical: 15,
    fontSize: 15,
    width: '100%',
  },
  inputText: {
    height: 100,
    borderWidth: 1,
    borderColor: '#c3c3c3',
    width: '100%',
    borderRadius: 10,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginVertical: 8,
  },
  btnText: {
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  infoText: {
    color: '#555',
    fontSize: 12,
  },
});
