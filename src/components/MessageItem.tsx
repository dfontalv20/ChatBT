import React from 'react';
import {ViewProps, View, Text, StyleSheet} from 'react-native';

interface Props extends ViewProps {
  message: string;
  owner: string;
  external: boolean;
}

const MessageItem: React.FC<Props> = ({
  message,
  owner,
  style,
  external,
  ...props
}) => {
  let messageStyle = external ? styles.externalMessage : styles.ownMessage;
  messageStyle = {...messageStyle, ...(style as Record<string, unknown>)};
  return (
    <View {...props} style={messageStyle}>
      <Text style={styles.owner}>{owner}</Text>
      <Text style={styles.content}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ownMessage: {
    backgroundColor: 'grey',
    color: 'white',
    maxWidth: '80%',
    marginVertical: 8,
  },
  externalMessage: {
    backgroundColor: 'blue',
    color: 'white',
    maxWidth: '80%',
    marginVertical: 8,
  },
  content: {
    fontSize: 16,
  },
  owner: {
    fontSize: 4,
  },
});

export default MessageItem;
