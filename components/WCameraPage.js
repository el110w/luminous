import React, { useState, useRef } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View, ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../wstyles.js';

import StateContext from './StateContext.js';
import WWebCamera from './WWebCamera.js';

import * as ImageManipulator from 'expo-image-manipulator'; //used to flip image

import frame00 from '../assets/images/Mframe_00.png';
import frame01 from '../assets/images/Mframe_01.png';
import frame02 from '../assets/images/Mframe_02.png';
import frame03 from '../assets/images/Mframe_03.png';
import frame04 from '../assets/images/Mframe_04.png';
import frame05 from '../assets/images/Mframe_05.png';
import frame06 from '../assets/images/Mframe_06.png';

export default function WCameraPage(props){

    const frames = [
        { id: 0, src: frame00, title: "Frame 0" },
        { id: 1, src: frame06, title: "Frame 1" },
        { id: 2, src: frame05, title: "Frame 2" },
        { id: 3, src: frame04, title: "Frame 3" },
        { id: 4, src: frame03, title: "Frame 4" },
        { id: 5, src: frame02, title: "Frame 5" },
        { id: 6, src: frame01, title: "Frame 6" },
    ];

    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [picArray, setPicArray] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [picPrev, setPicPrev] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const [picsTaken, setPicsTaken] = useState(false);    

    const [permission, requestPermission] = useCameraPermissions();
    const webcamRef = useRef(null);

    //check browser's camera permissions
    if (!permission) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (!permission.granted) {
        return (
            <View>
                <Text>Camera permission is required.</Text>
                <Button onPress={requestPermission}>Grant Permission</Button>
            </View>
        );
    }


    /**
     * taking multiple pics automatically, showing feedback photo's been taken, and adding pics to picArray
     */
    const __takeMultiplePictures = async () => {
        setButtonPressed(true); //hides button so it can't be pressed again
        setPicsTaken(false);
        setPicArray([]);
        const newPics = []; // Array to hold the new pictures
        
        console.log("Button has been pressed! Taking multiple photos now...");
        //6 photos
        for (let i = 0; i < 6; i++) {
            
            // Wait for 3 seconds before taking the next picture
            setCountdown(8); // Change value depending on how long the timeout promise below is
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(countdownInterval);
                        return 0; // reset countdown
                    }
                    console.log("Seconds left until next picture taken:",prev-1);
                    return prev - 1;
                    
                });
                
            }, 1000) // update the counter every 1 sec


            
            await new Promise((resolve) => {
                setTimeout(async () => {
                    if (webcamRef.current && webcamRef.current.captureFrame) {
                        const imageSrc = await webcamRef.current.captureFrame();
                        
                        if (imageSrc) {
                            try {
                                const flippedImage = await ImageManipulator.manipulateAsync(
                                    imageSrc, 
                                    [{ flip: 'horizontal' }], 
                                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                                );
                                // const flippedImg = async () => {
                                //     imageSrc.flip(FlipType.horizontal);
                                // }
                                newPics.push({ uri: flippedImage.uri });
                                // Update the picArray state with the new pictures
                                setPicArray((prevPics) => [...prevPics, { uri: flippedImage.uri }]);
                                setPicPrev(flippedImage.uri);
                            } catch (error) {
                                console.error("Error flipping image:",error);
                            }
                            
                        }
                        
                    }
                    resolve();
                }, 9000);
            })

            console.log("Pictures taken:",i+1);
            console.log("newPics length:",newPics.length);
        }
    
        
    
        // Show preview of the last captured image
        setCapturedImage(newPics[newPics.length - 1]);
        setPreviewVisible(true);
        setPicsTaken(true);
        console.log("Finished taking all photos:",picsTaken);
        
    };
  

    /**
         * called when user chooses to retake photos
         * clears previously taken photo, camera type is last used
         * makes shutter button visible to be pressed again
         */
    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        setButtonPressed(false);
        setPicArray([]);
        setPicsTaken(false);
    }



    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.cameraContainer}>
            
            <SafeAreaView  style={styles.cameraHomeScreen}>

                <View style={styles.webcamContainer}>
                    <View style={{ position: 'relative' }}>
                        
                        <WWebCamera ref={webcamRef} onCapture={(img) => console.log("Captured Image:",img)}/>
                        
                            {countdown > 0 && (
                                <View style={styles.countdownOverlay}>
                                    <Text style={styles.countdownText}>{countdown}</Text>
                                </View>
                            )}

                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.webcamButtons}>
                {picsTaken ? (
                    <TouchableOpacity
                    onPress={__retakePicture}
                    style={{
                        width: 130,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 4,
                        marginRight: 180,
                    }}>
                    <Text style={{ color: '#000', fontSize: 18, }}>
                        Redo
                    </Text>
                    </TouchableOpacity> 
                    ) : <View style={{ width: 130 }}/>}


                <TouchableOpacity
                    style={{
                        width: 70,
                        height: 70,
                        borderWidth: 5,
                        borderRadius: 50,
                        marginTop: 10,
                        borderColor: buttonPressed ? '#888888' : '#08090A',
                        justifyContent: 'center',
                        alignContent: 'center',
                        padding: 5,
                    }}>
                    <TouchableOpacity
                        onPress={__takeMultiplePictures}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: '#08090A',
                            display: buttonPressed ? 'none' : 'flex',
                        }}
                    />
                </TouchableOpacity>

                        
                {picsTaken ? (
                    <TouchableOpacity
                            onPress={() => props.navigation.replace(
                                'DisplayImage', {picArray: picArray})}
                            style={{
                                width: 130,
                                height: 40,
                                alignItems: 'center',
                                borderRadius: 4,
                                marginLeft: 180,
                        }}>
                            <Text style={{ color: '#000', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                ) : <View style={{ width: 130 }}/>}
            </View>
            


            <SafeAreaView>

                <View style={{ width: '100%' }}>
                        
                        <ScrollView horizontal={true} style={styles.previewContainer}>   
                            {picArray.map((item, index) => (
                        
                            <TouchableOpacity key={index}>
                                <Image
                                    key={index}
                                    source={{ uri: item.uri }}
                                    style={{ width: 120,
                                        height: 90,
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
                        </ScrollView> 

                    </View>

            </SafeAreaView>

            
            
        </View>



                
           
        </ScrollView>



        



    )    
}
