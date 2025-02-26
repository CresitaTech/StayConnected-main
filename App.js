// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { Provider, useSelector } from 'react-redux';
// import { store } from './src/Redux/Store';

// // Import Screens
// import { RootState } from './src/Redux/Store';
// import OtpVerificationPage from './src/Screens/Auth/OtpVerificationPage';
// import PhoneNumberVerification from './src/Screens/Auth/PhoneNumberVerification';
// import BasicStep from './src/Screens/Basic/BasicStep';
// import StayConnectedScreen from './src/Screens/Basic/StayConnectedScreen';
// import ChatHeaderView from './src/Screens/Chat/ChatHeaderView';
// import ChatScreen from './src/Screens/Chat/ChatScreen';
// import CreateGroup from './src/Screens/Chat/CreateGroup';
// import MapScreen from './src/Screens/Chat/MapScreen';
// import HomeScreen from './src/Screens/Home/HomeScreen';
// import MainScreen from './src/Screens/MainScreen';
// import SubscriptionPlan from './src/Screens/Plan/SubscriptionPlan';
// import CreateName from './src/Screens/Profile/CreateName';
// import ImageUpload from './src/Screens/Profile/ImageUpload';
// import { requestLocationPermission } from './src/Screens/Home/LocationPermission';

// const Stack = createNativeStackNavigator();

// // const AppNavigator = () => {
// //   const { token } = useSelector((state: RootState) => state.auth);
// //     const user = useSelector((state: RootState) => state.auth.user);
// //     console.log("user>>>>>",JSON.stringify(user));
// //   console.log("token>>>>>>>",token);
// //   const isProfileSetup = useSelector((state: RootState) => state.auth.isProfileSetup);
// //   const isSubscribed = useSelector((state: RootState) => state.auth.is_subscribed);
// //   console.log("isProfileSetup",isProfileSetup);
// //   console.log("isSubscribed",isSubscribed);
// //   const auth = useSelector((state: RootState) => state.auth);
// //   console.log("full>>>>",JSON.stringify(auth));
// //    const { isSetupComplete } = useSelector((state: RootState) => state.profileSetup);
// //   return (
// //     <>
// //       <StatusBar backgroundColor="green" barStyle="light-content" />
// //       <NavigationContainer>
// //         <Stack.Navigator screenOptions={{ headerShown: false }}>
// //           {!token ? (
// //             // Authentication flow
// //             <>
// //               <Stack.Screen name="Main" component={MainScreen} />
// //               <Stack.Screen name="BasicStep" component={BasicStep} />
// //               <Stack.Screen name="StayConnectedScreen" component={StayConnectedScreen} />
// //               <Stack.Screen name="PhoneNumberVerification" component={PhoneNumberVerification} />
// //               <Stack.Screen name="OtpVerificationPage" component={OtpVerificationPage} />
// //             </>
// //           ) : !isSetupComplete ? (
// //             <>
// //               <Stack.Screen name="CreateName" component={CreateName} />
// //               <Stack.Screen name="ImageUpload" component={ImageUpload} />
// //               <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
// //             </>
// //           ) : (
// //             <>
// //               <Stack.Screen name="HomeScreen" component={HomeScreen} />
// //               <Stack.Screen name="ChatScreen" component={ChatScreen} />
// //               <Stack.Screen name="CreateGroup" component={CreateGroup} />
// //               <Stack.Screen name="ChatHeaderView" component={ChatHeaderView} />
// //               <Stack.Screen name="MapScreen" component={MapScreen} />
// //             </>
// //           )}
// //         </Stack.Navigator>
// //       </NavigationContainer>
// //     </>
// //   );
// // };
// const AppNavigator = () => {
//   const auth = useSelector((state: RootState) => state.auth);
//   const { token, user } = auth || {}; // Extract token and user safely

//   console.log("Full Auth State:", JSON.stringify(auth, null, 2));
//   console.log("Token:", token);
//   console.log("User Data:", JSON.stringify(user, null, 2));

//   const isProfileSetupComplete = user?.isProfileSetupComplete ?? false;
//   const isSubscribed = user?.is_subscribed ?? false;

//   return (
//     <>
//       <StatusBar backgroundColor="green" barStyle="light-content" />
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {!token ? (
//             // Authentication flow
//             <>
//               <Stack.Screen name="Main" component={MainScreen} />
//               <Stack.Screen name="BasicStep" component={BasicStep} />
//               <Stack.Screen name="StayConnectedScreen" component={StayConnectedScreen} />
//               <Stack.Screen name="PhoneNumberVerification" component={PhoneNumberVerification} />
//               <Stack.Screen name="OtpVerificationPage" component={OtpVerificationPage} />
//             </>
//           ) : !isProfileSetupComplete ? (
//             // Profile setup flow
//             <>
//               <Stack.Screen name="CreateName" component={CreateName} />
//               <Stack.Screen name="ImageUpload" component={ImageUpload} />
//             </>
//           ) : !isSubscribed ? (
//             // Subscription flow
//             <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
//           ) : (
//             // Main app flow
//             <>
//               <Stack.Screen name="HomeScreen" component={HomeScreen} />
//               <Stack.Screen name="ChatScreen" component={ChatScreen} />
//               <Stack.Screen name="CreateGroup" component={CreateGroup} />
//               <Stack.Screen name="ChatHeaderView" component={ChatHeaderView} />
//               <Stack.Screen name="MapScreen" component={MapScreen} />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppNavigator />
      
//     </Provider>
//   );
// };

// export default App;




import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store, RootState } from './src/Redux/Store';

// Import Screens
import OtpVerificationPage from './src/Screens/Auth/OtpVerificationPage';
import PhoneNumberVerification from './src/Screens/Auth/PhoneNumberVerification';
import BasicStep from './src/Screens/Basic/BasicStep';
import StayConnectedScreen from './src/Screens/Basic/StayConnectedScreen';
import ChatHeaderView from './src/Screens/Chat/ChatHeaderView';
import ChatScreen from './src/Screens/Chat/ChatScreen';
import CreateGroup from './src/Screens/Chat/CreateGroup';
import MapScreen from './src/Screens/Chat/MapScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';
import MainScreen from './src/Screens/MainScreen';
import SubscriptionPlan from './src/Screens/Plan/SubscriptionPlan';
import CreateName from './src/Screens/Profile/CreateName';
import ImageUpload from './src/Screens/Profile/ImageUpload';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { token, isProfileSetup, is_subscribed } = auth || {};
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      setIsLoading(false);
    }
  }, [auth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!token ? (
            <>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="BasicStep" component={BasicStep} />
              <Stack.Screen name="StayConnectedScreen" component={StayConnectedScreen} />
              <Stack.Screen name="PhoneNumberVerification" component={PhoneNumberVerification} />
              <Stack.Screen name="OtpVerificationPage" component={OtpVerificationPage} />
            </>
          ) : !isProfileSetup ? (
            <>
              <Stack.Screen name="CreateName" component={CreateName} />
              <Stack.Screen name="ImageUpload" component={ImageUpload} />
            </>
          ) : !is_subscribed ? (
            <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
          ) : (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
              <Stack.Screen name="ChatHeaderView" component={ChatHeaderView} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
