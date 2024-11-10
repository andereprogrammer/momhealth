import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Minus, Plus} from '../../../assets';
import {fonts} from '../../../theme/enum';
import CommonIssue from './CommonIssue';
import ImageWithView from '../../../components/ImageWithView';
import {commonStyles} from '../styles/pogStyles';
import {
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
} from '../../../helpers/layoutHelper';

export interface issue {
  title: string;
  description: string;
  image_link: string;
}
type CommonIssueDropDownProps = {
  title: string;
  issues: issue[];
};

const CommonIssueDropDown = ({issues, title}: CommonIssueDropDownProps) => {
  const [isOpen, setIsOpen] = useState(true);
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
      <TouchableOpacity onPress={toggleFAQ} style={[styles.headingContainer]}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.contentContainer]}>
        <ScrollView style={{flexGrow: 1}}>
          {issues.map((issue, index) => {
            return <CommonIssue key={index} {...issue} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    paddingVertical: 90,
    position: 'absolute',
    top: 0,
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 4,
    height: 60,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  contentContainer: {
    paddingHorizontal: 10,
    minHeight: SCREEN_WIDTH_WINDOW * 1.5,
    flex: 1,
  },
  contentText: {
    fontSize: 14,
  },
});

export default CommonIssueDropDown;
