import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { apiLocale ,key} from '../../services/api';
import axios from 'axios';
// import { Container } from './styles';

export default function ModalSearch({city,setCity,setLocaleData,setOpenModal}){
console.log(city)

async function LocaleData(){
    await axios.get(`${apiLocale}q=${city}&appid=${key}`)
   .then((response)=>{
    console.log(response.data)
    try{
        setLocaleData(response.data)
        setOpenModal(false)
    }
    catch(error){
        console.log('erro ao salvar dados na state',error)
    }
    
   })
   .catch((error)=> {
    console.log(  'erro ao buscar dados da api',error)
   })
  }
  
 

    return(
        <View style={style.modal}>
            <Text style={style.title}>Pesquisar cidade</Text>
            <Input
            inputStyle={style.input}
            
            placeholder='EX: MACEIO'
            value={city}
            onChangeText={(text)=> setCity(text)}
            />

            <Button
            onPress={LocaleData}
            title='Pesquisar'
            />
        </View>
    )
}

const style=StyleSheet.create({
    modal:{
width:300,
height:150,
alignItems:'center'
    },
    title:{
        fontSize:18,
        
    },
    input:{
        borderWidth:1,
        borderColor:'#e6e6e6',
        borderRadius:8,
    marginTop:10
    }
})