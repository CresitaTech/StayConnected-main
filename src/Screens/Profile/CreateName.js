import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import {Headerimage} from '../../Assests/image';
import {hp, wp} from '../../Utils/Responsive';
import CustomButton from '../../Componnet/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { setupLocationTracking } from '../Home/LocationService';
const CreateName = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const handleContinue = () => {
      if (!name.trim()) {
        Toast.show('Please enter your name before continuing.', Toast.LONG);
      } else {
        navigation.navigate('ImageUpload', { userName: name });
        setupLocationTracking(); 
      }
    };
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={Headerimage} style={styles.customImage} />
      </View>
      <Text style={styles.headingText}>Please Enter Your Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Example: John"
        placeholderTextColor="#B3B3B3"
        value={name}
        onChangeText={setName}
      />
      <View style={{marginTop: hp(4)}}>
        <CustomButton text="Continue" onPress={handleContinue}/>
        </View>
    </View>
  );
};

export default CreateName;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(2),
    flex: 1,
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
    color: 'green',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginVertical: hp(2),
  },
  textInput: {
    backgroundColor: '#EDEDED',
    width: wp(80),
    height: hp(7),
    borderRadius: 10,
    paddingLeft: wp(4),
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },
});
