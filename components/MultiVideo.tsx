import { Video } from "expo-av";
import { useRef, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

interface VideoItem {
    id: string;
    uri: string;
    title: string;
    adTagUrl?: string
}

const videoData: VideoItem[] = [
    {
        id: '1',
        uri: 'https://storage.googleapis.com/gvabox/media/samples/stock.mp4',
        title: 'Stock Video 1',
        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpostoptimizedpodbumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator=',
    },

    {
        id: '2',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Big Buck Bunny'
    },

    {
        id: '3',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: "Elephant's Dream",
    },

    {
        id: '4',
        uri: 'https://storage.googleapis.com/gvabox/media/samples/stock.mp4',
        title: 'Stock Video 2',
        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpostoptimizedpodbumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator=',
    }
]

function MultiPlayerVideo() {
    const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({})

    const togglePlaying = (videoId: string) => {
        setPlayingVideos(prev => ({
            ...prev,
            [videoId]: !prev[videoId] || false
        }))
    }

    const renderVideoItem = ({ item }: { item: VideoItem }) => {
        const videoRef = useRef(null)
        const isPlaying = playingVideos[item.id] || false

        return (
            <View style={styles.videoItemContainer}>
                <Text style={styles.videoTitle}>{item.title}</Text>

                <Video
                    ref={videoRef}
                    onEnd={() => console.log(`Video ${item.title} ended`)}
                    onError={
                        Alert.alert('Video Error', `Error Playing ${item.title}`, [
                            {
                                text: 'Ok',
                                onPress: () => console.log('OK pressed')
                            }
                        ])
                    }
                    onReceiveAdEvent={() => console.log(`Ad triggered for ${item.title}`)}
                    source={{
                        uri: item.uri,
                        ...(item.adTagUrl ? { ad: { adTagUrl: item.adTagUrl } } : {})
                    }}
                    style={styles.video}
                    useNativeControls
                    resizeMode='cover'
                    isLooping
                    shouldPlay={false} // don't autoplay
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => togglePlaying(item.id)}
                        title={isPlaying ? 'Pause' : 'Play'}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={videoData}
                renderItem={renderVideoItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    listContent: {
        padding: 10,
    },
    videoItemContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    video: {
        width: '100%',
        height: 200,
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    }
})

export default MultiPlayerVideo
