import React, { useEffect, useState } from 'react';
import { View,Text, TouchableOpacity,StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { Overlay } from '@rneui/themed';
import ModalSearch from '../modalSearchCity';

// import { Container } from './styles';
 
export default function  Header({city,setCity,lat,long,setLat,setLong}){
  const [openOverlay,setOpenOverlay] = useState(false)
  const[state,setState]= useState('')
function toggleOverlay(){
  setOpenOverlay(!openOverlay)
}


const [LocaleData,setLocaleData] = useState([])


//apos ser salvo algum dado em locale data, ele separa longitude e latitute
useEffect(()=> {
 if(LocaleData.length !==0){
setLat(LocaleData[0].lat)
setLong(LocaleData[0].lon)
setCity(LocaleData[0].name)
setState(LocaleData[0].state)
 }



},[LocaleData])
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
              <Icon2 name='location' size={27} color='white' /> 
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={()=> setOpenOverlay(true)}
              
              >
                <Text style={{fontSize:18,fontWeight:'600',color:'white'}}>{city} {state}</Text>
              
                   <ArrowIcon name='arrow-drop-down' size={27} color='white' /> 
               
                
              </TouchableOpacity>
               
            </View>
              <TouchableOpacity>
            <Icon name='notifications-outline' size={27} color='white' />
             </TouchableOpacity>

             <Overlay
             
             isVisible={openOverlay}
             onBackdropPress={toggleOverlay}
             
             >
<ModalSearch city={city} 

setCity={setCity}
setLat={setLat}
setLong={setLong}
setLocaleData={setLocaleData}
setOpenModal={setOpenOverlay}
/>


             </Overlay>
        </SafeAreaView>
       
    )
}
const styles = StyleSheet.create({
    container:{

   flexDirection:'row',
justifyContent:'space-between',
width:'100%',
marginTop:20
}
})