import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import HorizontalList from './HorizontalList';
import ThumbnailCard from './ThumbnailCard';
import {getColorCodesByCategory} from '../../constants';

type CardProps = {
  title: string;
  image_link: string;
  video_link: string;
  default_locked: boolean;
  category: string;
  type: string;
};
type CarouselProps = {
  data: CardProps[];
  listStyle: ViewStyle;
  containerStyle: ViewStyle;
  subHeading: string;
};

const Carousel = ({
  data,
  listStyle,
  containerStyle,
  subHeading = '',
}: CarouselProps) => {
  return (
    <HorizontalList
      data={data}
      listStyle={listStyle}
      containerStyle={containerStyle}
      renderItem={({
        title,
        image_link,
        video_link,
        default_locked,
        category,
        type,
      }) => (
        <ThumbnailCard
          title={title}
          image_link={image_link}
          video_link={video_link}
          default_locked={default_locked}
          category={category}
          type={type}
          colors={getColorCodesByCategory(category)}
        />
      )}
      title={subHeading}
    />
  );
};

export default Carousel;

const styles = StyleSheet.create({});
