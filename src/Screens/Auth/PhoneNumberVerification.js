import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Headerimage } from '../../Assests/image';
import { hp, wp } from '../../Utils/Responsive';
import Toast from 'react-native-simple-toast';
import CustomButton from '../../Componnet/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { sendOtp } from '../../Service/ApiService';
import CustomSmallLoader from '../../Componnet/CustomSmallLoader';

const PhoneNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState( __DEV__ ? '8294208753' : '',);
const navigation = useNavigation();
const [loading, setLoading] = useState(false); 
  const handlePhoneNumberChange = (input: string) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    setPhoneNumber(numericInput);
    if (input !== numericInput) {
      Toast.show('Only numbers are allowed!', Toast.LONG);
    }
  };
// const handleContinue  = () => {
//   navigation.navigate('OtpVerificationPage', { phoneNumber });
// };
  const handleContinue = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        const response = await sendOtp(phoneNumber);
        if (response?.success) {
          Toast.show(response.message || 'OTP sent successfully!', Toast.LONG);
          navigation.navigate('OtpVerificationPage', { phoneNumber });
        } else {
          Toast.show(response.message || 'Failed to send OTP. Please try again.', Toast.LONG);
        }
      } catch (error) {
       console.log("errror",JSON.stringify(error));
        Toast.show('Failed to send OTP. Please try again.', Toast.LONG);
      } finally {
        setLoading(false);
      }
    } else {
      Toast.show('Please enter a valid phone number', Toast.LONG);
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={Headerimage} style={styles.customImage} />
      </View>
      <View style={{ marginTop: hp(4) }}>
        <Text style={styles.headingText}>Please Enter Your Mobile </Text>
        <Text style={styles.headingText}>Number </Text>
      </View>
      <View style={{ marginTop: hp(4) }}>
        <Text style={styles.subHeadingText}>
          To start new group / To join existing group
        </Text>
      </View>
      <View style={{ marginTop: hp(4) }}>
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          maxLength={10}
          placeholder="Enter your phone number"
          placeholderTextColor="#B3B3B3"
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: hp(2) }}>
        <Text style={styles.subHeadingText}>
          We will send a verification code{' '}
        </Text>
        <Text style={styles.subHeadingText}>(Via SMS text message)</Text>
        <Text style={styles.subHeadingText}>to your phone number</Text>
      </View>
      <View style={styles.empty}>
      <CustomButton text="Continue" onPress={handleContinue} />

      </View>
      {loading && <CustomSmallLoader />}
    </View>
  );
};

export default PhoneNumberVerification;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(2),
  },
  imagecontainer: {
    alignItems: 'center',
  },
  customImage: {
    width: wp(75),
    height: hp(9),
    resizeMode: 'contain',
  },
  headingText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: 20,
    color: 'purple',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#F3E6F1',
    width: wp(80),
    height: hp(10),
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },
  empty: {
    marginVertical: hp(5),
  },
});
