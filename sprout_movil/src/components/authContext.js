import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../components/instanciaAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      // Utiliza axiosInstance para la solicitud
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      // Actualiza el estado del usuario en el contexto
      setUser(user);
      return true;
    } catch (error) {
      console.error('Error during sign in:', error);
      return false;
    }
  };

  const signUp = async (nombre, apellido, email, telefono, password) => {
    try {
      // Utiliza axiosInstance para la solicitud
      const response = await axiosInstance.post('/api/auth/register', {
        nombre,
        apellido,
        email,
        telefono,
        password
      });
      const { token, userId } = response.data;
      await AsyncStorage.setItem('userToken', token);
      setUser({userId, nombre, email}); // Actualiza el estado del usuario según sea necesario
      return true;
    } catch (error) {
      console.error('Error during sign up:', error);
      return false;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    // Limpia el estado del usuario
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
