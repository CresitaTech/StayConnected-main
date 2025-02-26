import React, {useCallback} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {hp, wp} from '../Utils/Responsive';
import {MainImageLoader} from '../Assests/image';
import Geolocation from '@react-native-community/geolocation';
const MainScreen = () => {
  const navigation = useNavigation();
  Geolocation.getCurrentPosition(info => console.log(info));
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('BasicStep');
      }, 1500);

      return () => clearTimeout(timer);
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <Image
        source={MainImageLoader}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: hp(100),
    width: wp(100),
  },
});

export default MainScreen;
