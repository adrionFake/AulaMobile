import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
    
    
     <View>
     <Text style={estilos.titulo}>React Native</Text>
     <Text style={estilos.textoabaixodotitulo}>Avaliação dia 27/08</Text>     
     </View>
     
     <View style={estilos.Tentativadealinhamento}>
     <View style={estilos.BatatasCombordas}>
     
     <Text>Batatas são macias.</Text>

     </View>
     </View>
   
     <View style={estilos.botão}>
      
     <Button color="blue" title="Enviar"></Button>

     </View>

     
    </SafeAreaView>
);
  }

const estilos = StyleSheet.create({

titulo: {
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 15,  
      },
      
      
      ladoesquerdo:{

 backgroundColor: 'purple',
 marginLeft: 20},

 areaSegura: {
      margin: 20
    },

textoabaixodotitulo: {
    fontSize: 13,


},

BatatasCombordas:{
justifyContent: "center",
marginTop: 300,
marginLeft: 90,
marginRight: 100,
borderRadius: 8,
backgroundColor: "#d6d3d3ff",
alignItems: "Center",
padding: 10

},


Tentativadealinhamento:{
justifyContent: "center",
alignItems: "Center",

},

botão:{
marginLeft: 130,
marginRight: 130,
marginTop: 10,
height:200,
fontWeight: "bold"
},
 negrito:{

  fontWeight: "bold"
 }
 


  },
)
