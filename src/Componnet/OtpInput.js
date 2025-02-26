import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { hp, wp } from '../Utils/Responsive';


const OTPInput = ({ onChange, onSubmit, onClear }) => {
  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Handle OTP digit change
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Notify parent component of OTP change
    onChange(newOtp.join(''));

    // Move focus to the next field if needed
    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Automatically submit OTP if all fields are filled
    if (newOtp.every(digit => digit.length === 1)) {
      onSubmit();
    }
  };

  // Clear OTP fields
  const clearOtp = () => {
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus(); // Focus the first field
    // onClear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.otpInput}
            textAlign="center"
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* <View style={styles.actions}>
        <Text onPress={clearOtp} style={styles.clearText}>Clear</Text>
      </View> */}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(80), // Responsive width
    marginBottom: hp(3),
  },
  otpInput: {
    width: wp(15), // Responsive width for each input box
    height: hp(8), // Responsive height
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    borderColor: '#B3B3B3',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  clearText: {
    fontSize: 16,
    color: '#FF4D4D',
    fontWeight: 'bold',
  },
});
