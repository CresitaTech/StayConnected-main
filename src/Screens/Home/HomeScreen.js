/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Headerimage, profile } from '../../Assests/image';
import CustomButton from '../../Componnet/CustomButton';
import CustomSmallLoader from '../../Componnet/CustomSmallLoader';
import { setUser } from '../../Redux/userslice';
import {
  acceptGroupInvitation,
  deleteGroup,
  fetchUserData,
  fetchUserGroup
} from '../../Service/ApiService';
import { hp } from '../../Utils/Responsive';
import GroupInviteModal from './GroupInviteModal';
import { styles } from './HomeScreenStyle';
import { requestLocationPermission } from "./LocationPermission";
import {
  setupLocationTracking
} from './LocationService';
const HomeScreen = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  console.log("tokenonhome",token);
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState([]);
  const [groupInviteModalVisible, setGroupInviteModalVisible] = useState(false);
  const [locationPermission, setLocationPermission] = useState("")
  
    const loadGroupData = async () => {
      try {
        setLoading(true);
        const response = await fetchUserGroup(token);
        if (response.groups && response.groups.length > 0) {
          setGroupData(response.groups);
          Toast.show('Groups fetched successfully.', Toast.LONG);
        } else {
          setGroupData([]);
          Toast.show('No groups found.', Toast.LONG);
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
        Toast.show('Error fetching group data.', Toast.LONG);
      } finally {
        setLoading(false);
      }
    };

    const loadUserData = async () => {
      try {
        const response = await fetchUserData(token); 
        if (response.data) {
          setUserData(response.data);
          dispatch(setUser(response.data));
        } else {
          Toast.show('Failed to fetch user data.', Toast.LONG);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Toast.show('Error fetching user data.', Toast.LONG);
      }
    };

    useEffect(() => {
      loadGroupData();
      loadUserData();
      setupLocationTracking();
    }, [dispatch]);
    useFocusEffect(
      useCallback(() => {
        setupLocationTracking();
      }, [])
    );
  const handleGroupPress = group => {
    setupLocationTracking(); 
    navigation.navigate('ChatScreen', {
      groupId: group._id,
      groupName: group.groupName,
      groupMembers: group.members,

    });
  };
  const handleAcceptInvite = async groupId => {
    setLoading(true);
    try {
      console.log('Accepting invite for group with ID:', groupId);
      const response = await acceptGroupInvitation(groupId);
      Toast.show('You have successfully joined the group!', Toast.LONG);
      setGroupInviteModalVisible(false);
      await loadGroupData();
    } catch (error) {
      console.log('Error accepting group invitation:', error);
      Toast.show('Failed to join the group. Please try again.', Toast.SHORT);
    } finally {
      setLoading(false);
    }
  };
  const handleEnableBackgroundLocation = async () => {
    const permissionStatus = await requestLocationPermission();
    console.log("permissionStatus", permissionStatus);
    setLocationPermission(permissionStatus);
  
    if (permissionStatus !== "always") {
      const trackingSetupSuccess = await setupLocationTracking();
      if (!trackingSetupSuccess) {
        Linking.openSettings();
      }
    }
    Toast.show('After Enabling Location please clear your App!', Toast.SHORT);
  };
  useEffect(() => {
    requestLocationPermission().then(result => {
      console.log("Location Permission Result:", result);
      setLocationPermission(result)
    }).catch(error => {
      console.error("Error requesting location permission:", error);
    });
  }, []);

  const handleDeleteGroup = async (groupId) => {
    setLoading(true);
    try {
      await deleteGroup(groupId);
      Toast.show('Group deleted successfully!', Toast.SHORT);
      await loadGroupData();
    } catch (error) {
      console.log('Error deleting group:', error);
      const errorMessage = error?.message || 'Failed to delete the group. Please try again.';
      Toast.show(errorMessage, Toast.SHORT);
    } finally {
      setLoading(false);
    }
  };
  const renderGroup = ({item}) => (
    <TouchableOpacity
      style={styles.groupContainer}
      onPress={() => handleGroupPress(item)}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupName}>{item.groupName}</Text>
        <Text style={styles.groupMembers}>{item.members.length} Member(s)</Text>
      </View>
      <View style={styles.imageRow}>
        <View style={styles.imageRowInner}>
          {item.members.slice(0, 3).map((member, index) => (
            <Image
              key={index}
              source={member.user.photo ? {uri: member.user.photo} : profile}
              style={styles.groupImage}
            />
          ))}
          {item.members.length > 3 && (
            <View style={styles.moreImagesContainer}>
              <Text style={styles.moreImagesText}>
                +{item.members.length - 3}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.actionButtons}>
          <Pressable
          onPress={ navigation.navigate('SubscriptionPlan')}
            // onPress={() => console.log('Edit Group', item._id)}
            style={styles.editButton}>
            <Icon2 name="edit" size={20} color="green" />
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDeleteGroup(item._id)}
            style={styles.deleteButton}>
            <Icon name="delete" size={20} color="red" />
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
console.log("locationpermission",locationPermission);
  return (
    <View style={styles.container}>
    
         {locationPermission !== "always" && (
        <View style={styles.warningBanner}>
          <Text style={styles.warningText}>Background location is not enabled</Text>
          <TouchableOpacity onPress={handleEnableBackgroundLocation} style={styles.enableButton}>
            <Text style={styles.enableButtonText}>Enable</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image source={Headerimage} style={styles.headerImage} />
        <Image
          source={UserData?.photo ? {uri: UserData.photo} : profile}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text numberOfLines={2} style={styles.userName}>
            {UserData?.name}
          </Text>
          <Text style={styles.userPhone}>{UserData?.phone}</Text>
        </View>
      </View>

      <View style={styles.groupSection}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.sectionTitle}>Current Groups</Text>
          <Text
            onPress={() => setGroupInviteModalVisible(true)}
            style={styles.sectionTitle}>
            Show Invitation
          </Text>
        </View>
        <FlatList
          data={groupData}
          keyExtractor={item => item._id}
          renderItem={renderGroup}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.groupList}
          ListEmptyComponent={
            <View style={styles.noGroupContainer}>
              <Text style={styles.noGroupText}>There is no group created</Text>
            </View>
          }
          ListFooterComponent={
            <View style={{marginBottom: hp(50), marginTop: hp(2)}}>
              <CustomButton
                text="Please Create Group"
                onPress={() => navigation.navigate('CreateGroup')}
              />
            </View>
          }
        />
      </View>
      <GroupInviteModal
        visible={groupInviteModalVisible}
        onClose={() => setGroupInviteModalVisible(false)}
        onAcceptInvite={handleAcceptInvite}
      />
      {loading && <CustomSmallLoader />}
    </View>
  );
};

export default HomeScreen;
