import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import ProfileField from '../components/campoPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../components/instanciaAxios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        try {
          const { data } = await axiosInstance.get('/api/users/profile');
          setUserInfo(data);
        } catch (error) {
          console.error("Error completo de Axios:", error);
          Alert.alert('Error', 'No se pudo obtener la información del perfil.');
        }
      } else {
        navigation.navigate('Login');
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [navigation]);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    navigation.replace('Login');
  };

  const iconMap = {
    nombre: "account",
    apellido: "account-outline",
    email: "email",
    telefono: "phone",
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#3B9E92', '#0C5963']} style={styles.container}>
      <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
      <ScrollView style={styles.scrollContainer}>
        {Object.entries(userInfo).map(([key, value]) => {
          if (key !== "id") {  // Excluyendo el campo id de la visualización
            return <ProfileField key={key} label={key} value={value} iconName={iconMap[key] || "account-circle-outline"} />;
          }
        })}
      </ScrollView>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  signOutButton: {
    backgroundColor: '#D9534F',
    padding: 15,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    height: 150,
    width: 150,
    marginTop: 20,
    marginBottom: 35,
    borderRadius: 100,
  },
});

export default ProfileScreen;
