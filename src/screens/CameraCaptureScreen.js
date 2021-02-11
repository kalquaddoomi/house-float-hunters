import React from 'react'
import {TouchableOpacity, Text, View, Animated } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import { Camera } from 'expo-camera';

export default function CameraCaptureScreen({ route, navigation }) {
    const [float, setFloat] = React.useState(route.params)

    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [myCapture, setCapture] = React.useState(null)
    let myCamera;
    React.useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref => {
                    myCamera = ref;
                }}
            >
            </Camera>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={async () => {
                        let photo = await myCamera.takePictureAsync()
                        setCapture(photo)
                        navigation.navigate('Keep It?', {
                            photo: photo,
                            float: float
                        })
                    }}>
                    <Text style={styles.buttonPurpleText}>Catch this Wild Float!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={() => {
                        navigation.navigate('Float Capture', float)
                    }}>
                    <Text style={styles.buttonPurpleText}>I'm not READY! RUN AWAY!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={styles.buttonPurpleText}>Flip Camera</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}