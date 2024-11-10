import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FilterTextCard from './FilterTextCard';

type PropsFilter = {
  packageType: any;
  onRemoveFilter: (filters: any) => void;
  onChangeFilter?: (cat: string) => void;
};
export type filterRender = {
  value: string;
  selected: boolean;
  id: string;
};

const RenderFilterCard = ({
  packageType,
  onRemoveFilter,
  onChangeFilter,
}: PropsFilter) => {
  const [filters, setFilters] = useState<any[]>(packageType);
  const onboardingRef = useRef(null);
  useEffect(() => {}, [filters]);
  useEffect(() => {
    setFilters(packageType);
  }, [packageType]);
  const handleRemove = (category: string) => {
    if (onChangeFilter) {
      onChangeFilter(category);
    }
    setFilters(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (category === it.value) {
          it.selected = false;
        }
      });
      return newVal;
    });
    onRemoveFilter(filters);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={filters}
        horizontal={true}
        style={styles.flatlistView}
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ListFooterComponent={<View style={styles.placeHolder} />}
        keyExtractor={item => item}
        ref={onboardingRef}
        renderItem={({item, index}: {item: any; index: number}) => (
          <>{item.selected ? <Text key={index}>{item}</Text> : <></>}</>
        )}
      />
    </View>
  );
};

export default RenderFilterCard;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', backgroundColor: '#fff'},
  flatlistView: {
    flex: 4,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
});
