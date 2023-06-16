import React, { useState, useEffect} from 'react';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import api from '../../services/api.js';

const db = SQLite.openDatabase("agenda.db");


export default function Ver({route}){
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [enderecos, setEnderecos] = useState([]);
  
  const navigation = useNavigation();
  function irEnderecos(){
      navigation.navigate('Endereços2');
  }

const consultaCep = async (cep) => {
  if(!cep.trim())
  {
      alert('Digite um CEP');
  }
  else{
      const response = await api.get('/' + cep + '/json/');
      setRua(response.data.logradouro)
      setComplemento(response.data.complemento)
      setBairro(response.data.bairro)
      setCidade(response.data.localidade)
      setEstado(response.data.uf)
  }
}

const getEnderecos = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM enderecos WHERE id = ? ORDER BY id`,
        [route.params?.id],
        (sqlTxn, res) => {
          console.log("Endereço lido com sucesso!");
          let len = res.rows.length;
          if (len >= 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              setCep(item.cep);
              setRua(item.rua);
              setComplemento(item.complemento);
              setBairro(item.bairro);
              setCidade(item.cidade);
              setEstado(item.estado);
            }
          }
        },
        error => {
          console.log("Erro ao obter Endereço " + error.message);
        },
      );
    });
  };

const alterarEndereco = () => {
    if (!cep || !rua || !bairro || !cidade || !estado) {
      alert("Preencha todos os campos");
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE enderecos SET cep = ?, rua = ?, complemento = ?, bairro = ?, cidade = ?, estado = ? WHERE id = ?`,
        [cep, rua, complemento, bairro, cidade, estado, route.params?.id],
        (sqlTxn, res) => {
          console.log(`Endereço alterado com sucesso!`);
          irEnderecos();
        },
        error => {
          console.log("Erro ao alterar um Endereço " + error.message);
        },
      );
    });
  };

  useEffect(async () => {
    await getEnderecos();
  }, []);

  return(
    <View>
    {route.params?.alterar == 0?
    <React.Fragment>
      <View>  
      <Text style={styles.titulo}>Vizualizar Endereço</Text>
          <View>
            <View style={styles.container}>
                <TextInput
                style={styles.inputs}
                value={cep}
                onChangeText={(texto) => setCep(texto)}
                placeholder="CEP"
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                maxLength={8}
                />
                <TextInput
                style={styles.inputs}
                value={rua}
                onChangeText={(texto) => setRua(texto)}
                placeholder="Digite sua Rua"
                underlineColorAndroid="transparent"
                keyboardType='default'
                />
            </View>
            <View style={styles.container}>
              <TextInput
              style={styles.inputs}
              value={complemento}
              onChangeText={(texto) => setComplemento(texto)}
              placeholder="Complemento (Opicional)"
              underlineColorAndroid="transparent"
              keyboardType='default'
              />
              <TextInput
              style={styles.inputs}
              value={bairro}
              onChangeText={(texto) => setBairro(texto)}
              placeholder="Digite seu Bairro"
              underlineColorAndroid="transparent"
              keyboardType='default'
              />
            </View>
            <View style={styles.container}>
              <TextInput
              style={styles.inputs}
              value={cidade}
              onChangeText={(texto) => setCidade(texto)}
              placeholder="Digite sua Cidade"
              underlineColorAndroid="transparent"
              keyboardType='default'
              />
              <TextInput
              style={styles.inputs}
              value={estado}
              onChangeText={(texto) => setEstado(texto)}
              placeholder="Digite seu Estado"
              underlineColorAndroid="transparent"
              keyboardType='default'
              maxLength={2}
              />
            </View>
          </View>
          <View style={{paddingLeft:"20%", paddingRight:"20%", marginTop:20}}>
            <Button title="Voltar" onPress={() => irEnderecos()} />
          </View>
    </View>
    </React.Fragment>
    :
    <React.Fragment>
    <View>  
      <Text style={styles.titulo}>Alterar Endereço</Text>
          <TextInput
          style={styles.cep}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Digite seu CEP"
          underlineColorAndroid="transparent"
          keyboardType='numeric'
          maxLength={8}
          />
          <View style={{paddingLeft:"20%", paddingRight:"20%"}}>
            <Button title="Buscar" onPress={() => consultaCep(cep)} />
          </View>
          <View>
            <View style={styles.container}>
                <TextInput
                style={styles.inputs}
                value={cep}
                onChangeText={(texto) => setCep(texto)}
                placeholder="CEP"
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                maxLength={8}
                />
                <TextInput
                style={styles.inputs}
                value={rua}
                onChangeText={(texto) => setRua(texto)}
                placeholder="Digite sua Rua"
                underlineColorAndroid="transparent"
                keyboardType='default'
                />
            </View>
            <View style={styles.container}>
              <TextInput
              style={styles.inputs}
              value={complemento}
              onChangeText={(texto) => setComplemento(texto)}
              placeholder="Complemento (Opicional)"
              underlineColorAndroid="transparent"
              keyboardType='default'
              />
              <TextInput
              style={styles.inputs}
              value={bairro}
              onChangeText={(texto) => setBairro(texto)}
              placeholder="Digite seu Bairro"
              underlineColorAndroid="transparent"
              keyboardType='default'
              />
            </View>
            <View style={styles.container}>
              <TextInput
              style={styles.inputs}
              value={cidade}
              onChangeText={(texto) => setCidade(texto)}
              placeholder="Digite sua Cidade"
              underlineColorAndroid="transparent"
              keyboardType='default'
              />
              <TextInput
              style={styles.inputs}
              value={estado}
              onChangeText={(texto) => setEstado(texto)}
              placeholder="Digite seu Estado"
              underlineColorAndroid="transparent"
              keyboardType='default'
              maxLength={2}
              />
            </View>
          </View>
          <View style={{paddingLeft:"20%", paddingRight:"20%", marginTop:20}}>
            <Button color='green' title="Alterar" onPress={() => alterarEndereco()} />
          </View>
    </View>
    </React.Fragment>
    }
    </View>
  )
}

const styles = StyleSheet.create({
  titulo:{
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
    marginTop: 60,
    marginBottom: 30
  },
  cep:{
    width: 280,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginLeft: "14%",
    marginBottom: 20
  },
  inputs:{
    width: 180,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginLeft: "2.3%",
    marginBottom: 10
  },
  container:{
    marginTop: 20,
    flexDirection: 'row',
  }
})