import React from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import * as FileSystem from 'expo-file-system';
import moment from 'moment'

export default function KeepItScreen({ route, navigation }) {
    const [float, setFloat] = React.useState(route.params.float)
    const localFloatStore = FileSystem.documentDirectory + 'floats.json'
    const makeACapture = async () => {
        let saveFloat = float
        const timeStamp = moment.now()
        saveFloat.captured = true
        saveFloat.caught_time = timeStamp
        saveFloat.the_photo = route.params.photo.uri
        let outFloats = []
        await FileSystem.readAsStringAsync(localFloatStore).then((data)=>{
            const allFloats = JSON.parse(data)
            outFloats = allFloats.map((checkFloat) => {
                if(checkFloat.id === saveFloat.id) {
                    return saveFloat
                } else {
                    return checkFloat
                }
            })
            console.log(outFloats)
            FileSystem.writeAsStringAsync(localFloatStore, JSON.stringify(outFloats)).then(
                ()=>{
                    navigation.navigate("Trophy Case", saveFloat)
                }
            )
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigNotice}>This is What You Caught:</Text>
            <Image
                style={styles.keepItPreview}
                source={{
                    uri: route.params.photo.uri
                }}
            />
            <Text style={styles.bigNotice}>You wanna keep it?</Text>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={ async () => {
                        await makeACapture()
                    }}>
                    <Text style={styles.buttonPurpleText}> Keep It! </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={ () => {
                        navigation.navigate('Catch Mode', float)
                    }}>
                    <Text style={styles.buttonPurpleText}> Throw It Back </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}