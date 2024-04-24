import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IntervaloDeTiempo = ({ dataPeriod, setDataPeriod }) => {
  return (
    <View style={styles.selectorContainer}>
      {['Día', 'Semana', 'Mes'].map((period) => (
        <TouchableOpacity
          key={period}
          style={[styles.selectorButton, dataPeriod === period && styles.selectedButton]}
          onPress={() => setDataPeriod(period)}
        >
          <Text style={styles.selectorText}>{period}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  selectorButton: {
    padding: 10,
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  selectorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default IntervaloDeTiempo;
