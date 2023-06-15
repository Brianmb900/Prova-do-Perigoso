import { useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SQLite from 'expo-sqlite';

export default function Addresses(){

const db = SQLite.openDatabase("agenda.db");

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [enderecos, setEnderecos] = useState([]);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS enderecos (id INTEGER PRIMARY KEY AUTOINCREMENT, cep VARCHAR(9), rua VARCHAR(100), complemento VARCHAR(100), bairro VARCHAR(100), cidade VARCHAR(100), estado VARCHAR(50))`,
        [],
        (sqlTxn, res) => {
          console.log("Tabela criada com sucesso!");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  const incluirEndereco = () => {
    if (!cep || !rua || !complemento || !bairro || !cidade || !estado) {
      alert("Preencha todos os campos");
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO enderecos (cep, rua, complemento, bairro, cidade, estado) VALUES (?,?,?,?,?,?)`,
        [cep, rua, complemento, bairro, cidade, estado],
        (sqlTxn, res) => {
          console.log(`Endereço adicionado com sucesso!`);
          getEnderecos();
        },
        error => {
          console.log("Erro ao inserir um Endereço " + error.message);
        },
      );
    });
  };

  const insertDefaultData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "INSERT OR IGNORE INTO enderecos VALUES(1, '12345-123', 'Teste', '', 'TestiuUUu', 'testelândia', 'SP');",
        (sqlTxn, res) => {
          console.log(`Endereços Padrão 1 adicionados com sucesso!`);
          getEnderecos();
        },
        error => {
          console.log("Erro ao inserir Endereço Padrão 1 " + error.message);
        },
      );
      txn.executeSql(
        "INSERT OR IGNORE INTO enderecos VALUES(2, '12345-123', 'Dr. Roberto Shoji', '', 'Boqueirão', 'Praia Grande', 'SP');",
        (sqlTxn, res) => {
          console.log(`Endereços Padrão 2 adicionado com sucesso!`);
          getEnderecos();
        },
        error => {
          console.log("Erro ao inserir Endereço Padrão 2 " + error.message);
        },
      );
    });
  };

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
        `SELECT * FROM enderecos ORDER BY id DESC`,
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


  useEffect(async () => {
    await createTables();
    await insertDefaultData();
    await getEnderecos();
  }, []);

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
          <Text style={styles.exibir}>{item.rua}</Text>
          <Text style={styles.exibir}> - {item.bairro}</Text>
          <Text style={styles.exibir}> - {item.cidade}</Text>
        </View>
        <View style={{borderLeftWidth: 1, flexDirection:"row"}}>
          <TouchableOpacity onPress={() => removerEndereco(item.id)}>
            <FontAwesome name='minus' size={23} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removerEndereco(item.id)}>
            <FontAwesome name='pencil' size={23} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removerEndereco(item.id)}>
            <FontAwesome name='book' size={23} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <StatusBar backgroundColor="#222" />
      <Text style={{borderBottomWidth: 1, marginTop: 30, textAlign: "center", fontSize:22}}>Meus Endereços</Text>
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