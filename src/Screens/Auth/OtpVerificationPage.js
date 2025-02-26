import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {hp, wp} from '../../Utils/Responsive';
import OTPInput from '../../Componnet/OtpInput';
import CustomHeader from '../../Componnet/CustomHeader';
import CustomButton from '../../Componnet/CustomButton';
import {verifyOtp, sendOtp} from '../../Service/ApiService';
import CustomSmallLoader from '../../Componnet/CustomSmallLoader';
import {setAuthData} from '../../Redux/authSlice';
import {useDispatch} from 'react-redux';
import { completeProfileSetup } from '../../Redux/ProfileSetupSlice';

const OtpVerificationPage = () => {
  const {phoneNumber} = useRoute().params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = otp => {
    setOtp(otp);
    console.log('OTP: ', otp);
  };
  const handleOtpSubmit = async () => {
    if (otp.length !== 4) {
      Toast.show('Please enter a valid 4-digit OTP.', Toast.LONG);
      return;
    }
  
    setLoading(true);
    try {
      const response = await verifyOtp(phoneNumber, otp);
      console.log('Response>>>>>>>', JSON.stringify(response));
      dispatch(
        setAuthData({
          token: response.token,
          user: response.user,
          isProfileSetup: response.isProfileSetup,
          is_subscribed: response.is_subscribed,
          subscriptionPlan: response.subscriptionPlan,
        })
      );
  
      Toast.show(response.message, Toast.LONG);
  
      if (response.token) {
        if (response.isProfileSetup) {
          if (!response.is_subscribed) {
            dispatch(completeProfileSetup())
            navigation.navigate('SubscriptionPlan');
          } else {
            dispatch(completeProfileSetup())
            navigation.navigate('HomeScreen');
          }
        } else {
          navigation.navigate('CreateName');
        }
      }
    } catch (error) {
      console.log('Error>>>>>', JSON.stringify(error));
      Toast.show(
        error.message || 'Failed to verify OTP. Please try again.',
        Toast.LONG,
      );
    } finally {
      setLoading(false);
    }
  };
  
  // const handleOtpSubmit = async () => {
  //   if (otp.length !== 4) {
  //     Toast.show('Please enter a valid 4-digit OTP.', Toast.LONG);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await verifyOtp(phoneNumber, otp);
  //     console.log('Response>>>>>>>', response);
  //     dispatch(setAuthData(response));
  //     Toast.show(response.message, Toast.LONG);
  //     if (response.token) {
  //       navigation.navigate('CreateName');
  //     }
  //   } catch (error) {
  //     console.log('Error>>>>>', JSON.stringify(error));
  //     Toast.show(
  //       error.message || 'Failed to verify OTP. Please try again.',
  //       Toast.LONG,
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleOtpSubmit = () => {
  //   // Toast.show('OTP submitted successfully!', Toast.LONG);
  //   navigation.navigate('CreateName'); // Replace with your desired screen
  // };
  const handleResendOtp = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      const response = await sendOtp(phoneNumber);
      Toast.show('OTP resent successfully', Toast.LONG);
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error('Error resending OTP:', error);
      Toast.show('Failed to resend OTP. Please try again.', Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader showBackArrow={true} />
      </View>
      <View style={styles.verificationTextContainer}>
        <Text style={styles.headingText}>Verification</Text>
        <Text style={styles.subHeadingText}>
          We just sent you an SMS with a verification
        </Text>
        <Text style={styles.subHeadingText}>
          code to the mobile number you just entered.
        </Text>
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Please enter the verification code below to confirm your phone number
        </Text>
      </View>
      <View style={styles.otpContainer}>
        <OTPInput
          onChange={handleOtpChange}
          onSubmit={() => console.log('null')}
        />
      </View>
      <CustomButton text="Continue" onPress={handleOtpSubmit} />
      <View style={styles.resendContainer}>
        {canResend ? (
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.resendText}>Resend The Code</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.countdownText}>
            Resend OTP in {countdown} seconds
          </Text>
        )}
      </View>
      {loading && <CustomSmallLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginHorizontal: wp(2),
  },
  verificationTextContainer: {
    marginHorizontal: hp(2),
  },
  headingText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  subHeadingText: {
    marginTop: hp(0.5),
    color: 'purple',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionContainer: {
    marginVertical: hp(2),
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },
  otpContainer: {
    marginVertical: hp(2),
  },
  resendContainer: {
    marginVertical: hp(2),
  },
  resendText: {
    textAlign: 'center',
    color: 'green',
    fontSize: 15,
    fontWeight: '500',
  },
  countdownText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default OtpVerificationPage;


