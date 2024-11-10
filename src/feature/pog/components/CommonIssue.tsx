import {StyleSheet} from 'react-native';
import React from 'react';
import {issue} from './CommonIssueDropDown';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import {Pallete} from '../../../theme/enum';
import InfoCardWithImage from './InfoCardWithImage';

interface CommonIssueProps extends issue {}

const CommonIssue = ({title, description, image_link}: CommonIssueProps) => {
  return (
    <>
      {description !== '' ? (
        <InfoCardWithImage
          customTextContainerStyles={styles.textContainer}
          customContainerStyles={styles.container}
          title={title}
          description={description}
          imageStyle={styles.customImageStyle}
          image_link={image_link}
          isLocalImage={false}
          imageWidth={'20%'}
          imageHeight={SCREEN_WIDTH_WINDOW / 8}
        />
      ) : null}
    </>
  );
};

export default CommonIssue;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
  textContainer: {
    width: '73%',
    height: '100%',
    justifyContent: 'flex-start',
    gap: 5,
  },
  customImageStyle: {
    backgroundColor: Pallete.backgroundPink,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
