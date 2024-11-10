import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
type Props = {
  data: any;
  setSelectedLength: (param: any) => void;
  selectedLength: any;
};
const LengthSelector = (props: Props) => {
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [presentLength, setPresentLength] = useState([]);

  useEffect(() => {
    if (props.data) {
      props.data.map(pack => {
        if (pack.id === props.selectedPackage?.id) {
          setSelected(pack.id);
        }
      });
    }
  }, [props.selectedLength]);

  useEffect(() => {
    if (selected) {
      setValue(selected.value);
      props.data.map(pack => {
        if (pack.id === selected.value) {
          props.setSelectedLength(pack);
        }
      });
    }
  }, [selected]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={presentLength}
      maxHeight={verticalScale(140)}
      labelField="label"
      valueField="value"
      placeholder="Select duration"
      searchPlaceholder="Search..."
      value={selected}
      onChange={item => {
        setSelected(item);
      }}
      renderItem={renderItem}
    />
  );
};

export default LengthSelector;

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    width: '100%',
    fontFamily: fonts.SecondaryDMSansBold,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 12,
    // fontWeight: '800',
    fontFamily: fonts.SecondaryDMSansBold,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
