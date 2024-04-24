import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import RegistrationScreen from '../screens/registerScreen';
import ProfileScreen from '../screens/profile'
import Home from '../screens/home'
const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Register" component={RegistrationScreen} options={{headerShown: false}} />
    <Stack.Screen name="Perfil" component={ProfileScreen} options={{headerShown: false}}/>    
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>

  </Stack.Navigator>
);

export default AuthNavigator;
