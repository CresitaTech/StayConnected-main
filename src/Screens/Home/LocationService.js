// import BackgroundFetch from 'react-native-background-fetch';
// import axios from 'axios';
// import {BaseUrl, Token, Endpoints} from '../../Service/Config';
// import {AppState, Platform} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// const sendLocation = async (latitude, longitude) => {
//   try {
//     const data = JSON.stringify({latitude, longitude});
//     console.log("lattitiudesending>>>",JSON.stringify(latitude));
//     console.log("longituteaening>>>>>>",JSON.stringify(longitude));
//     const response = await axios.post(
//       `${BaseUrl}${Endpoints.sendUserlocation}`,
//       data,
//       {
//         headers: {
//           Authorization: Token,
//           'Content-Type': 'application/json',
//         },
//         maxBodyLength: Number.POSITIVE_INFINITY,
//       },
//     );
//     console.log('Location sent successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.log("error location",JSON.stringify(error));
//     console.error('Error sending location:', error);
//     throw error;
//   }
// };

// const getLocation = () => {
//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       position => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       error => {
//         reject(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   });
// };

// let foregroundTimer = null;

// const startForegroundLocationSend = () => {
//   if (foregroundTimer) {
//     clearInterval(foregroundTimer);
//   }
//   foregroundTimer = setInterval(async () => {
//     try {
//       const {latitude, longitude} = await getLocation();
//       await sendLocation(latitude, longitude);
//     } catch (error) {
//       console.error('Error in foreground location send:', error);
//     }
//   }, 2 * 60 * 1000);
// };

// const stopForegroundLocationSend = () => {
//   if (foregroundTimer) {
//     clearInterval(foregroundTimer);
//     foregroundTimer = null;
//   }
// };

// const startBackgroundLocationFetch = () => {
//   BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 2,
//       stopOnTerminate: false,
//       startOnBoot: true,
//       enableHeadless: true,
//       requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
//       requiresCharging: false,
//       requiresDeviceIdle: false,
//       requiresBatteryNotLow: false,
//       requiresStorageNotLow: false,
//     },
//     async taskId => {
//       console.log('[BackgroundFetch] taskId:', taskId);
//       try {
//         const {latitude, longitude} = await getLocation();
//         await sendLocation(latitude, longitude);
//       } catch (error) {
//         console.log('Error sending location:', error);
//       }
//       BackgroundFetch.finish(taskId);
//     },
//     error => {
//       console.log('[BackgroundFetch] failed to start', error);
//     },
//   );

//   BackgroundFetch.start();
// };

// const stopBackgroundLocationFetch = () => {
//   BackgroundFetch.stop();
// };

// const setupLocationTracking = () => {
//   if (Platform.OS === 'android') {
//     BackgroundFetch.registerHeadlessTask(async ({taskId}) => {
//       try {
//         const {latitude, longitude} = await getLocation();
//         await sendLocation(latitude, longitude);
//       } catch (error) {
//         console.log('Error in headless task:', JSON.stringify(error));
//       }
//       BackgroundFetch.finish(taskId);
//     });
//   }

//   startBackgroundLocationFetch();

//   AppState.addEventListener('change', nextAppState => {
//     if (nextAppState === 'active') {
//       stopBackgroundLocationFetch();
//       startForegroundLocationSend();
//     } else if (nextAppState === 'background') {
//       stopForegroundLocationSend();
//       startBackgroundLocationFetch();
//     }
//   });

//   startForegroundLocationSend();
// };

// export {
//   setupLocationTracking,
//   stopBackgroundLocationFetch,
//   stopForegroundLocationSend,
// };
import BackgroundFetch from 'react-native-background-fetch';
import axios from 'axios';
import {BaseUrl, Token, Endpoints} from '../../Service/Config';
import {AppState, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const sendLocation = async (latitude, longitude) => {
  try {
    const data = JSON.stringify({latitude, longitude});
    console.log("Sending location:", JSON.stringify({latitude, longitude}));
    const response = await axios.post(
      `${BaseUrl}${Endpoints.sendUserlocation}`,
      data,
      {
        headers: {
          Authorization: Token,
          'Content-Type': 'application/json',
        },
        maxBodyLength: Number.POSITIVE_INFINITY,
      },
    );
    console.log('Location sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending location:', error);
    throw error;
  }
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

let foregroundTimer = null;

const startForegroundLocationSend = () => {
  if (foregroundTimer) {
    clearInterval(foregroundTimer);
  }
  foregroundTimer = setInterval(async () => {
    try {
      const {latitude, longitude} = await getLocation();
      await sendLocation(latitude, longitude);
    } catch (error) {
      console.log("erroro",JSON.stringify(error));
      console.error('Error in foreground location send:', error);
    }
  }, 1 * 60 * 1000);
};

const stopForegroundLocationSend = () => {
  if (foregroundTimer) {
    clearInterval(foregroundTimer);
    foregroundTimer = null;
  }
};

const startBackgroundLocationFetch = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 2,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      requiresCharging: false,
      requiresDeviceIdle: false,
      requiresBatteryNotLow: false,
      requiresStorageNotLow: false,
    },
    async taskId => {
      console.log('[BackgroundFetch] Task started:', taskId);
      try {
        const {latitude, longitude} = await getLocation();
        await sendLocation(latitude, longitude);
      } catch (error) {
        console.error('Error in background location send:', error);
      }
      BackgroundFetch.finish(taskId);
    },
    error => {
      console.error('[BackgroundFetch] Failed to start:', error);
    },
  );

  BackgroundFetch.start();
};

const stopBackgroundLocationFetch = () => {
  BackgroundFetch.stop();
};

const setupLocationTracking = async () => {
  if (Platform.OS === 'android') {
    // Check and request permissions
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.error('Location permission denied');
      return;
    }

    BackgroundFetch.registerHeadlessTask(async ({taskId}) => {
      console.log('[BackgroundFetch] Headless task started:', taskId);
      try {
        const {latitude, longitude} = await getLocation();
        await sendLocation(latitude, longitude);
      } catch (error) {
        console.error('Error in headless task:', error);
      }
      BackgroundFetch.finish(taskId);
    });
  }

  startBackgroundLocationFetch();

  AppState.addEventListener('change', nextAppState => {
    console.log('App state changed to:', nextAppState);
    if (nextAppState === 'active') {
      stopBackgroundLocationFetch();
      startForegroundLocationSend();
    } else if (nextAppState === 'background') {
      stopForegroundLocationSend();
      startBackgroundLocationFetch();
    }
  });

  startForegroundLocationSend();
};

export {
  setupLocationTracking,
  stopBackgroundLocationFetch,
  stopForegroundLocationSend,
};