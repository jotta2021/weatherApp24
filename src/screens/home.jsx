import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import Icone from "./../../assets/Icone.png";
import LinearGradient from "react-native-linear-gradient";
import Forecast from "../components/forecast";
import Rain from "../../assets/rain.png";
import Wind from "../../assets/wind.png";
import Humidity from "../../assets/humidity.png";
import NextForecast from "../components/nextForecast";
import CalenderIcon from 'react-native-vector-icons/Ionicons'
import { API, apiLocale, key } from "../services/api";
import axios from "axios";
import { conditions } from "../conditions";
import LottieView from "lottie-react-native";
import Clear from './../conditions/Clear.json'


export default function Home({city,lat,long}) {


  const [forecast,setForecast]=useState([])
 const [previsaoTempo, setPrevisaoTempo] = useState([
  { dia: 'Segunda', previsao: '17C' },
  { dia: 'Terça', previsao: '17C' },
  { dia: 'Quarta', previsao: '17C' },
  { dia: 'Quinta', previsao: '17C' },
  { dia: 'Sexta', previsao: '17C' },
  { dia: 'Sábado', previsao: '17C' },
  { dia: 'Domingo', previsao: '17C' },
]);
const [days,setDays] = useState([])



//função para buscar os dados da  previsao do tempo
useEffect(()=> {

  async function handleForecast(){
    const url = `${API}lat=${lat}&lon=${long}&appid=${key}&lang=pt&units=metric`
console.log(url)
await axios.get(`${API}lat=${lat}&lon=${long}&lang=pt&appid=${key}&units=metric`)

.then((res)=> {

  setForecast(res.data)
 
  
})
.catch((error)=>{
  console.log(error)})
  }
  
  handleForecast()
  },[long,lat])
  

//quando carregar  o forecast ele envia os dados dos dias pr aoutra state
useEffect(()=>{

setDays(forecast.daily)
},[forecast])
  
  function VerifyImage() {
    const conditionKey = forecast.current.weather[0]?.description;
    const animationSource = conditions[conditionKey] || null;
    return animationSource;
  }
  
  return (
    <ScrollView >
      <View style={styles.container}>

      
      <View>
        <LottieView
      style={{width: 200, height: 200}}
      source={forecast.length===0 ? Clear:VerifyImage()}
      autoPlay={true}
      
      loop={true}

      />
      
      </View>
      <View>
        <Text style={styles.temperature}>{forecast.length===0 ? '': forecast.current?.temp}°C</Text>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'white',marginBottom:5}}>{forecast.length===0?'': forecast.current.weather[0]?.description}</Text>
        <View style={styles.precipitations}>
          <Text style={styles.minMax}>Max {forecast.length===0 ? '': forecast.daily[0].temp?.max}° </Text>
          <Text style={styles.minMax}>Min {forecast.length===0 ? '': forecast.daily[0].temp?.min}°</Text>
        </View>
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={Rain} />
            <Text style={styles.porcentage}>{ forecast.length===0 ? '': forecast?.daily[0].rain}%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={Humidity} />
            <Text style={styles.porcentage}>{ forecast.length===0 ? '':forecast?.current.humidity}%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={Wind} />
            <Text style={styles.porcentage}>{ forecast.length===0 ? '':forecast?.current.wind_speed}%</Text>
          
          </View>
        </View>
      </View>
      {
        forecast.length===0
? '' :  <Forecast forecast={forecast} />     }
      
      <View style={styles.next}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center',
  marginTop:10,
    }}>
        <Text style={styles.title}>Próximos dias</Text>
        <CalenderIcon style={{marginEnd:10}} name='calendar' size={20} color='white'/>
      </View>
      {
        forecast.length ===0 ? '':
           <FlatList
      vertical
      showsVerticalScrollIndicator={false}
      keyExtractor={(item,index)=> index.toString()}
      data={days}
        
      renderItem={({item})=> 
    
    <NextForecast item={item}/>
  
  }
      />
      }
   
      </View>
    
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  temperature: {
    fontSize: 64,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  precipitations: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  minMax: {
    fontSize: 18,
    marginBottom: 3,
    color: "white",
    textAlign: "center",
  },
  content: {
    flexDirection: "row",
    gap: 60,
    marginTop: 20,
    backgroundColor: "rgba(0, 16, 38, 0.3)",
    padding: 6,
    borderRadius: 12,
    width: 340,
    
  },
  porcentage: {
    color: "white",
    fontWeight: "bold",
  },
  title:{
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    marginStart:10
  },
  next:{
    marginTop: 20,
    backgroundColor: "rgba(0, 16, 38, 0.3)",
    width: 340,
    borderRadius: 12,
    alignItems: "center",
    height: 200,
    marginStart:10,
    marginEnd:10
  }
});
