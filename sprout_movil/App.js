import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeTabsNavigator from './src/navigation/HomeTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/profile';
import { AuthProvider } from './src/components/authContext'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider> 
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="HomeTabs"
              component={HomeTabsNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Perfil"
              component={ProfileScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

export default App;
