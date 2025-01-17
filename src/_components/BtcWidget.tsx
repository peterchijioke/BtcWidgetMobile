// components/BtcWidget.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {fetchBtcPrice} from '../_services/fetch-btc-price';
import useSWR from 'swr';
import {format} from 'date-fns';

const BtcWidget = () => {
  const {data, isLoading} = useSWR(
    '/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    fetchBtcPrice,
  );
  const [btcPrice, setBtcPrice] = useState<any>(data?.data?.bitcoin.usd);
  const [usdAmount, setUsdAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState('--');
  const [lastUpdatedDate, setLastUpdatedDate] = useState(
    format(new Date(), 'dd MMMM yyyy') ?? '--',
  );
  const [lastUpdatedTime, setLastUpdatedTime] = useState(
    format(new Date(), 'h:mm a') ?? '--',
  );

  const handleInputChange = (value: string) => {
    try {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        if (btcPrice) {
          setUsdAmount(value);
          setBtcAmount(value ? (Number(value) / btcPrice).toFixed(8) : '--');
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data?.error) {
      Alert.alert(`${data?.message}`);
    } else {
      setBtcPrice(data?.data?.bitcoin.usd);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={'#fff'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin Price Converter</Text>
      <Text style={styles.display}>
        Current Price: $
        {data?.data?.bitcoin.usd
          ? data?.data?.bitcoin.usd.toLocaleString()
          : '--'}{' '}
        USD
      </Text>
      <Text style={styles.display}>Last Updated Date: {lastUpdatedDate}</Text>
      <Text style={styles.display}>Last Updated Time: {lastUpdatedTime}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter USD amount"
        value={usdAmount}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        maxLength={12} // Prevent input beyond $100,000,000
      />
      <Text style={styles.display}>
        BTC Equivalent: <Text style={styles.bold}>{btcAmount}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 450,
    margin: 'auto',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  display: {
    fontSize: 18,
    marginBottom: 12,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default BtcWidget;
