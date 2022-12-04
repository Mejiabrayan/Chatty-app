import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import MapView from 'react-native-maps';

/**
 * import functions from firebase SDK
 */
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
     * @function onCollectionUpdate
     * @param {object} querySnapshot - firebase querySnapshot
     * @param {object} error - firebase error
     * @param {object} messages - firebase messages
     * @decription - updates the state of the messages
     */

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // Go through each document
        querySnapshot.forEach((doc) => {
            // Get QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text || '',
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages,
        });
    };


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

    /**
     * @function saveMessages
     * @description - saves messages to the database
     */
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

    componentDidMount() {
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        this.getMessages();

        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({
                    isConnected: true,
                });
                console.log('online');


                //Anonymous user authentication 
                this.referenceChatMessages = firebase.firestore().collection('messages');

                this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        firebase.auth().signInAnonymously();
                    }
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                    });
                    this.unsubscribe = this.referenceChatMessages
                        .orderBy('createdAt', 'desc')
                        .onSnapshot(this.onCollectionUpdate);
                    this.saveMessages();
                });
            }
            // If user is offline --> load & display messages from asyncStorage
            else {
                this.setState({
                    isConnected: false,
                });
                console.log('offline');
                this.getMessages();
            }
        })
    }
    /**
     * @function addMessages
     * @param {object} messages - firebase messages
     * @description - adds messages to the database
     * @returns {object} - firebase messages
     */
    addMessages = () => {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: message.user,
            image: message.image || null,
            location: message.location || null,
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
            this.saveMessages();
            this.addMessages(this.state.messages[0]);
            this.deleteMessages();
        });
    }
    /**
     * @function renderInputToolbar
     * @description - renders the input toolbar if the user is online
     */
    
     renderInputToolbar(props) {
        if (this.state.isConnected === false) {
        } else {
          return <InputToolbar {...props} />;
        }
      }

    /**
     * @function componentWillUnmount
     * @description - stops listening to authentication changes and messages changes in the database
     */
    componentWillUnmount() {
        if (this.isConnected) {
            this.unsubscribe();
            this.authUnsubscribe();
        }
    }

    //Bubble customization
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#e1e1",
                    },
                    right: {
                        backgroundColor: "#00af80",
                    },
                }}
            />
        );
    }


    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    render() {
        const { backgroundColor: backgroundColor } = this.props.route.params;

        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor}}>
                <GiftedChat
                    bottomOffset={getBottomSpace()}
                    renderBubble={this.renderBubble.bind(this)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    messages={this.state.messages}
                    isConnected={this.state.isConnected}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.state.uid,
                        avatar: "https://placeimg.com/140/140/any",

                    }}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                />
                {/* Prevent hidden input field on Android */}
                {Platform.OS === "android" ? (
                    <KeyboardAvoidingView behavior="height" />
                ) : null}
            </View>
        );
    }
}

