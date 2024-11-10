import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DietPackagePAge,
  GarbhIconPackagePAge,
  SupportIconPackagePAge,
  UnlimitedIcon,
  YogaIconPackagePAge,
} from '../../../../../assets';
import {fonts} from '../../../../../theme/enum';

type BannerProps = {
  bannerbenefit: string;
};

const BannerBenefits = ({bannerbenefit}: BannerProps) => {
  let imageIcon = [
    {
      'Personalised live yoga classes': YogaIconPackagePAge,
      'Garbh Sanskar': GarbhIconPackagePAge,
      '24*7 access to recorded content and self-help tools':
        SupportIconPackagePAge,
      'Customized diet plan': DietPackagePAge,
      'Unlimited 1 on 1 access to care team 7 days a week': UnlimitedIcon,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={imageIcon[0][bannerbenefit]}
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.imageAspect}
        />
      </View>

      <Text style={styles.benefitText}>{bannerbenefit}</Text>
    </View>
  );
};

export default BannerBenefits;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 20,
    marginVertical: 8,
  },
  card: {
    width: '15%',
    height: 30,
  },
  benefitText: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 16,
    color: '#60008E',
    width: '50%',
  },
  imageAspect: {
    width: '100%',
    height: '100%',
  },
});
