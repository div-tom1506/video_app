import { Button, StyleSheet, Text, View } from "react-native";


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to User Form" />
        <Button title="Play Single Video" />        {/* user can enter url or if !url, play the existing url video */}
        <Button title="Videos List" />
        <Button title="Calculate BMI" />
        <Button title="API Call Demo" />
        <Button title="Gluestack Demo" />
        <Button title="Redux Demo" />
        <Button title="Tailwind/NativeWind Demo" />
      </View>
    </View>
  );
}

export default function Index() {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {

  },

  buttonContainer: {

  }
})
