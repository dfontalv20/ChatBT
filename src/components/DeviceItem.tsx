import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  name: string;
  address: string;
}

const containerStyle: StyleProp<TextStyle> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  backgroundColor: 'blue',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#E0E0E0',
};
const nameStyle: StyleProp<TextStyle> = {
  marginBottom: 4,
  fontSize: 24,
};
const addressStyle: StyleProp<TextStyle> = {
  fontSize: 12,
  color: '#666666',
};

const DeviceItem: React.FC<Props> = ({address, name, style, ...props}) => {
  return (
    <TouchableOpacity
      style={{...containerStyle, ...(style as Record<string, unknown>)}}
      {...props}>
      <Text style={nameStyle}>{name}</Text>
      <Text style={addressStyle}>{address}</Text>
    </TouchableOpacity>
  );
};

export default DeviceItem;
