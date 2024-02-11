import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions } from "react-native";
import Header from "./src/components/header";
import { LinearGradient } from "expo-linear-gradient";
import Home from "./src/screens/home";

// Seu componente React Native
import { darkTheme, dayTheme } from './themes/index';

import React,{useEffect, useState} from "react";

const { height } = Dimensions.get("window");
import * as Location from 'expo-location'

export default function App() {

  const [city,setCity] = useState('')
    //vai armazenar a longitude e latitude encontrada na pesquisa da cidade
const [long,setLong] = useState(null)
const [lat,setLat] = useState(null)
const [currentTheme,setCurrentTheme] = useState(['#29B2DD', '#3AD', '#2DC8EA'])


 

//pega a localização do usuario inicialmente]
useEffect(()=>{
async function getLocation(){
  const {status} = await Location.requestForegroundPermissionsAsync()

  if(status !=='granted'){
    console.log('Pemissão negada pra buscar localização')
return;
  }else{
    const locate = await Location.getCurrentPositionAsync({})
    setLat(locate.coords.latitude)
    setLong(locate.coords.longitude)
  }
}

getLocation()
},[])
  
  //verifica o horario do dia pra aplicar o tema
  useEffect(()=> {
const hour = new Date().getHours()

if ( hour >= 18 ){
  setCurrentTheme(darkTheme)
}else{
  setCurrentTheme(dayTheme)
}



  },[])

  
  return (
    <View style={styles.container}>
      <LinearGradient style={{ flex: 1, height:height }} colors={currentTheme.map((item)=> item)}>
        <Header  city={city} setCity={setCity} lat={lat} long={long} setLat={setLat} setLong={setLong}/>
        <Home city={city} lat={lat} long={long}/>
      </LinearGradient>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
  flex:1,
  height:height
  },
});
