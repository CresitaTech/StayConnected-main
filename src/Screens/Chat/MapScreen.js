import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { profile } from '../../Assests/image';



const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { location: userLocation, photo } = route.params;

  useEffect(() => {
    if (!userLocation || !userLocation.coordinates || userLocation.coordinates.length < 2) {
      ToastAndroid.show('Invalid location data', ToastAndroid.SHORT);
      setLoading(false);
    } else {
      setLocation({
        latitude: userLocation.coordinates[1],
        longitude: userLocation.coordinates[0],
      });
      setLoading(false);
    }
  }, [userLocation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <View style={styles.backButtonIconContainer}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.06,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={location}>
            <Image
              source={photo ? { uri: photo } : profile}
              style={styles.customMarker}
            />
          </Marker>
        </MapView>
      ) : (
        ToastAndroid.show('Location not available', ToastAndroid.SHORT)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  backButtonIconContainer: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
resizeMode:'cover'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
