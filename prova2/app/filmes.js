import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";
import { router } from "expo-router";
initDb();

function getAbsoluteCinema() {
  return db.getAllSync("SELECT * FROM AbsoluteCinema");
}
function salvarFilmesNoBanco(titulo, genero, ano) {
  db.runSync(
    "INSERT INTO AbsoluteCinema(titulo, genero, ano) VALUES (?, ?, ?)",
    [titulo, genero,parseFloat(ano)]
  );
}
function deleteAbsoluteCinema(id) {
  db.runSync("DELETE FROM AbsoluteCinema WHERE id = ?", [id]);
}
function getAbsoluteCinemaById(id) {
  const [AbsoluteCinema] = db.getAllSync("SELECT * FROM AbsoluteCinema WHERE id = ?", [id]);
  return AbsoluteCinema;
}
function updateAbsoluteCinema(id, titulo, genero, ano) {
  db.runSync(
    "UPDATE AbsoluteCinema SET titulo = ?, genero = ?, ano = ? WHERE id = ?",
    [titulo,  genero, parseFloat(ano), id]
  );
}

export default function Filme() {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [Filmes, setFilmes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  function salvarFilme() {
    if (!titulo.trim()) {
      Alert.alert("Preencha ao menos o Titulo");
      return;
    }
    salvarFilmesNoBanco(titulo.trim(), genero.trim(), ano.trim());
    setTitulo("");
    setGenero("");
    setAno("");
    carregarFilmes();
  }

  function carregarFilmes() {
    setFilmes(getAbsoluteCinema());
  }

  function excluirFilmes(id) {
    deleteAbsoluteCinema(id);
    carregarFilmes();
  }

  function editarFilmes(id) {
    const item = getAbsoluteCinemaById(id);
    if (!item) return;
    setTitulo(item.titulo);
    setGenero(item.genero);
    setAno(String(item.ano));
    setEditandoId(item.id);
  }

  function atualizarFilme() {
    if (!titulo.trim()) {
      Alert.alert("Preencha ao menos o Titulo");
      return;
    }
    updateAbsoluteCinema(editandoId, titulo.trim(), genero, ano.trim());
    setTitulo("");
    setGenero("");
    setAno("");
    setEditandoId(null);
    carregarFilmes();
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>🎬 Filmes</Text>

      <View style={estilos.cardEntrada}>
        <TextInput
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Filme?"
          style={estilos.campoTexto}
        />
        <TextInput
          value={genero}
          onChangeText={setGenero}
          placeholder="Genero?"
          style={estilos.campoTexto}
          
        />
        <TextInput
          value={ano}
          onChangeText={setAno}
          placeholder="Ano?"
          style={estilos.campoTexto}
          keyboardType="numeric"
        />

       <View style={estilos.linhaBotoes}>
   
   <View style={estilos.linhaBotoes}>
          <Button title="Salvar" onPress={salvarFilme} disabled={!!editandoId} />
          <Button title="Atualizar" onPress={atualizarFilme} disabled={!editandoId} color={editandoId ? "#9ca3af" : "#2563eb"}  />
        </View>

  </View>
      </View>

      <Button title="🔄 Recarregar Lista" onPress={carregarFilmes} />

      <FlatList
        data={Filmes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={estilos.cardItem}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.textoItem}>
                <Text style={{ fontWeight: "bold" }}>{item.titulo}</Text> — {item.genero} Data:
              </Text>
              <Text style={estilos.ano}>{item.ano}</Text>
            </View>

            <View style={estilos.acoesLinha}>
              <Button title="✏️" onPress={() => editarFilmes(item.id)} />
              <Button title="❌" color="#b91c1c" onPress={() => excluirFilmes(item.id)} />
            </View>
          </View>
        )}
      />
     <View>
        <Button title="Inicio" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#111827",
  },
  cardEntrada: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    gap: 10,
  },
  campoTexto: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#f9fafb",
  },
  linhaBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  cardItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  textoItem: {
    fontSize: 16,
    color: "#1f2937",
  },
  ano: {
    color: "#6b7280",
    fontSize: 14,
  },
  acoesLinha: {
    flexDirection: "row",
    gap: 8,
  },
});