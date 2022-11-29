import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
// import CustomActions from './CustomActions';
// import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');

/**
 * Represents a Chat component
 * @function Chat - A React class component
 */
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                avatar: '',
                name: '',
            },
            loggedInText: 'Please wait, you are getting logged in',
            image: null,
            location: null,
            isConnected: false,
        };


        /**
         * Firebase configuration
         * @function firebaseConfig - firebase configuration
         * @param {string} apiKey - firebase apiKey
         * @param {string} authDomain - firebase authDomain
         * @param {string} projectId - firebase projectId
         * @param {string} storageBucket - firebase storageBucket
         * @param {string} messagingSenderId - firebase messagingSenderId
         * @param {string} appId - firebase appId
         * @param {string} measurementId - firebase measurementId
         */

        if (!firebase.apps.length) {
            firebase.initializeApp({

                apiKey: "AIzaSyAVs5A4r-j6Ala90zt3whILp1LUPfNcr3s",
                authDomain: "birdychat-app.firebaseapp.com",
                projectId: "birdychat-app",
                storageBucket: "birdychat-app.appspot.com",
                messagingSenderId: "914399359321",
                appId: "1:914399359321:web:be3d0beeef37ddb52fdc48",
                measurementId: "G-TKK1CVHTP7"

            });
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    /**
     *  @name getMessages
     * @description - gets messages from the database
     */
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    componentDidMount() {
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        this.getMessages();
        NetInfo.fetch().then((connection) => {
            if (connection.isConnected) {
                this.setState({
                    isConnected: true,
                });
            } else {
                this.setState({
                    isConnected: false,
                });
            }
        });

        /**
         * @function authUnsubscribe
         * @description - listens to authentication changes
         * @param {string} user - user object
         * @param {string} uid - user id
         */
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user?.uid,
                messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }



    /**
     * @function onSend
     * @description - sends messages to the database
     * @param {array} messages - array of messages
     * @param {string} text - message text
    */
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage(messages)
            this.saveMessages();
        });
    }


    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: [] // clear the messages
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    /**
     * @function onCollectionUpdate
     * @param {object} querySnapshot - firebase querySnapshot
     * @param {object} error - firebase error
     * @param {object} messages - firebase messages
     * @decription - updates the state of the messages
     */

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            console.log(doc);
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
        this.setState({ messages });
    };

    addMessage(message) {
        this.referenceChatMessages.add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user,
            uid: this.state.uid,
        });
    }

    /**
     * @function componentWillUnmount
     * @description - stops listening to authentication changes and messages changes in the database
     */
    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

    //Bubble customization
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#fff",
                    },
                    right: {
                        backgroundColor: "#000",
                    },
                }}
            />
        );
    }

    render() {
        const { textColor: textColor, backgroundColor: backgroundColor } = this.props.route.params;
        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor, textColor: textColor }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                />
                {Platform.OS === "android" ? (
                    <KeyboardAvoidingView behavior="height" />
                ) : null}
            </View>
        );
    }
}

