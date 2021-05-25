import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Schedule from './src/screens/Schedule';
import EskomState from './src/context/eskom/EskomState';
import Info from './src/screens/Info';
import Tweets from './src/screens/Tweets';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <EskomState>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Tweets" component={Tweets} />
        </Stack.Navigator>
      </NavigationContainer>
    </EskomState>

  );
}

