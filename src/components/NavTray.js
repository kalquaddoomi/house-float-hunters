import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View, Dimensions} from 'react-native';
import { MaterialIcons, EvilIcons, Ionicons } from '@expo/vector-icons'
import Constants from "expo-constants";

export default function NavTray({ navigation }) {
    return (
        <View>
            <View style={navStyles.tray}>
                <TouchableOpacity style={navStyles.navButton}
                    onPress={()=> {
                        navigation.navigate('House Floats')
                    }}
                >
                    <MaterialIcons name="house-siding" size={30} color="black" />
                    <Text style={navStyles.navButtonText}>Floats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={navStyles.navButton}
                                  onPress={()=> {
                                      navigation.navigate('Trophy Case')
                                  }}
                >
                    <EvilIcons name="trophy" size={30} color="black" />
                    <Text style={navStyles.navButtonText}>Trophies</Text>
                </TouchableOpacity>
                <TouchableOpacity style={navStyles.navButton}
                                  onPress={()=> {
                                      navigation.navigate('Settings')
                                  }}
                >
                    <Ionicons name="ios-settings-sharp" size={30} color="black" />
                    <Text style={navStyles.navButtonText}>Settings</Text>
                </TouchableOpacity>
            </View>
            <Text style={navStyles.versionText}>v: {Constants.manifest.version}</Text>
        </View>

    )
}

const navStyles = StyleSheet.create({
    tray: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 60,
        borderTopWidth: 4,
        borderTopColor: '#eee'
    },
    navButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        flex: 0.25,
        paddingLeft: 2,
        paddingRight: 2,
    },
    navButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },
    versionText: {
        fontSize: 12,
        alignSelf: 'flex-end',
        marginRight: 10
    }
})
