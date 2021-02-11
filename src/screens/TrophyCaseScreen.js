import React from 'react'
import {TouchableOpacity, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import {useIsFocused} from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import moment from 'moment'
import NavTray from "../components/NavTray";

export default function TrophyCaseScreen({ route, navigation }) {
    const localFloatStore = FileSystem.documentDirectory + 'floats.json'
    const [trophies, setTrophies] = React.useState([])
    const isFocused = useIsFocused()
    React.useEffect(()=>{
        FileSystem.readAsStringAsync(localFloatStore).then((data) => {
            setTrophies(JSON.parse(data).filter((f) => f.captured))
        })
    }, [isFocused])

    const renderTrophyCard = (trophy) =>
        <View style={styles.trophyCard}>
            <Image
                style={styles.trophyImage}
                source={{
                    uri: trophy.item.the_photo
                }}
            />
            <View style={styles.trophyCardColumn}>
                <Text style={styles.trophyCardTitle}>{trophy.item.title}</Text>
                <Text style={styles.trophyCardAddress}>{trophy.item.address}</Text>
                <Text style={styles.trophyCardCatch}>Caught On: {moment(trophy.item.caught_time).format("MM/DD/YY, hh:mm a")} </Text>
                <TouchableOpacity
                    style={styles.trophyView}
                    onPress={()=>{
                        navigation.navigate('Trophy', trophy.item)
                    }}
                >
                    <Text style={styles.trophyViewText}>View Trophy</Text>
                </TouchableOpacity>
            </View>
        </View>
    console.log(trophies)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigNotice}>Your Trophy Case</Text>
            <Text style={styles.bigNotice}>Floats Caught:{trophies.length}</Text>
            <FlatList
                style={styles.trophyList}
                data={trophies}
                renderItem={item => renderTrophyCard(item)}
                keyExtractor={item => item.id.toString()}
            />
            <NavTray navigation={navigation} />
        </SafeAreaView>
    )
}