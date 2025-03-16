import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    /**
     * SCREENS
     */
    screen: {
        flex: 1, //0 puts in center, 1 takes up all available space 
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 20,
        // borderColor: 'red',
    },
    homeScreen: {
        flex: 1, //0 puts in center, 1 takes up all available space 
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        // borderTopColor: "black",
        // borderWidth: 5,
    },
    camereHomeScreen: {
        flex: 1, //0 puts in center, 1 takes up all available space 
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        // borderTopColor: "black",
        // borderWidth: 5,
    },

    /**
     * CONTAINERS
     */
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        width: '100%',
        height: '100%', 
    },
    homeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 50,
        width: '100%',
        height: '100%', 
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 50,
        width: '100%',
        height: '100%', 
        alignItems: 'center',
    },

    designContainer: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',

    },
    previewContainer: {
        width: '100%',
        flexDirection: 'row', // aligns children horizontally
        flexWrap: 'wrap', // wrap to new line below
        padding: '2%',
        paddingRight: '5%',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
        shadowColor: '#08090A',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    webcamContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    textSection: {
        paddingLeft: 40,
        flexWrap: 'wrap',
        maxWidth: 640,
        height: 'auto',
        // borderWidth: 2,
        // borderColor: 'green',
        
    },


    /**
     * BUTTONS
     */
    buttonHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
    },
    hidden: {
        display: 'none',
    },
    visible: {
        display: 'flex',
    },

    textInput: {
        width: "80%",
        fontSize: 20,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "#D9D9D9",
        borderWidth: 2,
        marginBottom: 8,
        flex: 1,
    },


    buttonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        elevation: 5,
        backgroundColor: '#1E90FF',
        margin: 25,
        width: 200,
        shadowColor: '#08090A',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        paddingLeft: 10,
    },

    buttonDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        elevation: 5,
        height: 40,
        width: '75%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#fff',
    },
    buttonDisabledText: {
        fontSize: 20,
        color: '#D9D9D9',
        fontWeight: 'normal',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#fff',
        borderColor: '#08090A',
        borderWidth: 1,
        margin: 10,
        width: 250,
        height: 75,
        // shadowColor: '#08090A',
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 6,
        // elevation: 5,
        
    },
    buttonHover: {
        ':hover': {
            shadowColor: '#000000',
            shadowOffset: {
                width: 30,
                height: 30,
            },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 5,
            borderColor: 'blue',
            borderWidth: 10,
        }
    },

    buttonSmall: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#fff',
        margin: 10,
        width: 50,
        height: 180,
    },

    buttonMainText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff',
        lineHeight: 30,
        width: '100%',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#000',
        lineHeight: 30,
    },
    smallButtonText: {
        fontSize: 20,
        fontWeight: 'semi-bold',
        color: '#000',
    },
    webcamButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    /**
     * ERROR
     */
    errorBox: {
        width: '80%',
        borderWidth: 1,
        borderStyle: 'dashed', // Lyn sez: doesn't seem to work 
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        padding: 10, 
    },
    
    header: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        paddingLeft: 15,
    },
    


    pscreen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    pscreenText: {
        textAlign: 'center',
        fontSize: 20,
    },


    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    postedBy: {
        marginBottom: 10,
        fontSize: 16,
    },
    infoText:{
        paddingLeft: 25,
        marginRight: 20,
        marginBottom: 5,
        fontSize: 16,
        flexShrink: 1,
    },
    infoHeader:{
        fontWeight:'bold',
        marginBottom: 4,
        fontSize: 18,
        textAlign: 'left',
        width: '100%',
    },

    scrollScreen:{
        flex:0,
    },

    display:{
        flex:0,
        paddingLeft:'2%',
        paddingRight:'2%',
    },



    /**
     * Camera Screen
     */
    countdownOverlay: {
        position: 'absolute',
        top: -5,
        right: 10,
        //transform: [{ translateX: -50}, { translateY: -50 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    countdownText: {
        fontSize: 54,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5',
        padding: 10,
        opacity: 0.75,
    },
    webcam: {
        width: 50,
    },



    /**
     * Image display
     */
    picArrayContainer: {
        flexDirection: 'row', // aligns children horizontally
        flexWrap: 'wrap', // wrap to new line below
        padding: '2%',
        paddingRight: '5%',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },
    frameArrayContainer: {
        flexDirection: 'row', // aligns children horizontally
        flexWrap: 'wrap', // wrap to new line below
        padding: '2%',
        paddingRight: '5%',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
        shadowColor: '#08090A',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    endSpacer: {
        width: 20,
    },

    /**
     * TEXT
     */
    instructionText: {
        paddingTop: '1%',
        paddingBottom: '1%',
    },

    textSpacer: {
        height: 20,
    },

    headerNext: {
        fontSize: 16,
        marginRight: 5,
    }


});