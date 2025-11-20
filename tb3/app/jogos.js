import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, FlatList, View } from "react-native";
import { useState, useEffect } from "react";

async function getJogos() {
  const resposta = await fetch(`http://177.44.248.50:8080/games`);
  if (resposta.ok) return await resposta.json();
  return [];
}

async function cadastra(title, slug, description, price) {
  const resposta = await fetch(`http://177.44.248.50:8080/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, slug, description, price })
  });
  return resposta.ok;
}

async function atualizarJogo(id, title, slug, description, price) {
  const resposta = await fetch(`http://177.44.248.50:8080/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, slug, description, price })
  });
  return resposta.ok;
}

async function deleteJogo(id) {
  await fetch(`http://177.44.248.50:8080/games/${id}`, {
    method: "DELETE"
  });
}

export default function Jogos() {

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [jogos, setJogos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  async function carregarJogos() {
    const lista = await getJogos();
    setJogos(lista);
  }

  async function salvar() {
    const ok = await cadastra(title, slug, description, Number(price));

    if (ok) {
      setTitle("");
      setSlug("");
      setDescription("");
      setPrice("");
      await carregarJogos();
    }
  }

  function editar(item) {
    setEditando(true);
    setIdEditando(item.id);

    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description);
    setPrice(String(item.price));
  }

  async function atualizar() {
    const ok = await atualizarJogo(
      idEditando,
      title,
      slug,
      description,
      Number(price)
    );

    if (ok) {
      setEditando(false);
      setIdEditando(null);

      setTitle("");
      setSlug("");
      setDescription("");
      setPrice("");

      await carregarJogos();
    }
  }

  async function excluirJogos(id) {
    await deleteJogo(id);
    await carregarJogos();
  }

  useEffect(() => {
    carregarJogos();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={estilos.inputGrande}
      />

      <View style={estilos.linha}>
        <TextInput
          placeholder="Slug"
          value={slug}
          onChangeText={setSlug}
          style={estilos.inputMenor}
        />

        <TextInput
          placeholder="Preço"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          style={estilos.inputMenor}
        />
      </View>

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={estilos.inputGrande}
      />

      <View style={estilos.linha}>
     
     
     <Button title="Pesquisar" onPress={carregarJogos} />
     
     {/* trocar para touchableOpacity <----------------------------------------------------------------------------*/}
     <Button
          title={editando ? "Atualizar" : "Salvar"}
          onPress={editando ? atualizar : salvar}
          disabled={!title.trim() || !slug.trim() || !price.trim()}
          color={!title.trim() || !slug.trim() || !price.trim() ? "#0099ffff" : "#4aa3ff"}
        />
      </View>

  
 <FlatList
 data={jogos}
 renderItem={({ item }) => (
 <View style={estilos.card}>
 <View style={estilos.cardTopo}>
 <Text style={estilos.cardTitulo}>{item.title}</Text>
 <View style={estilos.acoes}>
 <Button title="E" color="#3b82f6" onPress={() => editar(item)} />
 <Button title="X" color="#dc2626" onPress={() => excluirJogos(item.id)} />
 </View>
 </View>

 <Text>{item.slug}</Text>
 <Text>{item.description}</Text>
 <Text style={estilos.preco}>{item.price}</Text>  
  </View>
        )}
      />

    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2"
  },

  inputGrande: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10
  },

  linha: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  inputMenor: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12
  },

  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold"
  },

  acoes: {
    flexDirection: "row",
    gap: 8
  },

  preco: {
    marginTop: 4,
    fontWeight: "bold"
  }
});