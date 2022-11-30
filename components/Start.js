import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
// @type module
// @description The SplashScreen module tells the splash screen to remain visible until it has been explicitly told to hide.
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import image from '../images/Conversation-pana.png';
import Icon from 'react-native-vector-icons/FontAwesome';
/**
 * Represents a Start component 
 * @function Start - A React component
 * @param {object} navigation - An object that contains information about the navigation state
 * @param {object} route - An object that contains information about the route that was navigated to
 * @returns {JSX.Element} - JSX that renders the Start component
 */

export default function Start({ navigation }) {

    const [backgroundColor, setBackgroundColor] = React.useState('#fdfdfe');

    const [textColor, setTextColor] = React.useState('#3d405b');



    // #00af80;

    const [text, setText] = React.useState('');

    let [fontsLoaded] = useFonts({
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });

    // useEffect
    React.useEffect(() => {
        // @ This is an async function that tells the splash screen to hide @ //
        async function hideSplashScreen() {
            await SplashScreen.hideAsync();
        }
        hideSplashScreen();
    }, []);


    if (!fontsLoaded) {
        return null;
    }

    // @function 
    // @name handleChange
    // @description This function takes in a value as an argument and sets the value of the text state to the value of the argument
    function handleChange(value) {
        setText(value);
    }


    /**
     * @function
     * @name handlePress
     * @description This function takes in a value as an argument and sets the value of the text state to the value of the argument
     */

    const handlePress = () => {
        navigation.navigate('Chat', { name: text, backgroundColor: backgroundColor, textColor: textColor });
    }

    return (
        <ImageBackground source={image} style={styles.backgroundImage}>
            <View
                style={styles.container}
                accessible={true}
                accessibilityLabel='Start'
                accessibilityHint='A screen where you can enter your name and choose a background color'
                accessibilityRole='screen'
            >

                <Text style={{ fontSize: 40, marginBottom: 50, fontWeight: '400', color: textColor, fontFamily: 'Poppins-Bold' }}> Welcome to Chatty App</Text>
                <View style={styles.subheading}>
                    <Text style={{
                        color: '#fdfdfe',
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        fontSize: 20,
                    }}>start a chat!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#3d405b" style={{ marginRight: 10 }} />

                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange}
                        value={text}
                        placeholder='Enter your name'
                        accessible={true}
                        accessibilityLabel='Enter your name'
                        accessibilityHint='Enter your name'
                        accessibilityRole='text'
                    />
                </View>
                <View style={styles.colorContainer}>
                    {/* <TextInput style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 50, color: textColor, padding: 5 }} onChangeText={handleChange} value={text} placeholder='type name' placeholderTextColor="#fdfdfe" /> */}
                    <Text style={{ fontSize: 20, marginBottom: 50, color: textColor, fontWeight: 'bold' }}>Choose a background color:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: '#1c2026', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} accessible={true}
                            accessibilityLabel='Dark' accessibilityHint='Choose a dark background'
                            accessibilityRole='button' accessibilityState={{ selected: backgroundColor === '#b9c6ae' }}
                            onTouchEnd={() => { setBackgroundColor('#1c2026'); setTextColor(textColor) }} />
                        <TouchableOpacity style={{ backgroundColor: '#1DA1F2', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} accessible={true} accessibilityLabel='Light Blue' accessibilityHint='Choose a Light Blue background' accessibilityRole='button' accessibilityState={{ selected: backgroundColor === '#1DA1F2' }} onTouchEnd={() => { setBackgroundColor('#1DA1F2'); setTextColor(textColor) }} />
                        <TouchableOpacity style={{ backgroundColor: '#8A95A5', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} onTouchEnd={() => { setBackgroundColor('#8A95A5'); setTextColor(textColor) }} />
                        <TouchableOpacity style={{ backgroundColor: '#B9C6AE', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} onTouchEnd={() => { setBackgroundColor('#B9C6AE'); setTextColor(textColor) }} />
                    </View>
                    <View style={{ marginTop: 50, width: 200, height: 50, borderRadius: 50, backgroundColor: '#00af80', justifyContent: 'center', alignItems: 'center' }} onTouchEnd={handlePress}>
                        <Text style={{ color: '#fdfdfe', fontSize: 20, fontWeight: 'bold' }}>Start Chatting</Text>

                    </View>

                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
        height: '60%',
    },
    subheading: {
        marginBottom: 50,
        backgroundColor: '#00af80',
        padding: 10,
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 300,
        height: 50,
        marginBottom: 50,
        padding: 10,
        opacity: 0.9,

    },
    input: {
        flex: 1,
        height: 50,
        color: '#3d405b',
        fontWeight: 'bold',
        fontFamily: 'Poppins',

    },
    colorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 300,
        height: 300,
        opacity: 0.8,
    }

});




{/* <View
style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfe', color: textColor }}
accessible={true}
accessibilityLabel='Start'
accessibilityHint='A screen where you can enter your name and choose a background color'
accessibilityRole='screen'
>

<Text style={{ fontSize: 45, marginBottom: 50, fontWeight: '400', color: textColor, fontFamily: 'Poppins-Bold' }}> Birdy Chat App</Text>
<Text style={{ fontSize: 25, marginBottom: 50, color: textColor }}>start a chat!</Text>

<TextInput style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 50, color: textColor, padding: 5 }} onChangeText={handleChange} value={text} placeholder='type name' placeholderTextColor="#fdfdfe" />
<Text style={{ fontSize: 20, marginBottom: 50, color: textColor, fontWeight: '400' }}>Choose a background color:</Text>
<View style={{ flexDirection: 'row' }}>
    <View style={{ backgroundColor: '#1c2026', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} accessible={true} 
    accessibilityLabel='Dark' accessibilityHint='Choose a dark background' 
    accessibilityRole='button' accessibilityState={{ selected: backgroundColor === '#b9c6ae' }}
     onTouchEnd={() => { setBackgroundColor('#1c2026'); setTextColor(textColor) }} />
    <View style={{ backgroundColor: '#1DA1F2', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} accessible={true} accessibilityLabel='Light Blue' accessibilityHint='Choose a Light Blue background' accessibilityRole='button' accessibilityState={{ selected: backgroundColor === '#1DA1F2' }} onTouchEnd={() => { setBackgroundColor('#1DA1F2'); setTextColor(textColor) }} />
    <View style={{ backgroundColor: '#8A95A5', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} onTouchEnd={() => { setBackgroundColor('#8A95A5'); setTextColor(textColor) }} />
    <View style={{ backgroundColor: '#B9C6AE', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} onTouchEnd={() => { setBackgroundColor('#B9C6AE'); setTextColor(textColor) }} />
</View>
<View style={{ marginTop: 50, width: 200, height: 50, borderRadius: 50, backgroundColor: '#757083', justifyContent: 'center', alignItems: 'center' }} onTouchEnd={handlePress}>
    <Text
        style={{ fontSize: 20, color: textColor, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}
        accessible={true}
        accessibilityLabel="Start Chatting"
        accessibilityHint="Navigates to the chat screen"
        accessibilityRole="button"
    >Start Chatting</Text>
</View>
</View> */}