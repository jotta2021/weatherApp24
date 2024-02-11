import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import RenderForecast from "../renderForecast";
import {format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
export default function Forecast({ forecast }) {
  const [todayForecast, setTodayForecast] = useState([]);
  const day = new Date()
  const Day = format(day,"dd 'de' MMMM" ,{locale:ptBR})
  console.log(Day)
  useEffect(() => {
    setTodayForecast(forecast.hourly);
  }, [forecast]);

  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={style.title}>Hoje</Text>
        <Text style={style.subtitle}>{Day}</Text>
      </View>
      <View style={{ marginEnd: 10, marginStart: 10 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          data={todayForecast}
          renderItem={({ item }) => <RenderForecast item={item} />}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "rgba(0, 16, 38, 0.3)",
    width: 340,
    borderRadius: 12,
    alignItems: "center",
    height: 200,
    marginStart: 10,
    marginEnd: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginStart: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginEnd: 10,
  },
});
