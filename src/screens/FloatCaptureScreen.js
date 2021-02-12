import React from 'react'
import {TouchableOpacity, Text, View, Animated, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';
import {useIsFocused} from "@react-navigation/native";
import NavTray from "../components/NavTray";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from "moment";
import * as FileSystem from "expo-file-system";

export default function FloatCaptureScreen({ route, navigation }) {
    const catchRange = 30
    const isFocused = useIsFocused()
    const [float, setFloat] = React.useState(route.params)
    const [locReady, setLocReady] = React.useState(false)
    const [hunterLocation, setHunterLocation] = React.useState(
        {
            coords: {
                latitude: 0,
                longitude: 0,
            }
        })
    const colorAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(()=>{
        ( async () => {
            console.log("Updating Positon")
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setHunterLocation(location)
            setLocReady(true)
            float.huntRange = parseFloat(haversine(
                {
                    latitude: float.coordinates.latitude,
                    longitude: float.coordinates.longitude
                },
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }, {unit: 'meter'}
            ).toFixed(2))
        })();
    }, [isFocused]);

    const cycleMap = [2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0].map((i) => {
        return (Animated.spring(colorAnim, {
            toValue: i,
            duration: 500,
            useNativeDriver: false
        }))
    })
    const cycleColors = Animated.sequence(cycleMap)

    const recalculateDistance  = (location) => {
        float.huntRange = parseFloat(haversine(
            {
                latitude: float.coordinates.latitude,
                longitude: float.coordinates.longitude
            },
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }, {unit: 'meter'}
        ).toFixed(2))
        setFloat(float)
    }

    const capture = () => {
        if(float.huntRange <= catchRange ) {
            cycleColors.start()
            return (
            <TouchableOpacity
                    style={styles.catchFloatButton}
                    onPress={ ()=>{
                        navigation.navigate('Catch Mode', float)
                    }}
                >
                <Text style={styles.catchFloatText}>
                    CATCH THIS FLOAT!
                </Text>
            </TouchableOpacity>
            )
        }
        return (
            <View style={styles.getCloser}>
                <Text style={styles.getCloserText}>
                    You need to get closer to this House Float to catch it.
                </Text>
                {(locReady ?
                <TouchableOpacity
                    style={styles.updatePosition}
                    onPress={()=>{
                        setLocReady(false)
                        Location.getCurrentPositionAsync({})
                            .then((coords)=> {
                                setHunterLocation(coords)
                                setLocReady(true)
                                recalculateDistance(hunterLocation)
                            }
                        );
                    }}>
                    <MaterialIcons style={{flex: 0.3}} name="gps-not-fixed" size={24} color="black" />
                    <Text style={styles.updatePositionText}>
                        Update My Position
                    </Text>
                </TouchableOpacity> :
                <View>
                    <Text>Updating Your Location</Text>
                    <ActivityIndicator size={'large'} color={'green'}/>
                </View>
                )}
            </View>
        )
    }

    const makeASkipCapture = async (float) => {
        const localFloatStore = FileSystem.documentDirectory + 'floats.json'
        let saveFloat = float
        const timeStamp = moment.now()
        saveFloat.captured = true
        saveFloat.caught_time = timeStamp
        saveFloat.the_photo = 'STOCK'
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
            FileSystem.writeAsStringAsync(localFloatStore, JSON.stringify(outFloats))
        })
        return saveFloat
    }

    return (

        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[
                    styles.flashContainer,
                    {
                        backgroundColor: colorAnim.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: ["rgb(247, 218, 107)", "rgb(117, 13, 214)", "rgb(93, 141, 3)"]
                        })
                    },
                ]}
            >
        {(float.huntRange < catchRange ? <Text style={styles.bigNotice}>A WILD HOUSE FLOAT APPEARS!!!</Text> : <></>)}
            </Animated.View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: float.coordinates.latitude,
                    longitude: float.coordinates.longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }}
            >
                    <Marker
                        key={`mark-${float.id}`}
                        coordinate={
                            {
                                latitude: float.coordinates.latitude,
                                longitude: float.coordinates.longitude
                            }
                        }
                    />
                    <Marker
                        coordinate={{
                            latitude: hunterLocation.coords.latitude,
                            longitude: hunterLocation.coords.longitude
                        }}
                        pinColor={'#8800ff'}
                    />
            </MapView>
            <ScrollView>
            <Text style={styles.floatCaptureTitle}>{float.title}</Text>
            <Text style={styles.floatCaptureAddress}>{float.address}</Text>
            <Text style={styles.floatCaptureRange}>Range: {float.huntRange} meters</Text>
            {capture()}
            <TouchableOpacity
                style={styles.skipCatchingButton}
                onPress={()=>{
                        Alert.alert(
                            "Confirm Auto Capture",
                            "Automatic Capture will remove this Float from your list of House Floats to catch and put it in the trophy case. A default Image will be assigned to it, but you won't be able to take a photo of it later. Do you still want to do this?",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => {},
                                    style: "cancel"
                                },
                                {
                                    text: "YES",
                                    onPress: () => {
                                        makeASkipCapture(float).then((saveFloat)=> {
                                            navigation.navigate('Trophy', saveFloat)
                                        })
                                    },
                                    style: "Ok"
                                }
                            ],
                            { cancelable: false }
                        );
                }}
                >
                <MaterialCommunityIcons style={{flex: 0.4}} name="home-remove" size={30} color="red" />
                <Text style={styles.skipCatchingText}>I don't want to hunt this one down. Capture this Float Automatically.</Text>
            </TouchableOpacity>
            </ScrollView>
            <NavTray
                navigation={navigation} />
        </SafeAreaView>
    )
}