import {useState, useEffect} from 'react';
import {
  connect as connectDevice,
  disconnect,
  isConnected,
  send,
  MsgListener,
} from 'react-native-bluetooth-message';

export type Device = {
  name: string;
  address: string;
};
export type Message = {
  text: string;
  device: Device | null;
  date: Date;
};
export type Chat = Message[];

const useChat = () => {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [chat, setChat] = useState<Chat>([]);

  const lastMessage = MsgListener();

  useEffect(() => {
    setChat(prev => [
      ...prev,
      {
        date: new Date(),
        device: connectedDevice,
        text: lastMessage,
      },
    ]);
  }, [lastMessage, connectedDevice]);

  const sendMessage = async (message: string) => {
    await send(message);
    setChat(prev => [
      ...prev,
      {
        date: new Date(),
        device: null,
        text: message,
      },
    ]);
  };

  const connect = async (device: Device) => {
    try {
      await connectDevice(device.address);
      setConnectedDevice(device);
    } catch (error) {
      setConnectedDevice(null);
      throw error;
    }
  };

  return {connect, isConnected, disconnect, sendMessage, chat};
};

export default useChat;
