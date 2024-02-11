import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function NextForecast({item}){
  
  const timestamp = item.dt * 1000; // Convert timestamp to milliseconds
  const date = new Date(timestamp);
  

  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const getDat = diasDaSemana[date.getDay()]

    return(
        <View style={styles.container}>
<Text style={styles.label}>{getDat}</Text>
<Text style={styles.temperature}>{item.temp.max}°C</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        width:'100%'
        
      },
      label:{
fontSize:18,
fontWeight:'bold',color:'white',
marginStart:10
      },
      subtitle:{
        fontSize:16,
        fontWeight:'600',
        color:'white',
        marginEnd:10
      },
      temperature:{
        color:'white',
        fontSize:18,
        fontWeight:'500',
        marginEnd:10
      }
})