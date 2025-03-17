import React, { useState, useRef, useEffect } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View, Dimensions, ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import { NavigationContainer } from "@react-navigation/native";
import ViewShot from 'react-native-view-shot'; //combine multiple photos into one
import * as FileSystem from 'expo-file-system'; //download photo?
import * as MediaLibrary from 'expo-media-library'; //trying to download to ios photos app
import styles from '../styles.js';

import StateContext from './StateContext.js';

import frame00 from '../assets/images/MFrames/Mframe_00.png';
import frame01 from '../assets/images/MFrames/Mframe_01.png';
import frame02 from '../assets/images/MFrames/Mframe_02.png';
import frame03 from '../assets/images/MFrames/Mframe_03.png';
import frame04 from '../assets/images/MFrames/Mframe_04.png';
import frame05 from '../assets/images/MFrames/Mframe_05.png';
import frame06 from '../assets/images/MFrames/Mframe_06.png';

export default function WChooseFrame({ route, navigation }){

    const { fourImages } = route.params;

    const frameArray = [
            { id: 0, src: frame00, title: "Frame 0" },
            { id: 1, src: frame06, title: "Frame 1" },
            { id: 2, src: frame05, title: "Frame 2" },
            { id: 3, src: frame04, title: "Frame 3" },
            { id: 4, src: frame03, title: "Frame 4" },
            { id: 5, src: frame02, title: "Frame 5" },
            { id: 6, src: frame01, title: "Frame 6" },
        ];

    const [chosenFrame, setChosenFrame] = useState(frameArray[0]); // store the uri

    // Calculate the width/height for 4:3 aspect ratio
    const picWidth = Dimensions.get('window').width;
    const picHeight = (picWidth * 4) / 3;

    const viewShotRef = useRef(null);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={__savePhoto}>
                    <Text style={styles.headerNext}>Save</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    /**
     * User chooses which frame to use
     */
    const __select = (index) => {
        
        const selectedItem = frameArray[index];
        setChosenFrame(selectedItem); // keep track of which frame is chosen
        
        if (selectedItem) {
            console.log("a frame was selected");
            const selectedUri = selectedItem.src;
            
             // if user clicked image that's already been chosen, remove from array
            if (chosenFrame !== selectedUri) {
                setChosenFrame(selectedItem);
                console.log("new frame index=====", index, "chosenFrame=====",chosenFrame);
            } else {
                // check to see if user has selected 4 images
                console.log("same frame index=====", index,"chosenFrame====",chosenFrame);
            }
        }
    };

    
    /**
     * Save frame to user's camera roll, asks for camera roll permissions first
     */
        const __savePhoto = async () => {

            if (viewShotRef.current) {  
                try {
                    const viewshotUri = await viewShotRef.current.capture();
                    console.log("Viewshot image's uri=======",viewshotUri);

                    // ask permission to save to phone's media library
                    const permission = await MediaLibrary.requestPermissionsAsync();
    
                    if (permission.status === 'granted') {
                        await MediaLibrary.createAssetAsync(viewshotUri);
                        Alert.alert('Photo Saved!', 'Your photo has been saved to your device :D',
                            [{ text: 'OK', onPress: () => navigation.popToTop()} ]);
                    } else {
                        Alert.alert('Permission Denied', "You need to grant permission to save photos.");
                    }
                    
                } catch (error) {
                    console.error('ERROR SAVING PHOTO:', error);
                    Alert.alert('Error', 'Failed to save the photo. Please try again.');
                }
    
            } else {
                Alert.alert('No photo to save.');
            }
            
        }



    return (
        
        <SafeAreaView  style={styles.homeScreen}>

            {/* <Text style={styles.instructionText}>Select your photos below</Text> */}
            <View style={{marginTop: '1%'}}>
                <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>

                {fourImages.map((uri, index) => {
                    // calc position based on index
                    const posXLeft = (index % 2) * (390/2) + 16; // - moves left, + moves right
                    const posXRight = (index % 2)  * (picWidth/2) - 11; //+ moves left, - moves right
                    const posYBottom = (index < 2) * (488 / 2) + 276; // + moves down, - moves up
                    const posYTop = (index < 2) * (488 / 2) - 194; //- moves down, + moves up

                    return(
                        <Image
                            key={index}
                            source={{ uri }}
                            style={{
                                width: (picWidth/2.43),
                                height: (picHeight/2.43),
                                position: 'absolute',
                                left: index % 2 === 0 ? posXLeft : posXRight,
                                top: index < 2 ? posYTop : posYBottom,

                            }}
                        />
                    )
                })}

                <Image source={chosenFrame.src}
                    style={{ width: 360, height: 540 }}
                />

                </ViewShot>

            </View>
            
            <View style={styles.designContainer}>
                <ScrollView horizontal={true} style={styles.frameArrayContainer}>
                    {frameArray.map((item, index) => (
                    
                        <TouchableOpacity key={index} onPress={() => __select(index)}>
                            <Image
                                key={index}
                                source={item.src}
                                style={{ width: picWidth / 4.5, 
                                    height: picHeight / 4, 
                                    margin: 7,
                                    marginBottom: 0,
                                    opacity: chosenFrame.src === item.src ? 0.3 : 1,
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                    <View style={styles.endSpacer} />
                </ScrollView>

            </View>

                
        </SafeAreaView>

    )
}