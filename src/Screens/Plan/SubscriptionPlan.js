import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../Componnet/CustomButton';
import CustomHeader from '../../Componnet/CustomHeader';
import CustomSmallLoader from '../../Componnet/CustomSmallLoader';
import { fetchSubscriptionPlans } from '../../Service/ApiService';
import { hp } from '../../Utils/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { completeProfileSetup } from '../../Redux/ProfileSetupSlice';
import { profile } from '../../Assests/image';
import RazorpayCheckout from "react-native-razorpay"
import axios from 'axios';
import { store } from '../../Redux/Store';
import { setAuthData } from '../../Redux/authSlice';
const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const Token = store.getState().auth.token;
    const auth = useSelector(state => state.auth); 
  console.log("token>>>",Token);
  console.log('user...',JSON.stringify(user));
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
const dispatch = useDispatch()
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await fetchSubscriptionPlans();
        if (response.success) {
          setPlans(response.data);
        } else {
          Toast.show('Failed to fetch plans.', Toast.LONG);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        Toast.show('Error fetching subscription plans.', Toast.LONG);
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);
  const handleSubscription = async () => {
    if (!selectedPlan) {
      Toast.show('Please select a plan.', Toast.LONG)
      return
    }
  
    const options = {
      description: `Subscription for ${selectedPlan.name} plan`,
      image: profile,
      currency: 'INR',
      key: 'rzp_test_Yd9DFTWy40fhID',
      amount: selectedPlan.pricePerMonth * 100,
      name: 'StayConnected',
      prefill: {
        email: user.email || '',
        contact: user.phone || '',
        name: user.name || '',
      },
      theme: { color: '#53a20e' },
    }
  
    try {
      setLoading(true) 
      const data = await RazorpayCheckout.open(options)
      console.log('Payment Success', JSON.stringify(data))
      const verifyResponse = await verifyPayment(data.razorpay_payment_id)
  
      if (verifyResponse?.message === 'Payment Verified successfully') {
        dispatch(completeProfileSetup())
        Toast.show(
          `You have successfully subscribed to the ${selectedPlan.name} plan.`,
          Toast.LONG
        )
        dispatch(
          setAuthData({
            ...auth,
            is_subscribed: true,
          })
        );
        navigation.navigate('HomeScreen') 
        
      } else {
        Toast.show('Payment verification failed. Please contact support.', Toast.LONG)
      }
    } catch (error) {
      console.log('Payment Failed', JSON.stringify(error))
      Toast.show('Payment failed. Please try again.', Toast.LONG)
    } finally {
      setLoading(false)
    }
  }
  
  const verifyPayment = async (razorpayPaymentId) => {
    try {
      const response = await axios.post(
        'http://198.38.88.235:8082/api/verifyPayment',
        { razorpay_payment_id: razorpayPaymentId },
        {
          headers: {
            Authorization: Token,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('Payment Verification Response:', response.data)
      return response.data
    } catch (error) {
      console.log("error",JSON.stringify(error));
      if (error.response) {
        // Backend responded with an error status
        console.log('Verification Error Data:', error.response.data)
        console.log('Verification Error Status:', error.response.status)
        console.log('Verification Error Headers:', error.response.headers)
      } else if (error.request) {
        // Request was made but no response received
        console.log('Verification Error Request:', error.request)
      } else {
        // Something else went wrong
        console.log('Verification Error:', error.message)
      }
      return null
    }
  }
  
  return (
    <View style={styles.container}>
      <CustomHeader showBackArrow={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContent}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Subscription Plan</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>😊 Buy with Confidence:</Text>{' '}
              Cancel at any time.
            </Text>
            <Text style={[styles.infoText, styles.underline]}>
              If you cancel your subscription plan before the 30 days trial
              period expires, you will not be charged for using our service.
            </Text>
            <Text style={styles.infoText}>
              Additionally, any data you would have entered during the trial
              period will be deleted from our app.
            </Text>
          </View>
          <Text style={styles.planTitle}>Just pick the one that suits you</Text>

          {/* {loading ? (
            <CustomSmallLoader/>
          ) : ( */}
            <View style={styles.planContainer}>
              {plans.map(plan => (
                <TouchableOpacity
                  key={plan._id}
                  style={[
                    styles.planBox,
                    selectedPlan?._id === plan._id && styles.selectedPlanBox,
                  ]}
                  onPress={() => setSelectedPlan(plan)}>
                  <View style={styles.planHeader}>
                    <Icon
                      name={
                        selectedPlan?._id === plan._id
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={24}
                      color="green"
                    />
                    <View style={styles.pricerow}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planPrice}>
                        ${plan.pricePerMonth}/month
                      </Text>
                    </View>
                  </View>
                  <View style={{marginLeft: hp(3)}}>
                    <Text style={styles.planDescription}>
                      {plan.trialDays}-day free trial
                    </Text>
                    <Text style={styles.planDetails}>
                      • {plan.maxGroup} Groups
                    </Text>
                    <Text style={styles.planDetails}>
                      • {plan.maxMember} Members per group
                    </Text>
                  </View>
                  {plan.name === 'Silver' && (
                    <Text style={styles.recommendedTag}>Recommended</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          {/* )} */}

          <View style={{marginVertical: hp(2), marginBottom: hp(5)}}>
            <CustomButton text={'Subscribe'} onPress={handleSubscription} />
          </View>
        </View>
        </View>
        {loading && <CustomSmallLoader />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    backgroundColor: '#FFFFFF',
    marginVertical: hp(2),
    borderTopRightRadius: hp(3),
    borderTopLeftRadius: hp(3),
  },
  content: {marginHorizontal: hp(2)},
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginTop: hp(1),
  },
  infoBox: {
    backgroundColor: '#FFF5E1',
    padding: hp(2),
    borderRadius: 10,
    marginTop: hp(2),
  },
  infoText: {
    fontSize: 18,
    color: 'purple',
    lineHeight: hp(3),
  },
  boldText: {
    fontWeight: 'bold',
    color: 'purple',
    fontSize: 18,
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'purple',
    marginVertical: hp(2),
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    margin: hp(2),
  },
  planContainer: {
    marginHorizontal: hp(2),
  },
  planBox: {
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    padding: hp(2),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#D3D3D3',
    position: 'relative',
  },
  selectedPlanBox: {
    borderColor: 'green',
    backgroundColor: '#E6FFE6',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: hp(1),
  },
  planDescription: {
    fontSize: 14,
    color: '#5B4C4C',
    marginTop: hp(1),
  },
  planDetails: {
    fontSize: 14,
    color: '#5B4C4C',
  },

  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  recommendedTag: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#FFA500',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  pricerow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default SubscriptionPlan;