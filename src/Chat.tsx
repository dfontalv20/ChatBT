import React from 'react';
import {FlatList} from 'react-native';
import useChat from './hooks/useChat';
import MessageItem from './components/MessageItem';

const Chat: React.FC = () => {
  const {chat} = useChat();

  return (
    <FlatList
      data={chat}
      renderItem={({item}) => (
        <MessageItem
          external={Boolean(item.device)}
          message={item.text}
          owner={item.device ? item.device?.name ?? '' : 'Me'}
        />
      )}
    />
  );
};

export default Chat;
