import theme from '../../../../theme/Theme';
import {Bubble, MessageImage, MessageText} from 'react-native-gifted-chat';
import React from 'react';
import {RenderMessageTextProps} from 'react-native-gifted-chat/lib/Bubble';

const RenderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: theme.colors.cardPrimaryBackground,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        },
        left: {
          backgroundColor: '#fff',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        },
      }}
      renderMessageText={props => {
        return (
          <MessageText
            {...props}
            textStyle={{
              left: {color: '#000', fontFamily: 'DMSans-Medium'}, // Does not change dynamically
              right: {
                color: theme.colors.ctaTextColor,
                fontFamily: 'DMSans-Medium',
              },
            }}
          />
        );
      }}
    />
  );
};

export default React.memo(RenderBubble);
