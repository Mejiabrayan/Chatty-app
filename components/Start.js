import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
// @type module
// @description The SplashScreen module tells the splash screen to remain visible until it has been explicitly told to hide.
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import image from '../images/Conversation-pana.png';
import Icon from 'react-native-vector-icons/FontAwesome';


const colors = {
    primary: '#00af80',
    secondary: '#3d405b',
    white: '#fdfdfe',
    black: '#000000',
    grey: '#757083',
    lightGrey: '#F4F4F4',
    darkGrey: '#757083',
    red: '#e63946',
    green: '#00af80',
    blue: '#457b9d',
    yellow: '#f1faee',
    orange: '#f4a261',
    purple: '#a8dadc',
    lightPurple: '#caf0f8',
    darkPurple: '#457b9d',

}

/**
 * Represents a Start component 
 * @function Start - A React component
 * @param {object} navigation - An object that contains information about the navigation state
 * @param {object} route - An object that contains information about the route that was navigated to
 * @returns {JSX.Element} - JSX that renders the Start component
 */

export default function Start(props) {

    const [name, setName] = useState("");
    const [color, setColor] = useState(colors.black);

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

    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                style={styles.backgroundImage}
            >
                <Text style={styles.title}>Chatty App</Text>
                <View style={styles.subheading}>
                    <Text style={{
                        color: '#fdfdfe',
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        fontSize: 20,
                    }}>start a chat!</Text>
                </View>

                <View style={styles.box}>
                    <Icon name="user" size={20} color="#3d405b" style={{ marginRight: 10 }} />
                    <TextInput
                        onChangeText={(name) => setName(name)}
                        value={name}
                        style={styles.input}
                        placeholder="Your name..."
                    />

                    <Text style={styles.text}>Choose Background Color:</Text>
                    <View style={styles.colorContainer}>
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.black }, styles.colorbutton]}
                            onPress={() => setColor(colors.black)}
                        />
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
                            onPress={() => setColor(colors.purple)}
                        />
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.grey }, styles.colorbutton]}
                            onPress={() => setColor(colors.grey)}
                        />
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.green }, styles.colorbutton]}
                            onPress={() => setColor(colors.green)}
                        />
                    </View>

                    <Pressable
                        onPress={() =>
                            props.navigation.navigate("Chat", { name: name, color: color })
                        }
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? "#585563" : "#757083",
                            },
                            styles.button,
                        ]}
                    >
                        <Text style={styles.buttontext}>Start Chatting</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60%',
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: colors.secondary,
        marginBottom: 100,
        fontFamily: 'Poppins-Bold',
    },
    subheading: {
        marginBottom: 50,
        backgroundColor: '#00af80',
        padding: 10,
        borderRadius: 10,
    },
    box: {
        backgroundColor: colors.white,
        opacity: 0.8,
        width: '88%',
        height: '55%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    input: {
        width: '88%',
        height: 55,
        padding: 8,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: '300',
        color: colors.grey,
        fontFamily: 'Poppins',
      
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.grey,
        fontFamily: 'Poppins',
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colorbutton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
    },
    button: {
        width: '88%',
        height: 55,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    buttontext: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
        fontFamily: 'Poppins-Bold',
    },
    icon: {
        marginBottom: 10,
    }

});



