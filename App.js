import 'react-native-gesture-handler';

import Start from './components/Start'
import Chat from './components/Chat'

/**
 * React Navigation
 * https://reactnavigation.org/docs/getting-started
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

/**
 * @ App Component
 * @ return JSX
 * @ Stack Navigator
 * @ Start and Chat Components
 * @ Stack.Navigator
 * @ Stack.Screen
 * @ Start and Chat Components
 */
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
