import { useState } from "react"
import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native"
import axios from 'axios'

type PostData = {
    userId: number
    id: number
    title: string
    body: string
}

type ErrorData = {
    error: string
}

function ApiCall() {
    const [id, setId] = useState<string>('')
    const [getData, setGetData] = useState<PostData | ErrorData | null>(null)
    const [postResponse, setPostResponse] = useState<PostData | ErrorData | null>(null)
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')

    const handleGet = async () => {
        try {

            if (!id) {
                setGetData({ error: 'Please enter post Id' })
                return
            }

            const getResponse = await axios.get<PostData>(`https://jsonplaceholder.typicode.com/posts/${id}`)
            console.log("API GET Response: " + JSON.stringify(getResponse.data))
            setGetData(getResponse.data)
        } catch (err) {
            console.error("GET request failed: " + JSON.stringify(err));
            setGetData({ error: 'GET request failed' });
        }
    }

    const handlePost = async () => {
        try {
            const data = {
                userId: 1,
                title: title,
                body: body

            }

            const postResponse = await axios.post<PostData>('https://jsonplaceholder.typicode.com/posts', data)
            console.log("API POST Response: " + JSON.stringify(postResponse.data))
            setPostResponse(postResponse.data)
        } catch (err) {
            console.error("POST request failed: " + JSON.stringify(err));
            setPostResponse({ error: 'POST request failed' });
        }
    }

    const isError = (data: PostData | ErrorData): data is ErrorData =>
        'error' in data;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>API Demo</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter post Id (e.g. 1)"
                placeholderTextColor='#aaa'
                keyboardType="numeric"
                value={id}
                onChangeText={setId}
            />
            <Button title="Get Data" onPress={handleGet} />

            {getData && !isError(getData) && (
                <>
                    <Text style={styles.result}>
                        User Id: {getData.userId}{"\n\n"}
                        Title: {getData.title}{"\n\n"}
                        Body: {getData.body}
                    </Text>
                </>
            )}
            {getData && isError(getData) && (
                <Text style={styles.result}>Error: {getData.error}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Enter title to the post"
                placeholderTextColor="#aaa"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter body to the post"
                placeholderTextColor="#aaa"
                value={body}
                onChangeText={setBody}
            />
            <Button title="Post Data" onPress={handlePost} />

            {postResponse && (
                <Text style={styles.result}>
                    Successfully Posted with post id {postResponse.id}
                </Text>
            )}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    heading: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        color: '#fff',
        width: '100%',
        padding: 10,
        marginVertical: 10
    },

    result: {
        color: '#0f0',
        fontSize: 14,
        marginVertical: 10,
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 6,
        width: '100%'

    }
})
export default ApiCall