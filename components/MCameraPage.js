import React, { useState, useEffect, useRef  } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View, Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {CameraView, Camera, CameraType, useCameraPermissions } from 'expo-camera';

console.log('camera================',Camera);
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles.js';

import StateContext from './StateContext.js';

import * as ImageManipulator from 'expo-image-manipulator'; //used to flip image
import * as FileSystem from 'expo-file-system'; //download photo?
import * as MediaLibrary from 'expo-media-library'; //trying to download to ios photos app


let camera;


export default function MCameraPage(props){

    const [startCamera, setStartCamera] = useState(true);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraType, setCameraType] = useState('front');
    const [flashMode, setFlashMode] = useState('off');
    const [picArray, setPicArray] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [picPrev, setPicPrev] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const [picsTaken, setPicsTaken] = useState(false);

    const cameraTypeRef = useRef(cameraType);
    
    // The following hook requests camera permissions, which are 
    // stored in the permissions variable. 
    const [permission, requestPermission] = useCameraPermissions();


    useEffect(() => {
        cameraTypeRef.current = cameraType; // Update ref whenever cameraType changes
    }, [cameraType]);


    // Calculate the width/height for 4:3 aspect ratio
    const screenWidth = Dimensions.get('window').width;
    const previewHeight = (screenWidth * 4) / 3;
  
    const __startCamera = async () => {
        // In order for permission requests to work on an iOS device, 
        // in app settings for Expo Go, give Expo Go access to Camera.
        // If Expo Go does not have access to Camera, every permission
        // request will be denied!
        console.log('Requesting permission');
        // Need to call requestPermission() explicitly. 
        // * If permission has not be granted before, it will ask for permission
        //   in a popup window.
        // * If permission has been requested before, it will not
        //   ask for permission again. 
        perm = await requestPermission(); // Explicitly call 
        console.log('perm', perm);
        let { status } = perm; // Use perm rather than permission. 
                                // Otherwise there is a one-render delay. 
        if (status === 'granted') {
            console.log('setStartCamera(true)')
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }
  
   
    /**
     * taking multiple pics automatically, showing feedback photo's been taken, and adding pics to picArray
     */
    const __takeMultiplePictures = async () => {
        
        const newPics = []; // Array to hold the new pictures
        setButtonPressed(true); //hides button so it can't be pressed again

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
                    return prev - 1;
                });
            }, 1000) // update the counter every 1 sec



            await new Promise((resolve) => setTimeout(resolve, 8000));

            const photo = await camera.takePictureAsync();
            console.log('Picture taken:', photo);

            let processedPhoto = photo;

            // Flip the image if taken with the front camera
            if (cameraTypeRef.current === 'front') {
                processedPhoto = await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [{ flip: ImageManipulator.FlipType.Horizontal }],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );
                newPics.push(processedPhoto);
            } else {
                newPics.push(photo);
            }

            setPicPrev(processedPhoto); //set pic to preview

            //preview photo for 1 second before getting ready for next photo
            setStartCamera(false);
            setPreviewVisible(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("preview hidden now")
            setPreviewVisible(false);
            setStartCamera(true);
        }
    
        // Update the picArray state with the new pictures
        setPicArray((prevPics) => [...prevPics, ...newPics]);
    
        // Show preview of the last captured image
        setCapturedImage(newPics[newPics.length - 1]);
        setPreviewVisible(true);
        setPicsTaken(true);
    };
  
   
    /**
     * called when user chooses to retake photos
     * clears previously taken photo, camera type is last used
     * makes shutter button visible to be pressed again
     */
    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        __startCamera();
        setButtonPressed(false);
        setCameraType('front');
        setFlashMode(false);
        setPicArray([]);
        setPicsTaken(false);
    }
  
    /**
     * toggles the flash on/off when the icon is switched
     */
    const __handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }
    }
  
    /**
     * toggles front/back camera
     */
    const __switchCamera = () => {
        console.log("switchCamera button pressed, was", cameraType);
        if (cameraType === 'back') {
            setCameraType('front')
        } else {
            setCameraType('back')
        }
        console.log("switchCamera button pressed, showing", cameraType);
    }
  
    
    return (
        <SafeAreaView style={styles.cameraContainer}>
            {startCamera ? (
                <SafeAreaView style={{
                    flex: 1,
                    width: '100%',
                    }}
                >
                {previewVisible && capturedImage ? (
                    <CameraPreview photo={capturedImage} picArray={picArray} 
                        retakePicture={__retakePicture} props={props}
                        previewHeight={previewHeight}/>
                ) : (
                <CameraView
                    facing={cameraType}
                    flashMode={flashMode}
                    style={{width: screenWidth, 
                        height: previewHeight,
                    }}

                    ref={(r) => {
                        camera = r
                    }}
                >
                    <SafeAreaView
                        style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: 'transparent',
                            flexDirection: 'row'
                        }}
                    >
                        {countdown > 0 && (
                            <View style={styles.countdownOverlay}>
                                <Text style={styles.countdownText}>{countdown}</Text>
                            </View>
                        )}
                    </SafeAreaView>
                </CameraView>
                )}
                <StatusBar style="auto" />
            
            </SafeAreaView>

            ) : (

                <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: '#B3C4FF',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                  <Image source={{uri: picPrev && picPrev.uri}}
                      style={{
                          flex: 1,
                          width: '100%',
                          height: previewHeight,
                      }}
                  ></Image>
                
              </SafeAreaView>
            )}
            
            <View style={{marginBottom: -22,}}>
                <SafeAreaView
                    style={{
                        alignSelf: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        position: 'absolute',
                        marginTop: 60,
                    }}
                > 
                    <TouchableOpacity
                                onPress={__handleFlashMode}
                                style={{
                                    borderRadius: 5,
                                    height: 50,
                                    width: 50,
                                    marginRight: 60,
                                    display: picsTaken ? 'none' : 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >

                            {flashMode === 'off' ? 
                                <Icon name="flash-off-outline" size={30} color="#fff"/> 
                                : 
                                <Icon name="flash" size={30} color='#fff'/>}
   
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 80,
                            height: 80,
                            borderWidth: 5,
                            borderRadius: 50,
                            borderColor: buttonPressed ? '#888888' : '#fff',
                            justifyContent: 'center',
                            alignContent: 'center',
                            padding: 5,
                        }}>
                        <TouchableOpacity
                            onPress={__takeMultiplePictures}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                                backgroundColor: '#fff',
                                display: buttonPressed ? 'none' : 'flex',
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                                onPress={__switchCamera}
                                style={{
                                    borderRadius: 5,
                                    height: 50,
                                    width: 50,
                                    marginLeft: 70,
                                    display: picsTaken ? 'none' : 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                            {cameraType === 'front' ? 
                                <Icon name="camera-reverse-outline" size={35} color='#fff'/> 
                                : 
                                <Icon name="camera-reverse" size={35} color='#fff'/>}
                        </TouchableOpacity>
                </SafeAreaView>
            </View>
      
            <StatusBar style="auto" />
            <SafeAreaView style={{margin: 20, pointerEvents: 'none',height: 180}}>
              <Text>.</Text>
              <Image source={'./images/favicon.png'} style={{width: '100$', height: 100}}></Image>
            </SafeAreaView>

            
          
        </SafeAreaView>
      )
    }
    
    
    const CameraPreview = ( {photo, retakePicture, picArray, props, previewHeight} ) => {
        console.log('Photo object', photo)
        return (
            <SafeAreaView style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: previewHeight
            }}>
                <ImageBackground source={{uri: photo && photo.uri}}
                    style={{
                        flex: 1,
                        width: '100$',
                        height: previewHeight
                    }}>
                <SafeAreaView style={{
                    flex: 1,
                    flexDirection: 'column',
                    padding: 15,
                    justifyContent: 'flex-end'
                }}>
                    <SafeAreaView style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        bottom: -130,
                    }}>
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={{
                                width: 130,
                                height: 40,
                                alignItems: 'center',
                                borderRadius: 4
                        }}>
                            <Text style={{ color: '#fff', fontSize: 20, }}>
                                Redo
                            </Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity
                            onPress={() => props.navigation.replace(
                                'DisplayImage', {picArray: picArray})}
                            style={{
                                width: 130,
                                height: 40,
                                alignItems: 'center',
                                borderRadius: 4
                        }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaView>
      )
}

