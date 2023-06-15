import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Cad(){
  const navigation = useNavigation();


  function irSobre(){
      navigation.navigate('Endereços');
  }


  return(
    <View>
      <Text>Home</Text>
      <Text>Bem vindo a tela Home!</Text>
      <Button
      title="Ir para tela Endereços"
      onPress={irSobre}
      />
    </View>
  )
}