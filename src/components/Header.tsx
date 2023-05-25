import React, {PropsWithChildren} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

const styles: StyleProp<ViewStyle> = {
  height: 60,
  display: 'flex',
  backgroundColor: 'blue',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  gap: 10,
  paddingHorizontal: 8,
};
export const Header: React.FC<PropsWithChildren> = ({children}) => {
  return <View style={styles}>{children}</View>;
};
