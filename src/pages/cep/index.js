import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Cep(){
  const navigation = useNavigation();


  function irSobre(){
      navigation.navigate('Endereços');
  }


  return(
    <View>
      <Text style={{marginTop:30}}>Sexo Virtual - Cadastro Via CEP!</Text>
      <Button
      title="Ir para tela Endereços"
      onPress={irSobre}
      />
    </View>
  )
}