import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  enable,
  discover,
  discoverable,
  ConnListener,
  DvcListener,
  connect,
  send,
  MsgListener,
  disconnect,
  isConnected,
} from 'react-native-bluetooth-message';

function renderDeviceList() {
  let dvcList: String[] = [];
  return Object.entries(DvcListener()).map(([_, dvc]) => {
    return Object.entries(dvc).map(([name, addr]) => {
      if (dvcList.includes(name)) {
        return <></>;
      } else {
        dvcList.push(name);
      }
      return (
        <TouchableOpacity
          onPress={() => {
            connect(addr);
          }}
          style={{
            backgroundColor: '#212121',
            marginVertical: 8,
            marginHorizontal: 10,
            padding: 20,
            borderRadius: 10,
          }}
          key={addr}>
          <Text>{name}</Text>
        </TouchableOpacity>
      );
    });
  });
}

export default function App() {
  const [msgTxt, setMsgTxt] = useState<string>('');
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.alignCenter}>
          <Text style={styles.heading}>Bluetooth Message Example App</Text>
          <Text>Connection Status : {ConnListener()}</Text>
          <View>
            <Button
              title="Enable"
              onPress={async () => {
                enable().then(btState => {
                  console.info(btState);
                });
              }}
            />
            <Button
              title="discoverable"
              onPress={async () => {
                discoverable(15).then(discoverability => {
                  console.info(discoverability);
                });
              }}
            />
            <Button
              title="discover"
              onPress={async () => {
                discover().catch(err => {
                  console.log('ok', err);
                });
              }}
            />
          </View>
        </View>
        {renderDeviceList()}
        <View>
          <TextInput
            placeholder="Type your message"
            onChangeText={(newText: any) => setMsgTxt(newText)}
            value={msgTxt}
          />
          <Button
            title="Send"
            onPress={() => {
              send(msgTxt);
            }}
          />
        </View>
        <Text>{MsgListener()}</Text>
        <Button
          title="Disconnect"
          onPress={() => {
            disconnect();
          }}
        />
        <Button
          title="is Connected"
          onPress={() => {
            isConnected().then(isCon => {
              console.log(isCon);
            });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
