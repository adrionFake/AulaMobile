import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
 
  const [resultado, setResultado] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
 
  function somar(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    const soma = n1Convertido + n2Convertido;
    return soma;  
  }
  function sub(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);  
    const sub = n1Convertido - n2Convertido;
    return sub;  
  }
  
  function multi(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);  
    const multi = n1Convertido * n2Convertido;
    return multi;  
  }
   function div(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);  
    let div = n1Convertido / n2Convertido;
    if (num2 = 0) {
      div = 0;
    }
   
    return div;  

  }
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <Text>Número 1</Text>
      <TextInput
        style={estilos.campo}
        placeholder="Digite um número"
        keyboardType="numeric"
        onChangeText={setNum1}
        value={num1}
      />
      <Text>Número 2</Text>
      <TextInput
        style={estilos.campo}
        placeholder="Digite um número"
        keyboardType="numeric"
        onChangeText={setNum2}
        value={num2}
      />
      <View style={estilos.botoes}>
        <Button title=" + " onPress={() => setResultado(somar(num1, num2))}/>
        <Button title=" - " onPress={() => setResultado(sub(num1, num2))}/>
        <Button title=" * " onPress={() => setResultado(multi(num1, num2))}/>
        <Button title=" / " onPress={() => setResultado(div(num1, num2))}/>
        <Button title='Resetar o Universo' onPress={setNum1, setNum2 == 0 }></Button>

      </View>
      <Text style={{fontSize: 40}}>Resultado: {resultado}</Text>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
 areaSegura: {
  flex: 1
 },
 campo: {
  borderWidth: 1,
  borderRadius: 10
 },
 botoes: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 20
 }
});