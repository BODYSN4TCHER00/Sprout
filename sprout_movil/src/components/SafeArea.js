import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const SafeArea = ({ children, style }) => {
  return <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
});

export default SafeArea;
