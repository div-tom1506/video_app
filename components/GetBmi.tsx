import { useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";

function Bmi() {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [bmi, setBmi] = useState<string | null>(null);
    const [category, setCategory] = useState<string>('')

    const CalculateBmi = (): void => {
        let h = parseFloat(height);
        const w = parseFloat(weight);

        if (!w || !h) {
            setBmi('Invalid Input');
            setCategory('Invalid Category');
            return;
        }

        h = h / 100;
        let result = w / (h * h);
        const formattedBmi = result.toFixed(2);
        setBmi(formattedBmi);

        if (result < 18.5) {
            setCategory("Underweight");
        } else if (result >= 18.5 && result < 25) {
            setCategory("Normal Weight");
        } else if (result >= 25 && result < 30) {
            setCategory("Overweight");
        } else {
            setCategory("Obese");
        }

        Keyboard.dismiss();
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>BMI Calculator</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Height (in cm)"
                placeholderTextColor='#aaa'
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Weight (in Kg)"
                placeholderTextColor='#aaa'
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            <View style={{ margin: 20 }}>
                <Button title="Calculate" onPress={CalculateBmi} />
            </View>

            {bmi && (
                <>
                    <Text style={styles.bmi}>Your BMI: {bmi}</Text>
                    <Text style={styles.category}>Your Category: {category}</Text>
                </>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },

    input: {
        width: '80%',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
        padding: 10,
        marginBottom: 10,
    },

    bmi: {
        fontSize: 20,
        color: '#0f0',
        marginTop: 30,
    },

    category: {
        fontSize: 18,
        color: '#ccc',
        marginTop: 5,
    }
})

export default Bmi