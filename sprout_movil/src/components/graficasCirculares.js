import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularChart = ({ size, width, fill, tintColor, backgroundColor, label, unit }) => {
  return (
    <View style={styles.chartWrapper}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        lineCap="round"  // Suaviza los extremos de la barra de progreso
        style={styles.circularProgress}>
        {(fill) => <Text style={styles.innerLabel}>{`${Math.round(fill)}${unit}`}</Text>}
      </AnimatedCircularProgress>
      <Text style={styles.sensorLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    alignItems: 'center',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circularProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerLabel: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  sensorLabel: {
    marginTop: 5,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  }
});

export default CircularChart;
