import React from 'react';
import useChat, {ChatProvider} from './hooks/useChat';
import Chat from './Chat';
import Home from './Home';

const Internal = () => {
  const {connectedDevice, status, chat} = useChat();
  return connectedDevice || status === 'CONNECTED' || chat.length > 0 ? (
    <Chat />
  ) : (
    <Home />
  );
};

const App = () => (
  <ChatProvider>
    <Internal />
  </ChatProvider>
);

export default App;
