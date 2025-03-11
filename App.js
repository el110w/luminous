import React, { useState } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
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
import Home from './components/Home.js';
import CameraPage from './components/CameraPage';
import HowTo from './components/HowTo.js';
import DisplayImage from './components/DisplayImage.js';
import ExploreLibrary from './components/ExploreLibrary.js';
import ChooseFrame from './components/ChooseFrame.js';

export default function App() {

  let [fontsLoaded] = useFonts({
    'Playfair': require('./assets/fonts/Playfair-VariableFont_opsz,wdth,wght.ttf'),
    'PlayfairItalic': require('./assets/fonts/Playfair-Italic-VariableFont_opsz,wdth,wght.ttf'),
  })

  function formatJSON(jsonVal) {
      return JSON.stringify(jsonVal, null, 2);
  }

  const Stack = createNativeStackNavigator();


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
                component={Home}
                options={{
                    title: '247', //sets header text so it doesn't have to be the name val
                    headerTintColor: '#08090A',
                    headerTitleStyle: { fontFamily: 'PlayfairItalic', 
                        fontSize: 36, },
                }}
            />

            <Stack.Screen  
                name="CameraPage"
                component={CameraPage}
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
                component={HowTo}
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
                component={DisplayImage}
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
                component={HowTo}
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
                component={ChooseFrame}
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


