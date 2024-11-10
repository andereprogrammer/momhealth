import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Tabs from './Tabs';
import {commonStyles} from '../styles/pogStyles';
import IssuesContainer from './IssuesContainer';
import RedFlagsContainer from './RedFlagsContainer';
import {Pallete} from '../../../theme/enum';

type Props = {
  issuesData: any;
  redFlagsData: any;
};

const TabContainer = ({issuesData, redFlagsData}: Props) => {
  const tabs = ['Common issues', 'Red flags'];
  const [selected, setSelected] = useState('Common issues');
  const handleSelection = (selectedTitle: string) => {
    setSelected(selectedTitle);
  };
  return (
    <>
      <View style={[commonStyles.flexRow, styles.container]}>
        {issuesData.length !== 0 && redFlagsData.length !== 0
          ? tabs.map(title => {
              return (
                <Tabs
                  onChange={handleSelection}
                  title={title}
                  selected={selected}
                />
              );
            })
          : null}
      </View>
      <View style={[commonStyles.innerSpacing]}>
        {selected === 'Common issues' ? (
          <IssuesContainer issues={issuesData} />
        ) : (
          <RedFlagsContainer redflagsData={redFlagsData} />
        )}
      </View>
    </>
  );
};

export default TabContainer;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Pallete.backgroundPink,
    overflow: 'hidden',
  },
});
