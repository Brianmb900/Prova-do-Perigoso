import React from 'react';
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Home(){
  const navigation = useNavigation();

  function cadCEP(){
      navigation.navigate('Cadastrar');
  }
  function cad(){
      navigation.navigate('Cadastro2');
  }

  return(
    <View style={{marginTop: 60}}>
      <Text style={styles.titulo}>Agenda de Endereços</Text>
      <Image 
        source={require('../../../assets/agenda.png')}
        style={{ width: 200, height: 200, marginLeft: 90, marginTop: 60}}
      />
      <View style={{marginTop:30, paddingLeft:"20%", paddingRight:"20%"}}>
        <Button
        color='green'
          title="Cadastrar Utilizando CEP"
          onPress={cadCEP}
        />
      </View>
      <View style={{marginTop:30, paddingLeft:"20%", paddingRight:"20%"}}>
        <Button
          color='red'
          title="Cadastrar Manualmente"
          onPress={cad}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  titulo:{
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
