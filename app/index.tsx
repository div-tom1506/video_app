import ApiCall from "@/components/ApiCallDemo";
import CalculateBmi from "@/components/GetBmi";
import MultiPlayerVideo from "@/components/MultiVideo";
import SingleVideo from "@/components/SingleVideo";
import UserForm from "@/components/UserForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to User Form" onPress={() => navigation.navigate('User Form')} />
        <Button title="Play Single Video" onPress={() => navigation.navigate('Single Video')} />        {/* user can enter url or if !url, play the existing url video */}
        <Button title="Videos List" onPress={() => navigation.navigate('Multi Video List')} />
        <Button title="Calculate BMI" onPress={() => navigation.navigate('Calculate BMI')} />
        <Button title="API Call Demo" onPress={() => navigation.navigate('API Demo')} />
        <Button title="Gluestack Demo" onPress={() => navigation.navigate()} />
        <Button title="Redux Demo" onPress={() => navigation.navigate()} />
        <Button title="Tailwind/NativeWind Demo" onPress={() => navigation.navigate()} />
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="User Form" component={UserForm} />
      <Stack.Screen name="Calculate BMI" component={CalculateBmi} />
      <Stack.Screen name="API Demo" component={ApiCall} />
      <Stack.Screen name="Single Video" component={SingleVideo} />
      <Stack.Screen name="Multi Video List" component={MultiPlayerVideo} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    padding: 12
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  }
})
