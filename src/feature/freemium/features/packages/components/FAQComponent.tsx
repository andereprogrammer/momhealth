import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {Minus, Plus} from '../../../../../assets';
import {fonts} from '../../../../../theme/enum';

const FAQComponent = ({question, answer}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleFAQ = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFAQ} style={styles.questionContainer}>
        <View
          style={{
            width: '90%',
          }}>
          <Text style={styles.questionText}>{question}</Text>
        </View>
        <View
          style={{
            width: 20,
            height: 20,
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={isOpen ? Minus : Plus}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    width: '95%',
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 3,
    borderBottomWidth: 1,
    borderColor: '#c3c3c3',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  answerContainer: {
    marginTop: 10,
  },
  answerText: {
    fontSize: 14,
  },
});

export default FAQComponent;
