import React, { useState, useEffect } from "react";
import {StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image,
  SafeAreaView, View, Dimensions, ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import { NavigationContainer } from "@react-navigation/native";
import ViewShot from 'react-native-view-shot';
import styles from '../styles.js';

import StateContext from './StateContext.js';



export default function MDisplayImage({ route, navigation }){

    const { picArray } = route.params;

    const [fourImages, setFourImages] = useState([]);
    const [chosenPic, setChosenPic] = useState(null);
    const [chosenPicIndex, setChosenPicIndex] = useState(null);

    // Calculate the width/height for 4:3 aspect ratio
    const picWidth = Dimensions.get('window').width;
    const picHeight = (picWidth * 4) / 3;


    useEffect(() => {
        navigation.setOptions({

            headerRight: () => fourImages.length === 4 ? (
                <TouchableOpacity onPress={() => Alert.alert('Proceed to next step?', 
                    "Continue if you're satisfied with your selection.",
                    [{ text: 'Cancel'}, { text: 'OK', onPress: () => navigation.replace(
                        'ChooseFrame', {fourImages: fourImages})},])}>
                    <Text style={styles.headerNext}> Next</Text>
                </TouchableOpacity>
                
            ) : null
        });
    }, [fourImages])



    /**
     * User curates their selection of 4 images to be used, no duplicates allowed
     * user is notified if they tried choosing more than 4 photos.
     */
    const __curate = (index) => {
        
        const selectedItem = picArray[index];
        setChosenPic(selectedItem); //change to uri
        
        if (selectedItem) {
            console.log("an item was selected");
            const selectedUri = selectedItem.uri;

             // if user clicked image that's already been chosen, remove from array
            if (fourImages.includes(selectedUri)) {
                setFourImages((prevImages) => prevImages.filter(uri => uri !== selectedUri));
                // setChosenPic(null);
                // setChosenPicIndex(null);
                console.log("Removed the following URI from fourImages::::", selectedUri);
            } else {
                // check to see if user has selected 4 images
                if (fourImages.length < 4) {
                    // if less than 4 images selected, add the new one
                    setFourImages((prevImages) => [...prevImages, selectedUri]);
                    setChosenPicIndex(index);
                    
                } else {
                    // trying to add too many photos
                    Alert.alert('Unable to add photo', 
                        "You have already selected 4 photos.", [{ text: 'OK'}]);
                }
            }
        }
    };


    return (
        
        <SafeAreaView  style={styles.homeScreen}>

            {/* <Text style={styles.instructionText}>Select your photos below</Text> */}
            <View style={{marginTop: '1%'}}>
                

                {fourImages.map((uri, index) => {
                    // calc position based on index
                    const posXLeft = (index % 2) * (390/2) + 16; // - moves left, + moves right
                    const posXRight = (index % 2)  * (picWidth/2) - 11; //+ moves left, - moves right
                    const posYBottom = (index < 2) * (488 / 2) + 275; // + moves down, - moves up
                    const posYTop = (index < 2) * (488 / 2) - 194; //- moves down, + moves up

                    return(
                        <TouchableOpacity onPress={() => __curate(picArray.findIndex( item=> item.uri === uri))}>                        
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
                        </TouchableOpacity>
                    )
                })}

                <Image source={require('../assets/images/Mframe_00.png') }
                    style={{ width: 360, height: 540 }}
                    pointerEvents="none"
                />

            </View>
            
            <View style={styles.designContainer}>
                <ScrollView horizontal={true} style={styles.picArrayContainer}>
                    {picArray.map((item, index) => (
                    
                        <TouchableOpacity key={index} onPress={() => __curate(index)}>
                            <Image
                                key={index}
                                source={{ uri: item.uri }}
                                style={{ width: picWidth / 4, 
                                    height: picHeight / 4, 
                                    margin: 7,
                                    marginBottom: 0,
                                    opacity: fourImages.includes(item.uri) ? 0.3 : 1,
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