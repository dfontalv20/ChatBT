import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';
import {
  connect as connectDevice,
  disconnect as disconnectDevice,
  isConnected,
  send,
  MsgListener,
  ConnListener,
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
type ConnectionStatus = 'CONNECTED' | 'FAILED' | 'LISTENING' | 'NO_CON';

export const OWN_DEVICE_ADDRESS = 'this';

const ChatContext = createContext({
  connectedDevice: null as Device | null,
  setConnectedDevice: (() => {}) as (device: Device | null) => void,
});

export const ChatProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  return (
    <ChatContext.Provider value={{connectedDevice, setConnectedDevice}}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const {connectedDevice, setConnectedDevice} = useContext(ChatContext);
  const [chat, setChat] = useState<Chat>([]);

  const lastMessage = MsgListener();
  const status = ConnListener() as ConnectionStatus;

  useEffect(() => {
    if (status !== 'CONNECTED') {
      setConnectedDevice(null);
    }
  }, [status, setConnectedDevice]);

  useEffect(() => {
    if (lastMessage === 'NO_MSG') {
      return;
    }
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
        device: {
          address: OWN_DEVICE_ADDRESS,
          name: 'Me',
        },
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

  const disconnect = async () => {
    try {
      await disconnectDevice();
      setConnectedDevice(null);
      setChat([]);
    } catch (error) {
      throw error;
    }
  };

  return {
    connect,
    connectedDevice,
    isConnected,
    disconnect,
    sendMessage,
    chat,
    status,
  };
};

export default useChat;
