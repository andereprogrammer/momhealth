import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {useLinkTo, useNavigation} from '@react-navigation/native';
import NotificationTimeText from './NotificationTimeText';
import NotificationCtaBtn from './NotificationCtaBtn';
import {postMarkAsRead} from '../../../api/homeapis';
import s from '../../../styles/GlobalStyles';
import getDefaultShadow from '../../../styles/ShadowPresets';

type Action = {
  display: string;
  action_type: string;
  navigation_link: string;
  cta: boolean;
};

type NotificationCardProps = {
  header: string;
  message: string;
  ctas: Action[] | null;
  iconSource: string;
  status: 'NOT_READ' | 'READ';
  id: string;
  created: string;
};

const NotificationCard = ({
  header = 'Everheal',
  message = '',
  ctas,
  iconSource,
  status,
  created,
  id = '',
}: NotificationCardProps) => {
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const [liveStatus, setLiveStatus] = useState(status);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );

  const iconWidth = windowWidth * 0.12;
  const rightContainerWidth = windowWidth - iconWidth - 50;

  const markAsRead = () => {
    postMarkAsRead(id);
    setLiveStatus('READ');
  };

  const handleLink = (action: Action) => {
    setLiveStatus('READ');
    if (action.action_type === 'LINK') {
      console.log('LINK############', action.navigation_link);
      Linking.openURL(action.navigation_link);
    } else {
      navigation.navigate(action.navigation_link);
    }
  };

  return (
    <TouchableOpacity onPress={markAsRead}>
      <View
        id="MainContainer"
        style={[
          liveStatus === 'NOT_READ' ? s.bgPrimaryLightest : s.bgGray100,
          s.flex,
          s.flexRow,
          s.my1,
          s.mx2,
          s.roundedXl,
          s.overflowClip,
        ]}>
        {liveStatus === 'NOT_READ' ? (
          <View
            id={'ReadUnreadDot'}
            style={[
              s.positionAbsolute,
              s.z10,
              s.bgPrimary,
              s.rounded3xl,
              s.border3,
              s.borderPrimaryLightest,
              {width: 14, height: 14, bottom: 8, left: 8},
            ]}
          />
        ) : null}
        <View id="IconContainer" style={[s.flex, s.justifyStart, s.px2, s.py3]}>
          <Image
            style={[s.aspect1, s.roundedLg, {width: iconWidth}]}
            resizeMode="contain"
            resizeMethod="resize"
            source={
              iconSource !== ''
                ? {uri: iconSource}
                : {
                    uri: 'https://website.dev.everheal.com/icon.png?0dcd866a7e946014',
                  }
            }
          />
        </View>
        <View
          id="RightContainer"
          style={[
            s.grow,
            s.flex,
            s.flexCol,
            s.itemsStart,
            s.pr2,
            s.pl2,
            s.py2,
          ]}>
          <View
            style={[
              s.flex,
              s.flexRow,
              s.justifyBetween,
              s.itemsCenter,
              {width: rightContainerWidth},
            ]}>
            <View id="NotificationHeader" style={[]}>
              <Text
                style={[
                  s.flex1,
                  s.textBase,
                  liveStatus === 'NOT_READ' ? s.fontBold : s.fontNormal,
                  {width: rightContainerWidth - iconWidth - 10},
                ]}>
                {header}
              </Text>
            </View>
            <View style={[s.selfEnd, s.positionAbsolute, {top: 0, right: 0}]}>
              <NotificationTimeText
                timeInUTC={created}
                styles={[s.textSlate500]}
              />
            </View>
          </View>
          <View id="NotificationContent" style={[{width: rightContainerWidth}]}>
            <Text
              style={[
                s.textSM,
                s.textGray700,
                liveStatus === 'NOT_READ' ? s.fontBold : s.fontNormal,
              ]}>
              {message}
            </Text>
          </View>
          {ctas && (
            <View
              id="CtaContainer"
              style={[
                s.grow,
                s.selfEnd,
                s.flex,
                s.flexRow,
                s.justifyEnd,
                s.overflowClip,
                s.gap2,
                s.mt1,
              ]}>
              {ctas.map(action => {
                return (
                  <NotificationCtaBtn
                    onClick={() => handleLink(action)}
                    ctaText={action.display}
                    buttonStyles={[
                      action.cta ? s.bgPrimary : s.bgSecondary,
                      s.roundedMd,
                      s.px3,
                      s.py2,
                    ]}
                    textStyles={[
                      action.cta ? s.textWhite : s.textBlack,
                      action.cta ? s.fontBold : s.fontMedium,
                    ]}
                  />
                );
              })}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
