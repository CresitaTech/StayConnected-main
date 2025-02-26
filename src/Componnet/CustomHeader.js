import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Headerimage} from '../Assests/image';
import {hp, wp} from '../Utils/Responsive';

const CustomHeader = ({showBackArrow = true}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBackArrow && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="green" />
        </TouchableOpacity>
      )}
      <Image source={Headerimage} style={styles.customImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  customImage: {
    width: wp(80),
    height: hp(5),
    resizeMode: 'contain',
  },
});

export default CustomHeader;
