import React from 'react'
import {TouchableOpacity, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles";
import moment from 'moment'
import NavTray from "../components/NavTray";
import { Ionicons } from '@expo/vector-icons';

export default function TrophyScreen({ route, navigation }) {
    const [trophy, setTrophy] = React.useState(route.params)
    return(
        <SafeAreaView style={styles.container}>
                <Image
                    style={styles.trophyPageImage}
                    source={(trophy.the_photo === 'STOCK' ? require('../../assets/stock_float.png') :{
                        uri: trophy.the_photo
                    })}
                    />
                <View style={styles.trophyPlaque}>
                    <View style={styles.trophyPlaqueColumn}>
                    <Ionicons name="ios-trophy-sharp" size={60} color="#D4AF37" />
                    </View>
                    <View style={styles.trophyPlaqueColumn}>
                        <Text style={styles.plaqueTitle}>{trophy.title}</Text>
                        <Text style={styles.plaqueCaught}>Caught On: {moment(trophy.caught_time).format(("MMMM Do YYYY, hh:mm a"))}</Text>
                        <Text style={styles.plaqueAddress}>At: {trophy.address}</Text>
                    </View>
                </View>
            <NavTray
                navigation={navigation}
                />
        </SafeAreaView>
    )
}