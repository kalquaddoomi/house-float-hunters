import React from 'react'
import {TouchableOpacity, Text, View, Animated, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';
import {useIsFocused} from "@react-navigation/native";
import NavTray from "../components/NavTray";


export default function FloatCaptureScreen({ route, navigation }) {
    const catchRange = 100
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
                            }
                        );
                    }}>
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

    return (
    <Animated.View
                style={[
                    styles.container,
                    {
                        backgroundColor: colorAnim.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: ["rgb(247, 218, 107)", "rgb(117, 13, 214)", "rgb(93, 141, 3)"]
                        })
                    },
                ]}
            >
        <SafeAreaView style={styles.container}>
        {(float.huntRange < catchRange ? <Text style={styles.bigNotice}>A WILD HOUSE FLOAT APPEARS!!!</Text> : <></>)}
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
            </ScrollView>
            <NavTray
                navigation={navigation} />
        </SafeAreaView>
    </Animated.View>

    )
}