import React from 'react'
import {TouchableOpacity, Text, View, Alert, Switch} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import * as FileSystem from 'expo-file-system';
import NavTray from "../components/NavTray";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SettingsScreen({ route, navigation }) {
    const localFloatStore = FileSystem.documentDirectory + 'floats.json'
    const [message, setMessage] = React.useState('')

    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = async () => {
        if(isEnabled) {
            await AsyncStorage.setItem('hunter_track_speed', "5")
        } else {
            await AsyncStorage.setItem('hunter_track_speed', "30")
        }
        setIsEnabled(previousState => !previousState);
    }

    const resetLocalData = () => {
        const floatsUrl = 'https://house-float-hunters.s3.amazonaws.com/house_floats_clean.json'
        FileSystem.downloadAsync(
            floatsUrl,
            localFloatStore
        )
            .then(({ uri }) => {
                setMessage('All Trophies Deleted and Data Reset!')
                setTimeout(()=>{
                    navigation.navigate('Welcome')
                }, 1000)

            })
            .catch(error => {
                console.error(error);
            });
    }

    const updateFromJSONFile = () => {
        const updateFloatsStore = FileSystem.documentDirectory + 'updates.json'
        const floatsUrl = 'https://house-float-hunters.s3.amazonaws.com/house_floats_clean.json'
        FileSystem.downloadAsync(
            floatsUrl,
            updateFloatsStore
        )
            .then(({ uri }) => {
                FileSystem.readAsStringAsync(localFloatStore).then((localsData)=>{
                    FileSystem.readAsStringAsync(updateFloatsStore).then((updatesData) => {
                        const localFloats = JSON.parse(localsData)
                        const updateFloats = JSON.parse(updatesData)
                        updateFloats.map((update) => {
                            const localMatch = localFloats.filter((f) => {return f.id === update.id})[0]
                            if(localMatch.captured) {
                                update.captured = localMatch.captured
                                update.caught_time = localMatch.caught_time
                                update.the_photo = localMatch.the_photo
                            } else {
                                update.captured = false
                            }
                            if(localMatch !== null) {
                                update.huntRange = localMatch.huntRange
                            }
                        })
                        FileSystem.writeAsStringAsync(localFloatStore, JSON.stringify(updateFloats)).then(
                            ()=>{
                                setMessage('New Floats Download Complete')
                                setTimeout(()=>{
                                    navigation.navigate('Welcome')
                                }, 1000)
                            }
                        )
                    })
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        AsyncStorage.getItem('hunter_track_speed').then((huntSpeed) => {
            if(huntSpeed === "30") {
                setIsEnabled(true)
            } else {
                setIsEnabled(false)
            }
        })
    }, [])

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
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={()=>{
                        updateFromJSONFile()
                    }}
                >
                    <MaterialIcons name="system-update" size={40} color="black" />
                    <Text style={styles.settingsText}>Download Newly Added House Floats</Text>
                </TouchableOpacity>
                <View
                    style={styles.settingsButton}>
                    <Text style={styles.settingsText}>Follow Mode Speed:</Text>
                    <Text style={{alignSelf: 'center', marginLeft: 10, marginRight:3, marginTop: 5}}>WALK</Text>
                    <Switch
                        trackColor={{ false: '#fff', true: '#fff' }}
                        thumbColor={isEnabled ? '#750dd6' : '#F7DA6B'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                    <Text style={{alignSelf: 'center', marginLeft: 3, marginRight:5, marginTop: 5}}>DRIVE</Text>
                </View>
            </View>
            <Text style={styles.settingsMessage}>{message}</Text>
            <NavTray navigation={navigation}/>
        </SafeAreaView>
    )
}