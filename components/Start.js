import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
// @type module
// @description The SplashScreen module tells the splash screen to remain visible until it has been explicitly told to hide.
import * as SplashScreen from 'expo-splash-screen';



// @ This is a function component that takes in props as an argument and returns JSX to be rendered
export default function Start({ navigation , route}) {

    // @ type Hook
    // @description This is a state variable that is initialized to #fff @ //
    const [backgroundColor, setBackgroundColor] = React.useState('#1c2026');

    // @ type Hook
    // @description textColor is a state variable that is initialized to '#000' @ //
    const [textColor, setTextColor] = React.useState('#fdfdfe');
    // @ type Hook
    // @description This is a state variable that is initialized to an empty string @ //
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


    // @function
    // @name handlPress
    // @description This function takes in a color as an argument and sets the value of the backgroundColor state to the value of the argument
    const handlePress = () => {
        navigation.navigate('Chat', { name: text, backgroundColor: backgroundColor, textColor: textColor });
    }

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, color: textColor}}
            accessible={true}
            accessibilityLabel='Start'
            accessibilityHint='A screen where you can enter your name and choose a background color'
            accessibilityRole='screen'
        >

            <Text style={{ fontSize: 45, marginBottom: 50, fontWeight: '400', color: textColor, fontFamily: 'Poppins-Bold' }}> Birdy Chat App</Text>
            <Text style={{ fontSize: 25, marginBottom: 50, color: textColor }}>start a chat!</Text>
            {/* handle change */}
            <TextInput style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 50, color: textColor, padding: 5 }} onChangeText={handleChange} value={text} placeholder='type name' placeholderTextColor="#fdfdfe" />
            <Text style={{ fontSize: 20, marginBottom: 50, color: textColor, fontWeight: '400' }}>Choose a background color:</Text>
            <View style={{ flexDirection: 'row'}}>
                <View style={{ backgroundColor: '#1c2026', width: 50, height: 50, marginRight: 10, borderRadius: 50 }} accessible={true} accessibilityLabel='Dark' accessibilityHint='Choose a dark background' accessibilityRole='button' accessibilityState={{selected: backgroundColor === '#b9c6ae'}} onTouchEnd={() => {  setBackgroundColor('#1c2026'); setTextColor(textColor) }} />
                <View style={{ backgroundColor: '#1DA1F2', width: 50, height: 50, marginRight: 10, borderRadius: 50 }}  accessible={true} accessibilityLabel='Light Blue' accessibilityHint='Choose a Light Blue background' accessibilityRole='button' accessibilityState={{selected: backgroundColor === '#1DA1F2'}}  onTouchEnd={() => { setBackgroundColor('#1DA1F2'); setTextColor(textColor) }} />
                <View style={{ backgroundColor: '#8A95A5', width: 50, height: 50, marginRight: 10, borderRadius: 50 }}  onTouchEnd={() => { setBackgroundColor('#8A95A5'); setTextColor(textColor) }} />
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
        </View>
    );
}




