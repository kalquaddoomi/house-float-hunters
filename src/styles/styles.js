import {Dimensions, StyleSheet} from "react-native";

const gold = '#F7DA6B'
const purple = '#750dd6'
const green = '#5d8d03'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: gold,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    welcome_header: {
        width: Dimensions.get('window').width-20,
        height: 100
    },
    game_guide: {
    },
    welcome_block: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "bold",
    },
    suggestions: {
        marginTop: 20,
        alignSelf: 'center'
    },
    start_button: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#2200ee',
        backgroundColor: '#55a944',
        width: 200,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    start_text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fullMap: {
        marginTop: 0,
        paddingTop: 0,
        width: Dimensions.get('window').width-30,
        height: Dimensions.get('window').height/3.2,
    },
    map: {
        width: Dimensions.get('window').width-30,
        height: Dimensions.get('window').height/3,
    },
    floatList: {
        flexDirection: "column",
        marginTop: 10
    },
    floatCard: {
        flexDirection: 'column',
        flex:1,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        marginBottom: 5,
        padding: 4,
    },
    floatCardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: green
    },
    floatCardAddress: {
        fontSize: 14,
        color: purple
    },
    floatCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        alignItems: 'center'
    },
    floatCatch: {
        borderWidth: 2,
        borderColor: green,
        borderRadius: 5,
        padding: 5,
        backgroundColor: purple
    },
    floatCatchText: {
        fontSize: 14,
        color: 'gold',
        fontWeight: 'bold'

    },
    floatCaptureTitle:{
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: purple
    },
    floatCaptureAddress:{
        marginTop: 5,
        fontSize: 16,
    },
    floatCaptureRange: {
        marginTop: 2,
    },
    bigNotice: {
        fontSize: 22,
        fontWeight: 'bold',
        width: Dimensions.get('window').width - 20,
        marginBottom: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    flashContainer: {
        marginTop: -60,
        width: Dimensions.get('window').width,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 5,
    },
    catchFloatButton: {
        borderWidth: 2,
        borderColor: purple,
        borderRadius: 5,
        backgroundColor: '#eef',
        padding: 30,
        width: Dimensions.get('window').width - 80,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    catchFloatText:{
        fontSize: 24,
        color: green,
        fontWeight: 'bold'
    },
    getCloser: {
        marginTop: 20,
    },
    getCloserText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    updatePosition: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    updatePositionText: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    camera: {
        width: Dimensions.get('window').width-30,
        height: Dimensions.get('window').height/2.5,
    },
    cameraButtonContainer: {
        marginTop: 30,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    cameraButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        marginRight: 20,
        backgroundColor: '#fff',
        padding: 10,
    },
    buttonPurpleText: {
        fontSize: 18,
        color: purple,
        textAlign: 'center'
    },
    flipCamera: {
        flex:0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        borderColor: 'black',
    },
    keepItPreview: {
        width: Dimensions.get('window').width-30,
        height: Dimensions.get('window').height/1.9,
        marginBottom: 20
    },
    trophyList: {
        flexDirection: 'column',
        width: Dimensions.get('window').width-40,
    },
    trophyCard: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#fff',
        marginTop: 10
    },
    trophyCardColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },
    trophyCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: purple,
        flexWrap: 'wrap',
        flex: 1,
        marginBottom: 3
    },
    trophyCardAddress: {
        fontSize: 12,
        flexWrap: 'wrap',
        flex: 1,
        marginBottom: 3
    },
    trophyCardCatch: {
        fontSize: 14,
        flexWrap: 'wrap',
        flex: 1,
        marginBottom: 3
    },
    trophyView: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        backgroundColor: '#88ff88',
        alignSelf: 'flex-end',
        marginTop: 10

    },
    trophyImage: {
        height: 80,
        width: 70,
        marginRight: 10
    },
    trophyPageImage:{
        width: Dimensions.get('window').width-30,
        height: Dimensions.get('window').height/1.9,
        marginBottom: 20
    },
    trophyPlaque: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: green,
        borderRadius: 10,
        padding: 20

    },
    trophyPlaqueColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 10,
    },
    plaqueTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: purple,
        flexWrap: 'wrap',
        flex: 1,
    },
    plaqueCaught: {
        fontSize: 14,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flex: 1,
    },
    plaqueAddress: {
        fontSize: 14,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flex: 1,
    },
    settingsContainer: {
        flex: 1,
    },
    settingsButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ccc',
        padding: 20
    },
    settingsText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        color: '#ff0000'
    },
    settingsMessage: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    skipCatchingButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        padding: 5,
        backgroundColor: '#fee',
        borderWidth: 1,
        borderRadius: 5
    },
    skipCatchingText: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 2,
        flexWrap: 'wrap'
    },


})

