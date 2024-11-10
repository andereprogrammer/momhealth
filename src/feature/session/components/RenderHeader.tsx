import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {BackBtn, Filter} from '../../../assets';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  showFilter: () => void;
  showModal: (show: boolean) => void;
  typeName: string;
  visibility: boolean;
};

const RenderHeader = forwardRef((props: Props, ref) => {
  const {showFilter, showModal, typeName, visibility} = props;

  const heading =  typeName!=='Unbooked' ? typeName + ' sessions' : 'Schedule a session';

  const [show, setShow] = useState(visibility);
  useImperativeHandle(ref, () => ({
    hideModal(e: boolean) {
      setShow(!e);
    },
  }));
  useEffect(() => {}, [visibility, typeName]);

  const handlePress = () => {
    setShow(!show);
    showModal(!visibility);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: horizontalScale(20),
        position: 'relative',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 16,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: fonts.PrimaryJakartaBold,
          }}>
          {heading}
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            width: '20%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: '60%',
              height: '50%',
              transform: [{rotate: '270deg'}],
            }}
            resizeMethod="resize"
            resizeMode="contain"
            source={BackBtn}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={showFilter}
        style={{
          width: '25%',
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: '30%',
            height: '35%',
            transform: [{rotate: '0deg'}],
          }}
          resizeMethod="resize"
          resizeMode="contain"
          source={Filter}
        />
      </TouchableOpacity>
    </View>
  );
});

export default RenderHeader;

const styles = StyleSheet.create({});
