import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          {/* Logo y nombre de la aplicación */}
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/logo2.png')} 
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>Sprout</Text>
          </View>

        {/* Iconos de notificaciones y perfil */}
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Ionicons name="notifications-outline" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={(navigate) => navigation.navigate('Perfil')}>
            <Ionicons name="person-outline" size={25} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0C5963', 
  },  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 15,
    height: 100, 
    backgroundColor: '#0C5963', 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 75, 
    height: 75, 
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20, 
  },
});

export default Header;
