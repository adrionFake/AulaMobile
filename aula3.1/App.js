import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaView style={estilos.tela}>
    
      <Text style={estilos.textowhite}>Me empresta 3 milhões de lules por 30 anos ?</Text>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({

textowhite: {
  color:"lime",
},
tela:{
  flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
},
CaixaRedonda:{
width: 60,
height: 100,
borderRadius: 50,
},

Centralizar: {

 flex: 1,
 alignItems: "center", // justifica coisas para o lado e o justifyContent muda verticalmente

}
})