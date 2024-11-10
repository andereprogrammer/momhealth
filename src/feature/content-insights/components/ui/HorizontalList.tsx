import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {fonts, Pallete} from '../../../../theme/enum';

type HorizontalListProps<T> = {
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  listStyle?: ViewStyle;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

const HorizontalList = <T extends unknown>({
  title,
  data,
  renderItem,
  listStyle,
  titleStyle,
  containerStyle,
}: HorizontalListProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
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
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: Pallete.black,
    paddingHorizontal: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default HorizontalList;
