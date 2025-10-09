import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { db, initDb } from "../data/db";

initDb();

// CRUD no mesmo estilo síncrono
function getAtividades() {
  return db.getAllSync("SELECT * FROM atividades");
}

function salvarAtividadesNoBanco(atividade, duracaomin, categoria) {
  db.runSync(
    "INSERT INTO atividades (atividade, duracaomin, categoria) VALUES (?, ?, ?)",
    [atividade, parseFloat(duracaomin), categoria]
  );
}

function deleteAtividade(id) {
  db.runSync("DELETE FROM atividades WHERE id = ?", [id]);
}

function getAtividadeById(id) {
  const [atividade] = db.getAllSync("SELECT * FROM atividades WHERE id = ?", [id]);
  return atividade;
}

function updateAtividade(id, atividade, duracaomin, categoria) {
  db.runSync(
    "UPDATE atividades SET atividade = ?, duracaomin = ?, categoria = ? WHERE id = ?",
    [atividade, parseFloat(duracaomin), categoria, id]
  );
}
//----------------------------------------------------------------------------------------------

export default function Treino() {
  const [atividade, setAtividade] = useState("");
  const [duracaomin, setDuracaomin] = useState("");
  const [categoria, setCategoria] = useState("");
  const [atividades, setAtividades] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  
  function salvarAtividade() {
  if (!atividade.trim() || !duracaomin.trim() || !categoria.trim()) {
    Alert.alert("Preencha todos os campos");
    return;
  }

  salvarAtividadesNoBanco(atividade.trim(), duracaomin.trim(), categoria.trim());

  // Limpar campos
  setAtividade("");
  setDuracaomin("");
  setCategoria("");

  // Recarregar lista
  carregarAtividades();
}

  // Função para carregar todas as atividades
  function carregarAtividades() {
    setAtividades(getAtividades());
  }

  // Função para excluir atividade
  function excluirAtividade(id) {
    deleteAtividade(id);
    carregarAtividades();
  }

  // Função para preparar a edição
  function editarAtividade(id) {
    const item = getAtividadeById(id);
    if (!item) return;
    setAtividade(item.atividade);
    setDuracaomin(String(item.duracaomin));
    setCategoria(item.categoria);
    setEditandoId(item.id);
  }

  // Função para atualizar atividade existente
  function atualizarAtividade() {
    if (!atividade.trim() || !duracaomin.trim() || !categoria.trim() || !editandoId) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    updateAtividade(editandoId, atividade.trim(), duracaomin, categoria.trim());
    setAtividade("");
    setDuracaomin("");
    setCategoria("");
    setEditandoId(null);
    carregarAtividades();
  }

  // Carrega as atividades quando a tela abre
  useEffect(() => {
    carregarAtividades();
  }, []);


  return (
     <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Atividades</Text>

      <View style={estilos.linhaEntrada}>
        <TextInput
          value={atividade}
          onChangeText={setAtividade}
          placeholder="Atividade ?"
          style={estilos.campoTexto}
        />
        <TextInput
          value={duracaomin}
          onChangeText={setDuracaomin}
          placeholder="Duração em min ?"
          style={estilos.campoTexto}
          keyboardType="numeric"
        />

        <TextInput
          value={categoria}
          onChangeText={setCategoria}
          placeholder="Qual categoria?"
          style={estilos.campoTexto}
          
        />


        <Button title="Salvar" onPress={salvarAtividade} disabled={!!editandoId} />
        <Button title="Atualizar" onPress={atualizarAtividade} disabled={!editandoId} />
      </View>

      <Button title="Carregar Atividades" onPress={carregarAtividades} />

     <FlatList
  data={atividades}
  keyExtractor={(item) => String(item.id)}
  renderItem={({ item }) => (
    <View>
    <Text style={estilos.textoItem}>
      - {item.atividade}: {item.duracaomin} min ({item.categoria})
    </Text>
     <View style={estilos.acoesLinha}>
              <Button title="E" onPress={() => editarAtividade(item.id)} />
              <Button title="x" color="#b91c1c" onPress={() => excluirAtividade(item.id)} />
      </View>

    </View>
  )}
/>

    </SafeAreaView>
  );
}


const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  linhaEntrada: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8, 
    gap: 8 
  },
  campoTexto: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 44 
  },
  textoItem: { 
    fontSize: 16, 
    paddingVertical: 6 
  },
});