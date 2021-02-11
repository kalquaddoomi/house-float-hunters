import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MainFloatsScreen from "./src/screens/MainFloatsScreen";
import FloatCaptureScreen from "./src/screens/FloatCaptureScreen";
import CameraCaptureScreen from "./src/screens/CameraCaptureScreen";
import KeepItScreen from "./src/screens/KeepItScreen";
import TrophyCaseScreen from "./src/screens/TrophyCaseScreen";
import TrophyScreen from "./src/screens/TrophyScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
const Stack = createStackNavigator();
import * as Sentry from 'sentry-expo';

Sentry.init({
    dsn: "https://bd6ba1852d8a4ae8b4c1f352ebcdc265@o518788.ingest.sentry.io/5632035",
    enableInExpoDevelopment: true,
    debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Welcome"}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="House Floats" component={MainFloatsScreen} />
            <Stack.Screen name="Float Capture" component={FloatCaptureScreen} />
            <Stack.Screen name="Catch Mode" component={CameraCaptureScreen} />
            <Stack.Screen name="Keep It?" component={KeepItScreen} />
            <Stack.Screen name="Trophy Case" component={TrophyCaseScreen} />
            <Stack.Screen name="Trophy" component={TrophyScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
