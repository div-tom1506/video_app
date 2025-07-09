import { useRef, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { Video } from "expo-av";

// Accept video URL input from the user.

// Automatically pause/play on screen focus.

// Add fullscreen or mute options.

function SingleVideo() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const videoRef = useRef<Video>(null)

    const togglePlaying = async () => {
        const status = await videoRef.current?.getStatusAsync();
        if (status?.isPlaying) {
            await videoRef.current?.pauseAsync();
        } else {
            await videoRef.current?.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                onEnd={() => console.log("Video ended")}
                onError={event => {
                    console.error('Video Error: ', event)
                    Alert.alert('Video Error', 'Something went wrong', [
                        {
                            text: 'Ok',
                            onPress: () => console.log("Ok Pressed")
                        }
                    ])
                }}
                onReceiveAdEvent={event => console.log("Ad Triggered: ", event)}
                source={{
                    uri: 'https://storage.googleapis.com/gvabox/media/samples/stock.mp4',
                    // ad: {
                    //     adTagUrl: ''
                    // }
                }}
                style={styles.backgroundVideo}
                useNativeControls
                resizeMode='cover'
                isLooping
                shouldPlay={false} // don't autoplay
            />

            {/* <View style={styles.buttonContainer}>
                <Button
                    onPress={togglePlaying}
                    title={isPlaying ? 'Pause' : 'Play'}
                />
            </View> */}

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '80%',
    },
});

export default SingleVideo