import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import { Platform } from "react-native"

const getLocationPermissions = () => {
  if (Platform.OS === "android") {
    return {
      foreground: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      background: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    }
  } else {
    return {
      foreground: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      background: PERMISSIONS.IOS.LOCATION_ALWAYS,
    }
  }
}

// export const checkLocationPermission = async () => {
//   const { foreground, background } = getLocationPermissions()

//   try {
//     const foregroundStatus = await check(foreground)
//     const backgroundStatus = await check(background)

//     if (backgroundStatus === RESULTS.GRANTED) {
//       return "always"
//     } else if (foregroundStatus === RESULTS.GRANTED) {
//       return "while_in_use"
//     } else {
//       switch (foregroundStatus) {
//         case RESULTS.DENIED:
//           return "denied"
//         case RESULTS.BLOCKED:
//           return "blocked"
//         case RESULTS.LIMITED:
//           return "limited"
//         default:
//           return "unknown"
//       }
//     }
//   } catch (error) {
//     console.error("Error checking location permission:", error)
//     return "unknown"
//   }
// }
export const requestLocationPermission = async () => {
  console.log("Inside requestLocationPermission function...");
  
  const { foreground, background } = getLocationPermissions();

  try {
    const foregroundResult = await request(foreground);
    // console.log("Foreground permission result:", foregroundResult);

    if (foregroundResult === RESULTS.GRANTED) {
      const backgroundResult = await request(background);

      return backgroundResult === RESULTS.GRANTED ? "always" : "while_in_use";
    }

    return foregroundResult;
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return "unknown";
  }
};
