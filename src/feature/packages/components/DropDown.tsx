import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {verticalScale} from '../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../theme/enum';
import {Tick} from '../../../assets';
type Props = {
  data: any;
  passData: (param: string) => void;
  refresh: number;
};
const DropdownComponent = (props: Props) => {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(props.data[0].label);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    props.data.map(value => {
      if (value.is_default) {
        setSelected(value);
        setLabel(value.label);
        props.passData(value.value);
      }
    });
    console.log('object');
  }, [props.refresh]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <View
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Tick}
              resizeMethod="resize"
              resizeMode="contain"
              tintColor={Pallete.Eggplant}
              style={{
                width: '80%',
                height: '80%',
              }}
            />
          </View>
        )}
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
      containerStyle={{
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#c3c3c3',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowRadius: 6,
        shadowOpacity: 0.4,
      }}
      itemContainerStyle={{
        borderRadius: 10,
      }}
      data={props.data}
      maxHeight={verticalScale(140)}
      labelField="label"
      valueField="value"
      placeholder="Select duration"
      searchPlaceholder="Search..."
      value={selected}
      onChange={item => {
        setValue(item.value);
        props.passData(item.value);
        setSelected(item.value);
        setLabel(item.label);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

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
