import React from 'react'
import { TouchableOpacity, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native'
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import haversine from 'haversine';
import NavTray from "../components/NavTray";

export default function MainFloatsScreen({ navigation }) {
    const [region, setRegion] = React.useState({
        latitude: 29.951065,
        longitude: -90.071533,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const isFocused = useIsFocused()
    const [floats, setFloats] = React.useState([])
    const [wildFloats, setWildFloats] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [hunterPosition, setHunterPosition] = React.useState({coords:
            {
                latitude: 0,
                longitude:0
            }
    })
    const localFloatStore = FileSystem.documentDirectory + 'floats.json'

    React.useEffect( ()=>{
        FileSystem.getInfoAsync(localFloatStore).then((info)=> {
            if(info.exists){
                FileSystem.readAsStringAsync(localFloatStore).then((data)=>{
                    setFloats(JSON.parse(data))
                    setLoaded(true)
                })
            } else {
                getFloatsAPI()
            }
        })
    }, [])

    React.useEffect(() => {
        ( async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                if(location !== null) {
                    setHunterPosition(location)
                    floats.map((float) => {
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
                    })

                    setRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.014,
                        longitudeDelta: 0.024
                    })
                    floats.sort((a, b) => (a.huntRange > b.huntRange) ? 1 : -1)
                }

                setWildFloats(floats.filter((float) => {
                    if((typeof float.captured === 'undefined' || float.captured !== true)) {
                        return true
                    }
                    return false
                }))

        })().catch(error=>{
            console.log(error)
            floats.map((float) => {
                float.huntRange = -1
            })
            setWildFloats(floats.filter((float) => {
                if((typeof float.captured === 'undefined' || float.captured !== true)) {
                    return true
                }
                return false
            }))
        });
    }, [loaded, isFocused])


    const getFloatsAPI = () => {
        const floatsUrl = 'https://house-float-hunters.s3.amazonaws.com/house_floats_clean.json'
        FileSystem.downloadAsync(
            floatsUrl,
            localFloatStore
        )
            .then(({ uri }) => {
                FileSystem.readAsStringAsync(uri).then((data) => {
                    setFloats(JSON.parse(data))
                    setLoaded(true)
                })
            })
            .catch(error => {
                console.error(error);
            });
     }

    const renderFloatCard = (floatData) =>
            <View style={styles.floatCard}>
                <Text style={styles.floatCardTitle}>{floatData.item.title}</Text>
                <Text style={styles.floatCardAddress}>{floatData.item.address}</Text>
                <View style={styles.floatCardRow}>
                   <Text>Distance: {floatData.item.huntRange > 0 ? `${floatData.item.huntRange}m` : floatData.item.huntRange === -1 ? 'Unavailable' : 'Calculating...'} </Text>
                    <TouchableOpacity
                        style={styles.floatCatch}
                        onPress={()=>{
                            navigation.navigate('Float Capture', floatData.item)
                        }}
                    >
                        <Text style={styles.floatCatchText}>Catch This Float</Text>
                    </TouchableOpacity>
                </View>
            </View>


    console.log(hunterPosition)
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigNotice}>Floats in the Wild: {wildFloats.length}</Text>
            <MapView
                style={styles.fullMap}
                region={region}
            >
            {
                wildFloats.map((float) => {
                    return (
                        <Marker
                            key={`mark-${float.id}`}
                            coordinate={
                                {
                                    latitude: float.coordinates.latitude,
                                    longitude: float.coordinates.longitude
                                }
                            }
                            onPress={() => {
                                navigation.navigate('Float Capture', float)
                            }}
                        />
                    )

                })
            }
            {
                hunterPosition.coords.longitude !== 0 &&
                <Marker
                    key={'hunter-position'}
                    coordinate={
                        {
                            latitude: hunterPosition.coords.latitude,
                            longitude: hunterPosition.coords.longitude
                        }
                    }
                    pinColor={'blue'}
                />
            }
            </MapView>
            <FlatList
                style={styles.floatList}
                data={wildFloats}
                renderItem={item => renderFloatCard(item)}
                keyExtractor={item => item.id.toString()}
            />
            <NavTray
                navigation={navigation}
                />
        </SafeAreaView>
    )
}