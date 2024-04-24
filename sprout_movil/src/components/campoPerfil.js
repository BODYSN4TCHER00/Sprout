// ProfileField.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileField = ({ label, value, iconName }) => {
  return (
    <View style={styles.fieldContainer}>
      <Icon name={iconName} size={24} color="#000" />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  iconContainer: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  value: {
    color: '#0C5963',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileField;
