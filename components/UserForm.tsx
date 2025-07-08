import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function UserForm() {
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [role, setRole] = useState<string>('Fresher')
    const [address, setAddress] = useState<string>('')

    return (
        <View>
            <Text>User Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
            />
            
            <TextInput
                style={styles.input}
                value={role}
                onChangeText={setRole}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Address"
                value={address}
                onChangeText={setAddress}
            />
            <Button title="Submit" onPress={() => console.log("Button Pressed")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },

    input: {

    }

})

export default UserForm