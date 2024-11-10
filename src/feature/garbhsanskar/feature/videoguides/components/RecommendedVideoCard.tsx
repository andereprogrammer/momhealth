import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VideoInfo from './VideoInfo';
import VideoCard from '../../../../../components/VideoCard';

type Props = {
  imageSource: any;
  url: string;
  category: string;
  title: string;
  author: string;
};

const RecommendedVideoCard = ({
  imageSource,
  url,
  category,
  title,
  author,
}: Props) => {
  return (
    <View>
      <VideoCard imageSource={imageSource} url={url} category={category} />
      <VideoInfo title={title} author={author} />
    </View>
  );
};

export default RecommendedVideoCard;

const styles = StyleSheet.create({});
