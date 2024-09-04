import {View, Text} from 'react-native';
import React from 'react';
import BtcWidget from './src/_components/BtcWidget';

type Props = {};

const App = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'brown',
      }}>
      <BtcWidget />
    </View>
  );
};

export default App;
