import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {OmCard, OmIcon} from '../../../assets';
import {fonts} from '../../../theme/enum';
import LockIcon from './LockIcon';

type Props = {
  name: string;
  iconImage: any;
  nav: string;
  locked: boolean;
};

const GarbhSanskarTile = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const takeMeTo = () => {
    if (!props.locked) {
      navigation.navigate(props.nav);
    }
  };
  return (
    <TouchableOpacity
      onPress={takeMeTo}
      style={{
        width: 150,
        height: 165,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 15,
        shadowOffset: {width: 4, height: 6},
        shadowColor: '#c3c3c3',
        shadowOpacity: 0.7,
        shadowRadius: 10,
        position: 'relative',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <LinearGradient
          colors={['#FAD783', '#EFB837']}
          useAngle={true}
          angle={45}
          start={{
            x: 1,
            y: 0.5,
          }}
          end={{
            x: 1,
            y: 0.9,
          }}
          style={{
            width: '100%',
            height: '75%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            justifyContent: props.locked ? 'flex-start' : 'center',
            gap: props.locked ? 10 : 0,
          }}>
          {props.locked && (
            <View
              style={{
                zIndex: 10,
                backgroundColor: '#F17200',
                paddingHorizontal: 5,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                width: '85%',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
              }}>
              <Text
                style={{
                  fontFamily: fonts.PrimaryJakartaExtraBold,
                  fontSize: 14,
                  color: '#fff',
                }}>
                Coming soon
              </Text>
            </View>
          )}
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={props.iconImage}
            defaultSource={OmCard}
            style={{
              width: props.locked ? '50%' : '80%',
              height: props.locked ? '50%' : '80%',
            }}
          />
        </LinearGradient>
        <Text
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.PrimaryJakartaBold,
            fontSize: 15,
            textAlign: 'center',
            paddingTop: 10,
            alignSelf: 'center',
          }}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GarbhSanskarTile;

const styles = StyleSheet.create({
  tile: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
