import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
export default function Batata(){

    return(

        <View>

        <Text>Potato</Text>
        
        <Button title="Desver Batatas" onPress={() => router.back()}></Button>
        </View>
    )
}