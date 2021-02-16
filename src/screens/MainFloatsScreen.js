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
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [hunterLocReady, setHunterLocReady] = React.useState(false)
    const [trackingHunter, setTrackingHunter] = React.useState('Off')
    const [trackUnsubscribe, setTrackUnsubscribe] = React.useState(null)
    const [hunterPosition, setHunterPosition] = React.useState({coords:
            {
                latitude: 0,
                longitude:0
            }
    })
    const [huntSettings, setHuntSettings] = React.useState( {followSpeed: 30})
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

    const updateHunterPosition = (location) => {
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
                latitudeDelta: 0.006,
                longitudeDelta: 0.0012
            })
            floats.sort((a, b) => (a.huntRange > b.huntRange) ? 1 : -1)
        }

        setWildFloats(floats.filter((float) => {
            return (typeof float.captured === 'undefined' || float.captured !== true);
        }))
        setHunterLocReady(true)
    }

    React.useEffect(() => {
        ( async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }

                if(hunterPosition.coords.latitude === 0) {
                    setHunterLocReady(false)
                    Location.getLastKnownPositionAsync({}).then((location) => {
                        updateHunterPosition(location)
                    });
                } else {
                    setWildFloats(floats.filter((float) => {
                        return (typeof float.captured === 'undefined' || float.captured !== true);
                    }))
                }
                const huntTrackSpeed = await AsyncStorage.getItem('hunter_track_speed')
                setHuntSettings({followSpeed: parseInt(huntTrackSpeed)})
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
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                {(trackingHunter !== 'Working' ?
                    <TouchableOpacity style={styles.updatePositionBarIcon}
                                      onPress={()=>{
                                          setTrackingHunter('Working')
                                          if(trackingHunter === 'Off') {
                                              Location.watchPositionAsync({distanceInterval: huntSettings.followSpeed},
                                                  updateHunterPosition).then((stopWatch) => {
                                                      setTrackingHunter('On')
                                                      setTrackUnsubscribe(stopWatch)
                                              })
                                          } else {
                                              trackUnsubscribe.remove()
                                              setTrackingHunter('Off')
                                          }

                                      }}
                    >
                        <MaterialIcons style={{flex:2, marginTop: 8}} name={trackingHunter === 'On' ? "gps-fixed" : "gps-off"} size={20} color="black" />
                        <Text style={styles.updatePositionBarText}>Follow:</Text>
                        <Text style={styles.updatePositionBarText}>{trackingHunter}</Text>
                    </TouchableOpacity>
                    :
                    <ActivityIndicator style={{flex: 1}} size={"large"} color={"green"}/>
                )}
                <Text style={styles.headerTitleNotice}>Floats in the Wild: {(wildFloats.length === 0 ? 'One Sec...' : wildFloats.length)}</Text>
                {hunterLocReady ?
                    <TouchableOpacity style={styles.updatePositionBarIcon}
                    onPress={()=>{
                        setHunterLocReady(false)
                        Location.getCurrentPositionAsync().then((huntLoc) => {
                            updateHunterPosition(huntLoc)
                        })
                    }}
                    >
                        <MaterialIcons style={{flex:2, marginTop: 8}} name="refresh" size={20} color="black" />
                        <Text style={styles.updatePositionBarText}>Update My</Text>
                        <Text style={styles.updatePositionBarText}>Location</Text>
                    </TouchableOpacity>
                    :
                    <ActivityIndicator style={{flex: 1}} size={"large"} color={"green"}/>
                    }

            </View>
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
            {(
                wildFloats.length === 0 ?
                <ActivityIndicator style={{flex:1}} size={'large'} color={'green'}/> :
                <FlatList
                    style={styles.floatList}
                    data={wildFloats}
                    renderItem={item => renderFloatCard(item)}
                    keyExtractor={item => item.id.toString()}
                />
            )}
            <NavTray
                navigation={navigation}
                />
        </SafeAreaView>
    )
}