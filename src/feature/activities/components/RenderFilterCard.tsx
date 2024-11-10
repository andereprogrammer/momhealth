import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FilterTextCard from './FilterTextCard';

type PropsFilter = {
  sessionCategory: filterRender[];
  onRemoveFilter: (filters: any) => void;
  onChangeFilter?: (cat: string) => void;
};
export type filterRender = {
  value: string;
  selected: boolean;
  id: string;
  display: string;
};

const RenderFilterCard = ({
  sessionCategory,
  onRemoveFilter,
  onChangeFilter,
}: PropsFilter) => {
  const [filters, setFilters] = useState<filterRender[]>(sessionCategory);
  const onboardingRef = useRef(null);
  useEffect(() => {}, [filters]);
  useEffect(() => {
    setFilters(sessionCategory);
  }, [sessionCategory]);
  const handleRemove = (category: string) => {
    if (onChangeFilter) {
      onChangeFilter(category);
    }
    setFilters(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (category === it.display) {
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
        keyExtractor={item => item.value}
        ref={onboardingRef}
        renderItem={({item}: {item: filterRender}) => (
          <>
            {item.selected ? (
              <FilterTextCard
                key={item.id}
                value={item.display}
                handleRemove={handleRemove}
              />
            ) : (
              <></>
            )}
          </>
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
