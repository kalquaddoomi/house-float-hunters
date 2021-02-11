import React from 'react'
import {TouchableOpacity, Text, View, Alert} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import * as FileSystem from 'expo-file-system';
import NavTray from "../components/NavTray";
import { Ionicons } from '@expo/vector-icons';



export default function SettingsScreen({ route, navigation }) {
    const localFloatStore = FileSystem.documentDirectory + 'floats.json'
    const [message, setMessage] = React.useState('')
    const resetLocalData = () => {
        const floatsUrl = 'https://house-float-hunters.s3.amazonaws.com/house_floats_clean.json'
        FileSystem.downloadAsync(
            floatsUrl,
            localFloatStore
        )
            .then(({ uri }) => {
                setMessage('All Trophies Deleted and Data Reset')
            })
            .catch(error => {
                console.error(error);
            });
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigNotice}>Settings</Text>
            <View style={styles.settingsContainer}>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={()=>{
                        Alert.alert(
                            "Confirm Reset",
                            "Are you sure you want to delete all your photos and trophies? Photos will be gone forever.",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => {},
                                    style: "cancel"
                                },
                                {
                                    text: "OK",
                                    onPress: () => {resetLocalData()},
                                    style: "ok"
                                }
                            ],
                            { cancelable: false }
                        );
                    }}
                >
                    <Ionicons name="ios-warning" size={40} color="#ff0000" />
                    <Text style={styles.settingsText}>Delete All Trophies and Start Again</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.settingsMessage}>{message}</Text>
            <NavTray navigation={navigation}/>
        </SafeAreaView>
    )
}