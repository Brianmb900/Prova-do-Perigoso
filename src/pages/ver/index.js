import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Ver({route}){
  const navigation = useNavigation();


  function irSobre(){
      navigation.navigate('Endereços');
  }


  return(
    <View>
    {route.params?.alterar == 0?<Text style={{marginTop:30, color: 'green', fontSize: 30}}>Ver!</Text>:<Text style={{marginTop:30, color: 'red', fontSize: 30}}>Alterar!</Text>}
      <Text style={{marginTop:30, fontSize:30}}>{route.params?.alterar}</Text>
      <Text style={{marginTop:30, fontSize:60, color: 'purple'}}>{route.params?.id}</Text>
      <Button
      title="Ir para tela Endereços"
      onPress={irSobre}
      />
    </View>
  )
}