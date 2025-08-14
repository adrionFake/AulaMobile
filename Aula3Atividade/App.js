import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaView style={estilos.tela}>
    
      <View>
      <Text style={estilos.textowhite}>Me empresta 3 milhões de lules por 30 anos ?</Text>
      </View>
       
       <Text style={estilos.ladoesquerdo2}>Menu:</Text>
       
       <View style={estilos.Centralizar}>
       
       <View style={estilos.ladodireito}>
       <Text>NOTAS</Text>
       </View>
       <View>
       <Text style={estilos.meio}>AULAS</Text>
       </View>
       <View style={estilos.ladoesquerdo}>
       <Text>AVISOS</Text>
       </View>
        


       </View>
    
    
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
 flexDirection: 'row',
},

ladodireito:{
 
 backgroundColor: 'blue',
 marginRight: 20,
},

meio:{
 
 backgroundColor: 'green',
 
},

ladoesquerdo:{

 backgroundColor: 'purple',
 marginLeft: 20,
},

ladoesquerdo2:{
 alignItems: 'left',
 

},
})