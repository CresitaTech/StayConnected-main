import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../Componnet/CustomButton';
import CustomHeader from '../../Componnet/CustomHeader';
import {hp, wp} from '../../Utils/Responsive';
import { useNavigation } from '@react-navigation/native';

const StayConnectedScreen = () => {
     const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <CustomHeader showBackArrow={true} />
      <View style={styles.container}>
        <Text style={styles.title}>stay connected</Text>
        <View style={{marginHorizontal: wp(4)}}>
          <Text style={styles.description}>
            With the help of this app you will soon realize{' '}
            <Text style={styles.emphasis}>
              how important in life it is to StayConnected™
            </Text>{' '}
            in spite of widely available SMS to everyone.
          </Text>
          <Text style={styles.secondDescription}>
            StayConnected™ app enables you and your group to be visually
            connected by being able to see via a map where your family and your
            groups are at any time.
          </Text>
          <Text style={styles.secondDescription}>
            Thus StayConnected™ app provides an assurance and{' '}
            <Text style={styles.emphasis2}>
              fulfills a psychological need to know that they are there
            </Text>{' '}
            and you can reach them via one click.
          </Text>
          <View style={styles.expertSection}>
            <Icon name="account-group-outline" size={24} color="#6A1B9A" />
            <Text style={styles.expertText}>
              We are human factor experts in knowing your human needs.
            </Text>
            <Icon name="account-group-outline" size={24} color="#6A1B9A" />
          </View>

          <Text style={styles.linkText}>Tap here for User Guide.</Text>

          <Text style={styles.description}>
            StayConnected™ has been engineered for this app to be{' '}
            <Text style={styles.emphasis2}>super easy to install and use</Text>{' '}
            for you as well as your family and your groups.
          </Text>
        </View>
        <View style={styles.empty}>
          <CustomButton
            text="Continue"
            onPress={() => navigation.navigate('PhoneNumberVerification')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: wp(4),
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: hp(2.8),
    marginBottom: hp(1.5),
  },
  secondDescription: {
    fontSize: 16,
    color: '#4CAF50',
    lineHeight: hp(2.8),
    marginBottom: hp(1.5),
    fontFamily: 'semiBold',
  },
  emphasis2: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  emphasis: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#6A1B9A',
    textDecorationLine: 'underline',
  },
  expertSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  expertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: wp(5),
  },
  linkText: {
    fontSize: 16,
    color: '#6A1B9A',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  empty: {
    marginVertical: hp(12),
  },
});

export default StayConnectedScreen;
