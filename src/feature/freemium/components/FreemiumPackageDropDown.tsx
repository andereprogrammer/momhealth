import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
import s from '../../../styles/GlobalStyles';

type Props = {
  data: any;
  setSelectedPackage: (param: any) => void;
  selectedPackage: any;
};
const FreemiumPackageDropdownComponent = (props: Props) => {
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [presentData, setPresentData] = useState([]);

  useEffect(() => {
    if (props.data) {
      props.data.map(pack => {
        if (pack.id === props.selectedPackage?.id) {
          setSelected(pack.id);
        }
      });
    }
  }, [props.selectedPackage]);

  useEffect(() => {
    if (props.data) {
      let pData = props.data.map(pack => {
        let label = pack.tenure > 1 ? `${pack.tenure} months` : '1 month';
        return {value: pack.id, label: label};
      });
      console.log('pData', pData);
      setPresentData(pData);
    }
  }, [props.data]);

  useEffect(() => {
    if (selected) {
      setValue(selected.value);
      props.data.map(pack => {
        if (pack.id === selected.value) {
          props.setSelectedPackage(pack);
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
      style={[s.py1, s.px3, styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={presentData}
      maxHeight={verticalScale(140)}
      labelField="label"
      valueField="value"
      placeholder="Select duration"
      searchPlaceholder="Search..."
      value={selected}
      dropdownPosition="top"
      onChange={item => {
        setSelected(item);
      }}
      renderItem={renderItem}
    />
  );
};

export default FreemiumPackageDropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    // height: 36,
    backgroundColor: 'white',
    borderRadius: 8,
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
    textTransform: 'lowercase',
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
