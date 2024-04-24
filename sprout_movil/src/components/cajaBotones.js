import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParameterBox = ({ title, iconName, fecha, onPress }) => {
  return (
    <TouchableOpacity style={styles.parameterBox} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.parameterTitle}>{title}</Text>
        <Text style={styles.parameterInfo}>{fecha}</Text>
      </View>
      <Icon
        name={iconName}
        size={100}
        color="#fff"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parameterBox: {
    backgroundColor: 'rgba(12, 99, 78, 0.35)', 
    width: 160, 
    height: 160,
    borderRadius: 20, 
    padding: 15,
    margin: 10,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  textContainer: {
    position: 'absolute', 
    top: 15,                    
    right: 15,
    alignItems: 'flex-end',
  },
  parameterTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  parameterInfo: {
    color: 'white',
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    bottom: 1,
    left: 1,
    opacity: 0.5,
  },
});

export default ParameterBox;
