import React from 'react'
import {StyleSheet, Image, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../styles/styles"
import Constants from 'expo-constants';

export default function WelcomeScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>

            <Image
                style={styles.welcome_header}
                source={require('../../assets/hfh2.png')}
            />
            <ScrollView style={styles.game_guide}>
            <Text style={styles.welcome_block}>
                Welcome House Float Hunter! House Floats have appears all over the City of New Orleans, and beyond,
                and it's up to you to catch them all!
            </Text>
            <Text style={styles.welcome_block}>
                We have attempted to locate all of the House Floats in the known world. Find each of the House Floats.
                When you get close to your target, click the "Catch It" button to be taken to a close up map of the
                house float. If you're in range, capture it by taking a picture of it and add it to your trophy
                case. Otherwise, get closer and snap that picture.
            </Text>
            <Text style={styles.welcome_block}>
                Keep going, catch them all! Remember: Be Safe, Keep Your Distance from others, and Wear a Mask.
                Wash your hands when you get home. It's wild out there.
            </Text>
            <Text style={styles.welcome_block}>
                Enjoy the game!
            </Text>
            <Text style={styles.suggestions}>
            If you have any problems or suggestions, email: kalquaddoomi@gmail.com,
                version: {Constants.manifest.version}
            </Text>
            <TouchableOpacity
                style={styles.start_button}
                onPress={()=>{
                    navigation.navigate('House Floats')
                }}>
                <Text style={styles.start_text}>Start Hunting!</Text>
            </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}

