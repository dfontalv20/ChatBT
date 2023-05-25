/* eslint-disable react-native/no-inline-styles */
import {DateTime} from 'luxon';
import React from 'react';
import {
  ViewProps,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props extends ViewProps {
  message: string;
  date: Date;
  external: boolean;
}

const MessageItem: React.FC<Props> = ({
  message,
  date,
  style,
  external,
  ...props
}) => {
  let messageStyle = external ? styles.externalMessage : styles.ownMessage;
  let contentStyle = external ? styles.externalContent : styles.ownContent;
  messageStyle = {...messageStyle, ...(style as Record<string, unknown>)};
  return (
    <View {...props} style={messageStyle}>
      <View style={contentStyle}>
        <Text style={{fontSize: 24}}>{message}</Text>
        <Text>{DateTime.fromJSDate(date).toFormat('h:mm a')}</Text>
      </View>
    </View>
  );
};

const messageStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  marginVertical: 8,
  marginHorizontal: 16,
};

const contentStyle: StyleProp<ViewStyle> = {
  maxWidth: '50%',
  padding: 8,
};

const styles = StyleSheet.create({
  ownMessage: {
    ...messageStyle,
    justifyContent: 'flex-end',
  },
  externalMessage: {
    ...messageStyle,
    justifyContent: 'flex-start',
  },
  ownContent: {
    ...contentStyle,
    backgroundColor: 'grey',
    color: 'white',
  },
  externalContent: {
    ...contentStyle,
    backgroundColor: 'blue',
    color: 'white',
  },
});

export default MessageItem;
