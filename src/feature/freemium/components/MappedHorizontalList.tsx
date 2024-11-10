import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {fonts} from '../../../theme/enum';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';

type HorizontalListProps<T> = {
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  listStyle?: ViewStyle;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

const MappedHorizontalList = <T extends unknown>({
  title,
  data,
  renderItem,
  listStyle,
  titleStyle,
  containerStyle,
}: HorizontalListProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <HeadingFontComponent style={[styles.title, titleStyle]}>
        {title}
      </HeadingFontComponent>
      <FlatList
        horizontal
        data={data}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.list, listStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  list: {
    paddingHorizontal: 12,
    marginVertical: 10,
  },
});

export default MappedHorizontalList;
