import {useState} from 'react';
import {
  DvcListener,
  discover,
  enable,
  discoverable as makeDiscoverable,
} from 'react-native-bluetooth-message';
import {DateTime} from 'luxon';

export type DeviceDict = Record<string, string>;

const DISCOVERABLE_SECONDS = 30;

export const useDevices = () => {
  const [discoverableUntil, setDiscoverableUntil] = useState<Date | null>(null);
  const deviceListener = DvcListener();

  const devices = deviceListener.reduce<DeviceDict>(
    (dict, device) => ({...dict, ...(device as DeviceDict)}),
    {},
  );

  const discoverable = async () => {
    await makeDiscoverable(DISCOVERABLE_SECONDS);
    setDiscoverableUntil(
      DateTime.now().plus({seconds: DISCOVERABLE_SECONDS}).toJSDate(),
    );
  };

  return {devices, scan: discover, enable, discoverable, discoverableUntil};
};

export default useDevices;
