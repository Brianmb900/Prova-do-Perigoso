import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';


export default function Cad(){
  const navigation = useNavigation();

  function irSobre(){
      navigation.navigate('Endereços');
  }


  return(
    <View>
      <Text style={styles.titulo}> Cadastro Manual</Text>

          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="CEP:"
          underlineColorAndroid="transparent"
          keyboardType='numeric'
        />
      </View> 
          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Logradouro:"
        />
      </View> 

          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bairro:"
        />
      </View> 
          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cidade:"
        />
      </View> 
          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Estado:"
        />
      </View> 
         
         
        <View style={styles.botao}>
      <Button 
      title="Ir para tela Endereços"
      onPress={irSobre}
      />
      </View> 
    </View>
  )
}