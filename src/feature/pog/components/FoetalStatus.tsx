import {StyleSheet} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import InfoCardWithImage from './InfoCardWithImage';

type FoetalStatusProps = {
  statusHeading: string | undefined;
  statusDescription: string | undefined;
  imageSource: string;
};

const FoetalStatus = ({
  statusHeading,
  statusDescription,
  imageSource,
}: FoetalStatusProps) => {
  return (
    <>
      <InfoCardWithImage
        customContainerStyles={[
          styles.container,
          commonStyles.shadow,
          commonStyles.marginSpacing,
          commonStyles.innerSpacing,
        ]}
        imageHeight={100}
        title={statusHeading}
        description={statusDescription}
        customTextContainerStyles={styles.textContainer}
        isLocalImage={false}
        imageWidth={'27%'}
        image_link={imageSource}
        imageStyle={{alignSelf: 'center'}}
      />
    </>
  );
};

export default FoetalStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 8,
  },

  textContainer: {
    width: '72%',
    height: '100%',
    justifyContent: 'flex-start',
    gap: 5,
  },
});
