import React, { useState } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View, ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles.js';

import StateContext from './StateContext.js';

import frame00 from '../assets/images/Mframe_00.png';
import frame01 from '../assets/images/Mframe_01.png';
import frame02 from '../assets/images/Mframe_02.png';
import frame03 from '../assets/images/Mframe_03.png';
import frame04 from '../assets/images/Mframe_04.png';
import frame05 from '../assets/images/Mframe_05.png';
import frame06 from '../assets/images/Mframe_06.png';

export default function MHome(props){

    const frames = [
        { id: 0, src: frame00, title: "Frame 0" },
        { id: 1, src: frame06, title: "Frame 1" },
        { id: 2, src: frame05, title: "Frame 2" },
        { id: 3, src: frame04, title: "Frame 3" },
        { id: 4, src: frame03, title: "Frame 4" },
        { id: 5, src: frame02, title: "Frame 5" },
        { id: 6, src: frame01, title: "Frame 6" },
    ];


    return (
        <View style={styles.homeContainer}>
            <SafeAreaView  style={styles.homeScreen}>

                <TouchableOpacity
                    mode="contained"
                    style={styles.button}
                    labelStyle={styles.buttonText}
                    onPress={() => props.navigation.navigate('HowTo')}
                >
                    <Text style={styles.buttonText}>Start a new 4-cut!</Text>
                </TouchableOpacity>



                <Text style={styles.header}>Available Frames</Text>

                <View style={{ width: '100%' }}>
                    <ScrollView horizontal={true} style={styles.previewContainer}>
                        
                        {frames.map((item, index) => (
                    
                        <TouchableOpacity key={index}>
                            <Image
                                key={index}
                                source={item.src}
                                style={{ width: 120,
                                    height: 180,
                                    margin: 10,
                                    shadowColor: '#08090A',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                }}
                            />
                        </TouchableOpacity>
                    ))}

                        <TouchableOpacity style={styles.buttonSmall}
                            onPress={() => Alert.alert('This is awkward...', 
                                "This feature hasn't been completed yet. Come back soon!",
                                [{ text: 'OK'}])}>
                            {/* <Text style={styles.smallButtonText}>View all</Text> */}
                            <Icon name="chevron-forward-outline" size={30} color='#08090A'/>  
                        </TouchableOpacity>
                        
                        <View style={styles.endSpacer} />
                    </ScrollView>

                </View>
            </SafeAreaView>
        </View>
    )
}