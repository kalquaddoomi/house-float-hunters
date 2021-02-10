import {Dimensions, StyleSheet} from "react-native";

const gold = '#F7DA6B'
const purple = '#750dd6'
const green = '#5d8d03'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: gold,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    catchFloatButton: {
        borderWidth: 2,
        borderColor: purple,
        backgroundColor: '#eef',
        padding: 30,
        width: Dimensions.get('window').width - 80,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})

