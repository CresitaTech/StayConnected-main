import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

import CustomHeader from '../../Componnet/CustomHeader';
import CustomButton from '../../Componnet/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { uploadImage } from '../../Service/ApiService';
import { hp, wp } from '../../Utils/Responsive';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import CustomSmallLoader from '../../Componnet/CustomSmallLoader';
import { setAuthData } from '../../Redux/authSlice';

const ImageUpload = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userName } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const auth = useSelector(state => state.auth); 
const dispatch = useDispatch();
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'No image selected.');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong.');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        setImageData({
          uri: selectedImage.uri,
          type: selectedImage.type,
          fileName: selectedImage.fileName,
        });
      }
    });
  };

  const handleRemoveImage = () => {
    setImageUri(null);
    setImageData(null);
  };

  const handleContinue = async () => {
    if (!imageData) {
      Alert.alert('Error', 'Please select an image before continuing.');
      return;
    }

    setLoading(true); // Show loader when starting the upload

    try {
      const response = await uploadImage(imageData, userName, token);
      console.log('Image upload response:', response);

      // ✅ Update Redux before navigating
      dispatch(
        setAuthData({
          ...auth, // Keep existing state
          isProfileSetup: true,
        })
      );

      // ✅ Navigate after Redux state updates
      navigation.replace('SubscriptionPlan');
    } catch (error) {
      if (error.message === 'Profile already created') {
        dispatch(
          setAuthData({
            ...auth,
            isProfileSetup: true,
          })
        );
        navigation.replace('SubscriptionPlan');
        return;
      }
      Toast.show(error.message || 'Failed to verify OTP. Please try again.', Toast.LONG);
      console.log('Error:', error);
    } finally {
      setLoading(false); // Hide loader after API response (success or failure)
    }
  };


  return (
    <View>
      <View style={styles.headerContainer}>
        <CustomHeader showBackArrow={true} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Please Add Your Photo</Text>
          <Text style={styles.subtitle}>This makes it easy for your family</Text>
          <Text style={styles.subtitle}>to find you</Text>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder} />
            )}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={imageUri ? handleRemoveImage : handleImagePick}>
              <Icon
                name={imageUri ? 'times-circle' : 'camera'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: hp(5) }}>
        <CustomButton text={'Continue'} onPress={handleContinue} />
      </View>

      {/* Show loader while uploading the image */}
      {loading && <CustomSmallLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#90EE90',
  },
  textContainer: {
    marginTop: hp(3),
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: hp(5),
    marginBottom: hp(5),
  },
  imageWrapper: {
    position: 'relative',
    width: wp(30),
    height: hp(15),
  },
  placeholder: {
    width: '100%',
    height: '100%',
    borderRadius: hp(60),
    backgroundColor: '#d3d3d3',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'green',
    borderRadius: 18,
    padding: 7,
  },
});

export default ImageUpload;
