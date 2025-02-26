import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { hp } from '../Utils/Responsive';


const CustomSmallLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <ActivityIndicator size="large" color={'green'} />
      </View>
    </View>
  );
};

export default memo(CustomSmallLoader);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  subContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: hp(2),
    borderRadius: hp(1),
  },
});
