import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TestimonialsCard from './TestimonialsCard';

type Props = {
  testimonials: any;
};

const TestimonialsList = ({testimonials}: Props) => {
  return (
    <FlatList
      data={testimonials}
      horizontal
      style={{
        flex: 1,
      }}
      contentContainerStyle={styles.spacing}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <TestimonialsCard
            source={item.image}
            name={item.name}
            score={item.score}
            description={item.description}
          />
        );
      }}
    />
  );
};

export default TestimonialsList;

const styles = StyleSheet.create({
  spacing: {
    paddingHorizontal: 24,
    gap: 18,
    marginBottom: 15,
    paddingBottom: 10,
  },
});
