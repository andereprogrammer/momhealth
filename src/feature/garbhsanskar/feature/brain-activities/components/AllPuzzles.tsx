import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PuzzleComplete from './PuzzleComplete';
import PuzzleIncomplete from './PuzzleIncomplete';
import {fonts, Pallete} from '../../../../../theme/enum';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';
import ListEmptyComponent from './ListEmptyComponent';
import {AllPuzzlesProps, PuzzleListItem} from '../interface';

const ItemSeparator = () => <View style={styles.separatorStyle} />;

const PuzzleItem = ({
  item,
  lastIndex,
  showIcon,
  onPuzzlePress,
  loading,
}: PuzzleListItem) => {
  if (item !== null) {
    return (
      <TouchableOpacity
        onPress={() => onPuzzlePress(item, loading)}
        style={[styles.itemContainer, {marginBottom: lastIndex ? 12 : 0}]}>
        <View style={styles.subContainer}>
          {loading ? (
            <Shimmer width={80} height={48} />
          ) : (
            <Image
              source={{uri: item.image_link}}
              style={{height: 48, width: 80}}
            />
          )}
          <View style={styles.textContainer}>
            {loading ? (
              <Shimmer width={80} height={20} />
            ) : (
              <Text style={styles.heading}>{item?.name}</Text>
            )}
          </View>
        </View>
        {showIcon && loading ? (
          <Shimmer width={25} height={25} customBorderRadius={12.5} />
        ) : !loading && showIcon ? (
          item.complete ? (
            <PuzzleComplete />
          ) : item?.complete === false ? (
            <PuzzleIncomplete />
          ) : null
        ) : null}
      </TouchableOpacity>
    );
  }
};

const AllPuzzles = ({
  data,
  showIcon = true,
  onPuzzlePress,
  loading,
}: AllPuzzlesProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item, index}) => (
          <PuzzleItem
            item={item}
            lastIndex={index === data.length - 1}
            showIcon={showIcon}
            onPuzzlePress={onPuzzlePress}
            loading={loading}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        style={[
          styles.listStyle,
          {paddingHorizontal: data?.length === 0 ? 0 : 16},
        ]}
        getItemLayout={(_, index) => {
          return {length: 64, offset: 64 * index, index};
        }}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: Pallete.whiteBackground,
  },
  separatorStyle: {
    height: 12,
  },
  listStyle: {
    marginTop: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 0.35,
    borderColor: '#848484',
    borderRadius: 12,
    height: 64,
    backgroundColor: Pallete.whiteBackground,
    shadowOffset: {width: 0, height: 0.5},
    shadowColor: '#848484',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3.5,
  },
  iconContainer: {
    width: 26,
    height: 26,
    borderRadius: 12.5,
    backgroundColor: Pallete.Green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  textContainer: {
    paddingVertical: 12,
    marginLeft: 24,
  },
  heading: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 14,
    color: Pallete.darkBlack,
  },
  dayDetails: {
    fontFamily: fonts.PrimaryJakartaSemiBold,
    fontSize: 12,
    color: Pallete.darkBlack,
  },
});

export default AllPuzzles;
