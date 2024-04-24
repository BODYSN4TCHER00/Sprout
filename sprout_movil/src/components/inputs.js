import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const InputComponent = ({ label, value, onChangeText, secureTextEntry, keyboardType }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '100%',
    marginLeft: 5,
    color: 'white',
    fontSize: 16,
    marginBottom: 3,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#404040',
    color: '#fff',
  },
});

export default InputComponent;
