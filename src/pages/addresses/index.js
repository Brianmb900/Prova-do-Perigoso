import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

export default function Addresses(){

const db = SQLite.openDatabase("agenda.db");

  const [enderecos, setEnderecos] = useState([]);

const removerEndereco = (id) => {
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM enderecos WHERE id = ?`,
        [id],
        (sqlTxn, res) => {
          console.log(`Endereço removido com sucesso!`);
          getEnderecos();
        },
        error => {
          console.log("Erro ao remover um Endereço " + error.message);
        },
      );
    });
  };

  const getEnderecos = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM enderecos ORDER BY id`,
        [],
        (sqlTxn, res) => {
          console.log("Endereços lidos com sucesso!");
          let len = res.rows.length;
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, cep: item.cep, rua: item.rua, complemento: item.complemento, bairro: item.bairro, cidade: item.cidade, estado: item.estado});
            }
            setEnderecos(results);
          }
        },
        error => {
          console.log("Erro ao obter Endereços " + error.message);
        },
      );
    });
  };

const navigation = useNavigation();

  function irVer(id){
      navigation.navigate('Ver/Alterar', { alterar: 0, id: id});
  }
  function irAlterar(id){
      navigation.navigate('Ver/Alterar', { alterar: 1, id: id});
  }

  const renderEnderecos = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 3,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        justifyContent:"space-between"
      }}>
        <View style={{flexDirection:"row"}}>
          <Text style={styles.exibir}>
            {item.rua.length < 16
            ? `${item.rua}`
            : `${item.rua.substring(0, 13)}...`}
          </Text>
          <Text style={styles.exibir}> - 
            {item.bairro.length < 10
            ? ` ${item.bairro}`
            : ` ${item.bairro.substring(0, 7)}...`}</Text>
          <Text style={styles.exibir}> - 
            {item.cidade.length < 14
            ? ` ${item.cidade}`
            : ` ${item.cidade.substring(0, 11)}...`}</Text>
        </View>
        <View style={{borderLeftWidth: 1, flexDirection:"row"}}>
          <TouchableOpacity style={{marginLeft:2}} onPress={() => removerEndereco(item.id)}>
            <FontAwesome name='minus' size={23} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => irAlterar(item.id)}>
            <FontAwesome name='pencil' size={23} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => irVer(item.id)}>
            <FontAwesome name='book' size={23} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(async () => {
    await getEnderecos();
  }, []);
  
  return (
    <View>
      <Text style={{marginTop: 60, textAlign: "center", fontSize:30, fontWeight: 'bold'}}>Meus Endereços</Text>
      <Image 
        source={require('../../../assets/Agenda2.png')}
        style={{ width: 200, height: 200, marginLeft: 90, marginTop: 60, marginBottom: 60}}
      />
      <View style={{paddingLeft:"20%", paddingRight:"20%", marginBottom:20}}>
        <Button title="Atualizar" onPress={() => getEnderecos()} />
      </View>
      <View style={{flexDirection:"row", justifyContent:"space-between", borderBottomWidth: 1}}>
      </View> 
      <FlatList
        data={enderecos}
        renderItem={renderEnderecos}
        key={t => t.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  exibir:{
    fontSize: 16,
  }
})