import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import useDevices from './hooks/useDevices';
import {Header} from './components';
import DeviceItem from './components/DeviceItem';
import {DateTime, Interval} from 'luxon';
import useChat from './hooks/useChat';

export const Home = () => {
  const {devices, scan, enable, discoverable, discoverableUntil} = useDevices();
  const {connect, status} = useChat();
  const [discoverableSeconds, setDiscoverableSeconds] = useState<number>(0);

  useEffect(() => {
    enable();
    const interval = setInterval(() => scan().catch(() => {}), 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = discoverableUntil
        ? Interval.fromDateTimes(
            DateTime.now(),
            DateTime.fromJSDate(discoverableUntil),
          ).length('seconds')
        : 0;
      setDiscoverableSeconds(!Number.isNaN(seconds) ? seconds : -1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [discoverableUntil]);

  return (
    <SafeAreaView>
      <Header>
        <Text>Status: {status}</Text>
        <TouchableOpacity
          disabled={discoverableSeconds > 0}
          onPress={discoverable}>
          <Text>
            {discoverableSeconds > 0
              ? `Visible for ${discoverableSeconds.toFixed(0)} seconds`
              : 'Make Visible'}
          </Text>
        </TouchableOpacity>
      </Header>
      <FlatList
        data={Object.entries(devices)}
        style={styles.list}
        renderItem={({item: [name, address]}) => (
          <DeviceItem
            style={styles.device}
            name={name}
            address={address}
            onPress={() =>
              connect({
                name,
                address,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  device: {
    marginVertical: 8,
  },
  list: {
    padding: 16,
  },
});

export default Home;
