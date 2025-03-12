import React, { useState } from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from 'react-native-vector-icons/Ionicons';

import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

import styles from './styles';
import StateContext from './components/StateContext.js';

// web components
import WHome from './components/WHome.js';
import WWebcam from './components/WWebcam.js';
import WCameraPage from './components/WCameraPage.js';

// iOS components
import MHome from './components/MHome.js';
import MCameraPage from './components/MCameraPage.js';
import MHowTo from './components/MHowTo.js';
import MDisplayImage from './components/MDisplayImage.js';
import MExploreLibrary from './components/MExploreLibrary.js';
import MChooseFrame from './components/MChooseFrame.js';

export default function App() {

  let [fontsLoaded] = useFonts({
    'Playfair': require('./assets/fonts/Playfair-VariableFont_opsz,wdth,wght.ttf'),
    'PlayfairItalic': require('./assets/fonts/Playfair-Italic-VariableFont_opsz,wdth,wght.ttf'),
  })

  function formatJSON(jsonVal) {
      return JSON.stringify(jsonVal, null, 2);
  }

  const Stack = createNativeStackNavigator();

  if (Platform.OS === 'web') {
    return (
        <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: '#fff'},
            }}
            initialRouteName="Home">

            <Stack.Screen
                name="Home"
                component={WHome}
                options={{
                    title: '247', //sets header text so it doesn't have to be the name val
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic', 
                        fontSize: 52, },
                        headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen  
                name="WCameraPage"
                component={WCameraPage}
                options={{
                    title: '247',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic', 
                        fontSize: 52, },
                    headerBackTitleVisible: false,
                    headerBackButtonMenuEnabled: false,
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen  
                name="HowTo"
                component={MHowTo}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen  
                name="DisplayImage"
                component={MDisplayImage}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                    headerBackVisible: true,
                    gestureEnabled: false,
                }}
            />

            <Stack.Screen  
                name="ExploreLibrary"
                component={MHowTo}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                }}
            />

            <Stack.Screen  
                name="ChooseFrame"
                component={MChooseFrame}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    gestureEnabled: false,
                    // headerRight: () => (
                    //     <TouchableOpacity onPress={__savePhoto}>
                    //     <Text style={ styles.headerNext }>Save</Text>
                    //     </TouchableOpacity>
                    // ),
                }}
            
            />


        </Stack.Navigator>
    </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: '#fff'},
            }}
            initialRouteName="Home">

            <Stack.Screen
                name="Home"
                component={MHome}
                options={{
                    title: '247', //sets header text so it doesn't have to be the name val
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic', 
                        fontSize: 36, },
                }}
            />

            <Stack.Screen  
                name="CameraPage"
                component={MCameraPage}
                options={{
                    title: '247',
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic', 
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#08090A',
                    },
                    headerBackButtonMenuEnabled: false,
                }}
            />

            <Stack.Screen  
                name="HowTo"
                component={MHowTo}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                }}
            />

            <Stack.Screen  
                name="DisplayImage"
                component={MDisplayImage}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                    headerBackVisible: true,
                    gestureEnabled: false,
                }}
            />

            <Stack.Screen  
                name="ExploreLibrary"
                component={MHowTo}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                }}
            />

            <Stack.Screen  
                name="ChooseFrame"
                component={MChooseFrame}
                options={{
                    title: '247',
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic',
                        fontSize: 36, },
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    gestureEnabled: false,
                    // headerRight: () => (
                    //     <TouchableOpacity onPress={__savePhoto}>
                    //     <Text style={ styles.headerNext }>Save</Text>
                    //     </TouchableOpacity>
                    // ),
                }}
            
            />


        </Stack.Navigator>
    </NavigationContainer>
);
}


