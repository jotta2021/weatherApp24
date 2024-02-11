import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ForecastIcon from '../../../assets/forecast.png';

export default function RenderForecast({ item }) {
  const timestamp = item.dt * 1000; // Convert timestamp to milliseconds
  const date = new Date(timestamp);
  const hours = date.getHours();
  const formattedTime = `${hours}:00`;

  return (
    <View style={styles.content}>
         <Text style={styles.text}>{item.temp}°C</Text>
         <Image source={ForecastIcon} style={{ width: 80, resizeMode:'cover'}} />
      <Text style={styles.text}>{formattedTime}</Text>
     

    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: -30,
    alignItems: 'center',
    marginTop: 20,
    width: 90,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
});
