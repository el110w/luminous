import React, { useState } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View, ScrollView
} from 'react-native';
import { Button } from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import { NavigationContainer } from "@react-navigation/native";
import styles from '../styles.js';

import StateContext from './StateContext.js';

export default function MHowTo(props){

    return (
        <View style={styles.homeContainer}>
            <SafeAreaView  style={styles.homeScreen}>
                <ScrollView style={styles.textSection}>

                    <Text style={styles.pageTitle}>Welcome to 247!</Text>
                    <View style={styles.textSpacer}></View>
                    <Text style={styles.infoText}>This app is a photobooth you can use on the go. Here's how it works:</Text>

                    <Text style={styles.infoHeader}>1. Take your photos
                    </Text>
                    <Text style={styles.infoText}>Start the camera whenever you're ready! The camera will
                        take 6 photos of you, each 8 seconds apart.
                    </Text>

                    <Text style={styles.infoHeader}>2. Choose 4
                    </Text>
                    <Text style={styles.infoText}>Select which pictures you want to use in a 2x2 photo
                        frame. 
                    </Text>

                    <Text style={styles.infoHeader}>3. Personalize
                    </Text>
                    <Text style={styles.infoText}>Explore our collection of photobooth frames
                        to decorate your photos with.
                    </Text>

                    <Text style={styles.infoHeader}>5. Download
                    </Text>
                    <Text style={styles.infoText}>Save to your camera roll! Don't worry, this app is database-less so your photos are private to you!
                    </Text>
                </ScrollView>

                <Button
                    mode="contained"
                    style={styles.buttonMain}
                    labelStyle={styles.buttonMainText}
                    onPress={() => props.navigation.navigate('CameraPage')}
                >Ready to start</Button>
            
            </SafeAreaView>


            
        </View>
    )
}