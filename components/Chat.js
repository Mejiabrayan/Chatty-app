
import React from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

/**
 * Represents a Chat component
 * @function Chat - A React component
 * @param {object} route - An object that contains information about the route that was navigated to
 * @param {object} navigation - An object that contains information about the navigation state
 */

export default function Chat({ navigation, route }) {

    const [uid, setUid] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
    const [messages, setMessages] = React.useState([]);

    const firebaseConfig = {

        apiKey: "AIzaSyAVs5A4r-j6Ala90zt3whILp1LUPfNcr3s",
        authDomain: "birdychat-app.firebaseapp.com",
        projectId: "birdychat-app",
        storageBucket: "birdychat-app.appspot.com",
        messagingSenderId: "914399359321",
        appId: "1:914399359321:web:be3d0beeef37ddb52fdc48",
        measurementId: "G-TKK1CVHTP7"

    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const referenceChatMessages = firebase.firestore().collection('messages');

    // @type function
    // @name onCollectionUpdate
    // @description This function takes in a querySnapshot as an argument and sets the value of the messages state to the value of the argument
    function onCollectionUpdate(querySnapshot) {
        const messages = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.timeOfCreation.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                },
            });
        });
        setMessages(messages);
    }


    /** 
     * @type function
     * @name addMessage
     * @description This function takes in a message as an argument and adds the message to the database
     */

    function addMessage(message) {
        referenceChatMessages.add(message);
    }
    /**
     * @type useEffect
     * @description This is a function that takes in a callback function as an argument and returns a function that will be called when the component is unmounted
     * @param {function} callback - A function that will be called when the component is unmounted
     * @param {array} dependencies - An array of values that the effect depends on
     * @returns {function} - A function that will be called when the component is unmounted
     */

    React.useEffect(() => {
        const { name, backgroundColor, textColor } = route.params;
        navigation.setOptions({ title: name });
        navigation.setOptions({ backgroundColor: backgroundColor });
        navigation.setOptions({ textColor: textColor });
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            setUid(user.uid);
            setLoggedIn(true);
        });
        referenceChatMessages.orderBy('timeOfCreation', 'desc').onSnapshot(onCollectionUpdate);
    }, []);

    /**
    * @type function
    * @name getMessages
    * @description This function takes in a message as an argument and returns a message
    */

    function getMessages() {
        return messages;
    }

    /**
     * @type function
     * @saveMessages
     * @description This function takes in a message as an argument and saves the message to the database
     * @param {object} message - An object that contains the message
     * @returns {object} - An object that contains the message
     * @example
     * saveMessages(message)
     * // returns message
     */
    function saveMessages(message) {
        setMessages(message);
    }


    /**
    * @type function
    * @name deleteMessages
    * @description This function takes in a message as an argument and deletes the message from the database
    * @param {object} message - An object that contains the message
     */
    function deleteMessages(message) {
        setMessages(message);
    }

   

    // @type function
    // @name onSend
    // @description This function takes in a messages as an argument and sets the value of the messages state to the value of the argument
    function onSend(messages = []) {
        setMessages(GiftedChat.append(messages, messages));
        addMessage(messages[0]);
    }


    /*
    * @type function
* @name authSubscribe
* @description This function takes in a messages as an argument and sets the value of the messages state to the value of the argument
*/

    function authSubscribe() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            setUid(user.uid);
            setLoggedIn(true);
        });

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            setUid(user.uid);
            setLoggedIn(true);
        }
        );
        return unsubscribe;
    }

    /*
   * @type useEffect
    * @name useEffect
    * @description This function takes in a messages as an argument and sets the value of the messages state to the value of the argument
    * @param {function} authSubscribe - A function that subscribes to the authentication state
    * @param {function} getMessages - A function that gets the messages from the database
    */

    React.useEffect(() => {
        authSubscribe();
        getMessages();
    }, []);



    /**
     * @type function
     * @name renderBubble
     * @description This function takes in a props as an argument and returns a JSX element
     *  @param {object} props - An object that contains information about the props
     * @returns {JSX} - A JSX element
     */

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
                textStyle={{
                    right: {
                        color: textColor
                    }
                }}
            />
        );
    }

    const { name, backgroundColor, textColor } = route.params;
    
    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}   
                user={{
                    _id: uid,
                    name: name,
                }}
                renderBubble={renderBubble}
            />
        </View>
    );
}
