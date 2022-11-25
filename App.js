import { StatusBar } from 'expo-status-bar';
// import react native gesture handler
import 'react-native-gesture-handler';
// @ Components `Start` and `Chat` @ //
import Start from './components/Start'
import Chat from './components/Chat'

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// @ Create a Stack Navigator
const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer initialRouteName='Start'>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
