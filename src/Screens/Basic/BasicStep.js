import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../Componnet/CustomHeader';
import {hp, wp} from '../../Utils/Responsive';
import {largelogo} from '../../Assests/image';
import CustomButton from '../../Componnet/CustomButton';
import { useNavigation } from '@react-navigation/native';

const BasicStep = () => {
  const steps = [
    'The leader or coordinator downloads and installs the StayConnected™ app on their smartphone.',
    'Customize the StayConnected™ app by creating one or more groups in the categories of family, circle of friends, and specific purpose groups.',
    'When launched, the StayConnected™ app automatically connects to your group members and provides a link for them to load and install the app on their individual phones.',
    'When you or they open up the app and select the group, they automatically see a map with the location of the members of the group on the map.',
    'You can click the icon of a member or select all members and send an SMS message to them.',
  ];
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <CustomHeader showBackArrow={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>The basic steps are:</Text>
          <FlatList
            data={steps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.stepItem}>
                <Icon
                  name="checkmark-done"
                  size={20}
                  color="#4CAF50"
                  style={styles.icon}
                />
                <Text style={styles.stepText}>{item}</Text>
              </View>
            )}
          />
        </View>

        <Text style={styles.subtitle}>As simple as that to use</Text>
        <View style={styles.logoContainer}>
          <Image source={largelogo} style={styles.logo} />
        </View>

        <View style={styles.footer}>
          <View style={styles.trialBox}>
            <Text style={styles.trialText}>TRY FOR FREE 30 DAYS</Text>
          </View>
          <Text style={styles.trialSubtext}>From: Internet Promise Group Inc.</Text>
        <View style={styles.empty}>
          <CustomButton text="Continue" onPress={() => navigation.navigate('StayConnectedScreen')} />
            </View>
        </View>
      </View>
      </ScrollView>
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
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginTop: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: 'Roboto-Regular',
    lineHeight: hp(2.5),
  },
  subtitle: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 15,
    color: 'purple',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp(4),
    width: wp(50),
    resizeMode: 'contain',
  },
  footer: {
    marginVertical: hp(2),
  },
  trialBox: {
    backgroundColor: '#FFFACD',
    padding: hp(2),
    marginHorizontal: hp(10),
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  trialText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  trialSubtext: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
  },
  empty: {
    marginVertical: hp(5),
  },
});

export default BasicStep;
