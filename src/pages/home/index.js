import React, { useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

export default function Home(){

const db = SQLite.openDatabase("agenda.db");

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS enderecos (id INTEGER PRIMARY KEY AUTOINCREMENT, cep VARCHAR(9), rua VARCHAR(100), complemento VARCHAR(100), bairro VARCHAR(100), cidade VARCHAR(100), estado VARCHAR(50))`,
        [],
        (sqlTxn, res) => {
          console.log("Tabela criada com sucesso!");
        },
        error => {
          console.log("Erro ao criar tabela" + error.message);
        },
      );
    });
  };
  
  const navigation = useNavigation();

  function cadCEP(){
      navigation.navigate('Cadastrar');
  }
  function cad(){
      navigation.navigate('Cadastro2');
  }

useEffect(async () => {
    await createTables();
  }, []);

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
