import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Cad(){
  const navigation = useNavigation();

  function irSobre(){
      navigation.navigate('Endereços');
  }


  return(
    <View>
      <Text style={{marginTop:30}}>Sexo Virtual - Cadastro Manual!</Text>
      <Button
      title="Ir para tela Endereços"
      onPress={irSobre}
      />
    </View>
  )
}