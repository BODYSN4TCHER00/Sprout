import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Estadisticas = ({ maximo, minimo, promedio }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Rango de Valores</Text>
        <Text style={styles.statValue}>{minimo} - {maximo}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Promedio</Text>
        <Text style={styles.statValue}>{promedio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  statBox: {
    backgroundColor: '#0C5963', 
    borderRadius: 20, 
    marginTop: 20,
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    marginHorizontal: 5, 
    alignItems: 'center', 
    justifyContent: 'center',

  },
  statTitle: {
    color: '#fff', 
    fontSize: 14, 
    marginBottom: 5, 
  },
  statValue: {
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
  }
});

export default Estadisticas;
