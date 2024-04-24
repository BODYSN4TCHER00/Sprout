import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/home';
import TemperaturaScreen from '../screens/temperatura';
import HumedadScreen from '../screens/humedad';
import LuzScreen from '../screens/luz';

const Tab = createBottomTabNavigator();

const HomeTabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Temperatura') {
          iconName = 'thermostat';
        } else if (route.name === 'Humedad') {
          iconName = 'opacity';
        } else if (route.name === 'Luz') {
          iconName = 'wb-sunny';
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'rgba(86, 191, 178, 0.87)',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#0C5963', 
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Temperatura" component={TemperaturaScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Humedad" component={HumedadScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Luz" component={LuzScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default HomeTabsNavigator;
