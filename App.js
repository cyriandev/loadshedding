import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Schedule from './src/screens/Schedule';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

