import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { hp } from '../Utils/Responsive';

const CustomButton = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.3} style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    marginHorizontal:hp(4),
    borderRadius: 25,
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomButton;
