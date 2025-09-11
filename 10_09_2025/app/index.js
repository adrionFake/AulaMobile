import { Link } from "expo-router";
import { View, Button, Text } from "react-native";

export default function Index(){

    return(

        <View>

        <Text>AHhhhhhh</Text>
        <Link href="/batata" asChild>
        <Button title="Clique para batatas"></Button>
        </Link>
        </View>
    );
}