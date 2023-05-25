import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import useChat, {OWN_DEVICE_ADDRESS} from './hooks/useChat';
import MessageItem from './components/MessageItem';
import {Header} from './components';

const Chat: React.FC = () => {
  const {chat, connectedDevice, disconnect, sendMessage} = useChat();
  const [message, setMessage] = useState('');

  return (
    <>
      <Header>
        <Text>Connected with: {connectedDevice?.name ?? 'Unknown'}</Text>
        <TouchableOpacity onPress={disconnect}>
          <Text>Exit</Text>
        </TouchableOpacity>
      </Header>
      <View style={styles.mainView}>
        <FlatList
          scrollEnabled
          data={chat}
          renderItem={({item}) => (
            <MessageItem
              external={item.device?.address !== OWN_DEVICE_ADDRESS}
              message={item.text}
              date={item.date}
            />
          )}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
          />
          <TouchableOpacity
            disabled={message.length === 0}
            style={styles.sendButton}
            onPress={() => {
              sendMessage(message);
              setMessage('');
            }}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    paddingBottom: 100,
  },
  inputView: {
    position: 'absolute',
    paddingHorizontal: 32,
    bottom: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '80%',
  },
  sendButton: {
    backgroundColor: 'blue',
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
