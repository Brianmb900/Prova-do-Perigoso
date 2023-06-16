import React, { useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from './api'

export default function Cep(){
  const navigation = useNavigation();
  const [cep, setCep] = useState('')
  const [cepREG, setCepREG] = useState()
  const [bairro, setBairro] = useState()
  const [localidade, setLocalidade] = useState()
  const [logradouro, setLogradouro] = useState()
  const [uf, setUF] = useState()
  const { getItem, setItem } = useAsyncStorage('@endereco');
  const [endereco, setEndereco] = useState([])
  const [r, setR] = useState()
  
  function irSobre(){
      navigation.navigate('Endereços');
  }
const consultaCep = async (cep) => {
  if(!cep.trim())
  {
      alert('Digitee um CEP');
  }
  else{
      const response = await api.get('/' + cep + '/json/');
      setEndereco(response.data)
      setBairro(response.data.bairro)
      await setItem(response.data.cep);
      const item = await getItem();
      setCepREG(item);
      await setItem(response.data.logradouro);
      const item2 = await getItem();
      setLogradouro(item2);
      await setItem(response.data.bairro);
      const item3 = await getItem();
      setBairro(item3);
      await setItem(response.data.localidade);
      const item4 = await getItem();
      setLocalidade(item4);
      await setItem(response.data.uf);
      const item5 = await getItem();
      setUF(item5);
  }
}

function entrar() {
      navigation.navigate('Endereços', { cepREG: cep, logradouro: logradouro, bairro: bairro, localidade: localidade, uf: uf});
} 
  return(    
    <View>
        
      

      <Text style={styles.titulo}>Cadastro Via CEP!</Text>

            <View style={styles.container}>
        <View style={styles.busca}>
          <TextInput
          style={styles.cep}
          value={cep}
          onChangeText={setCep}
          underlineColorAndroid="transparent"
          keyboardType='numeric'
          />
           
        </View>
      </View>

      <View style={styles.botao}>
          <Button title="Confirmar" onPress={() => consultaCep(cep)} />
          <View style={styles.container}>
          <View style={styles.box}>
          <Text>CEP: {cepREG}</Text>
          <Text>logradouro: {logradouro}</Text>
          <Text>bairro: {bairro}</Text>
          <View style={styles.box}>
          <Text>localidade: {localidade}</Text>
          <Text>uf: {uf}</Text>
          <Text>asd{r}</Text>
          </View>
          </View>
          </View>
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

const styles = StyleSheet.create({
   titulo:{
    marginTop: 15,
    fontSize:25,
    color: 'red'
  },
  busca:{
    flexDirection: 'row'
  },
  container:{
    marginTop: 60,
    alignItems: 'center'
  },
  box:{
      width: 320,
  },
  cep:{
    width: 280,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
    botao:{
    marginTop: 40,
    alignItems: 'center'
  },
});