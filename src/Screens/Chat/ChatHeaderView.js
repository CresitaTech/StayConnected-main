import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import {profile} from '../../Assests/image';
import {useNavigation} from '@react-navigation/native';
import {hp} from '../../Utils/Responsive';
import { deleteGroupMember } from '../../Service/ApiService';
import { BaseUrl, Endpoints } from '../../Service/Config';
import axios from 'axios';
import CustomSmallLoader from '../../Componnet/CustomSmallLoader';
import { store } from '../../Redux/Store';

const ChatHeaderView = ({route}) => {
  const Token = store.getState().auth.token;
  const {groupName, groupMembers: initialGroupMembers, groupId} = route.params;
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [groupMembers, setGroupMembers] = useState(initialGroupMembers);
  const navigation = useNavigation();
  const handleDeleteMember = async userId => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this member?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteGroupMember(groupId, userId);
              setGroupMembers(prevMembers =>
                prevMembers.filter(member => member.user._id !== userId),
              );
              navigation.navigate("HomeScreen")
              Toast.show('Member deleted successfully', Toast.SHORT);
            },
          },
        ],
      );
    } catch (error) {
      console.log("error",error);
      Alert.alert('Error', error.message || 'Failed to delete the member');
    }
  };
  const fetchMemberLocation = async (memberUserId, groupId) => {
    try {
      setLoadingLocation(true);
  
      const data = {
        memberUserId: memberUserId,
        group_id: groupId,
      };
  
      console.log("Request data:", JSON.stringify(data));
  
      const response = await axios({
        method: 'post',
        url: `${BaseUrl}${Endpoints.getmemberlocation}`,
        headers: {
          'Authorization': Token,
          'Content-Type': 'application/json',
        },
        data: data, 
      });
  
      console.log("API Response:", JSON.stringify(response.data));
  
      if (response.data.location) {
        const { latitude, longitude } = response.data.location;
        return { latitude, longitude };
      } else {
        Toast.show('Location not available', Toast.SHORT);
        return null; 
      }
    } catch (error) {
      console.error('Error fetching member location:', error.response ? error.response.data : error.message);
      Toast.show('Failed to fetch location', Toast.SHORT);
      return null;
    } finally {
      setLoadingLocation(false);
    }
  };
  
  const handleLocationPress = async (item) => {
    const { location, photo } = item.user;

    const fetchedLocation = await fetchMemberLocation(item.user._id, groupId);
    console.log("lcayiopn",JSON.stringify(location));
    if (fetchedLocation) {
      navigation.navigate('MapScreen', {
        location: location,
        photo: photo || profile,
      });
    }
  };
  const renderMember = ({item}) => (
    <View style={styles.memberCard}>
      <Image
        source={item.user.photo ? {uri: item.user.photo} : profile}
        style={styles.profileImage}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.user.name || 'No Name'}</Text>
        <Text style={styles.memberRole}>
          {item.member_role === 1 ? 'Admin' : 'Member'}
        </Text>
        <Text style={styles.memberPhone}>{item.user.phone}</Text>
      </View>
      <View style={styles.memberActions}>
         <TouchableOpacity onPress={() => handleLocationPress(item)}>
         <Icon name="location-on" size={24} color="green" />
        </TouchableOpacity>
      {/* <TouchableOpacity
  onPress={() => {
    const { location, photo } = item.user;
    if (location?.coordinates && location.coordinates[0] !== 0 && location.coordinates[1] !== 0) {
      navigation.navigate('MapScreen', {
        location,
        photo: photo || profile,
      });
    } else {
      Toast.show('User location not available', Toast.SHORT);
    }
  }}
>
  <Icon name="location-on" size={24} color="green" />
</TouchableOpacity> */}

        <TouchableOpacity onPress={() => handleDeleteMember(item.user._id)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{groupName}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity   onPress={() => navigation.goBack()}>
            <Icon name="chat" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Icon
              name="person-add"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      {Array.isArray(groupMembers) && groupMembers.length > 0 ? (
        <FlatList
          data={groupMembers}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.user._id.toString()}
          renderItem={renderMember}
        />
      ) : (
        <Text style={styles.noMembersText}>No members found</Text>
      )}
       {loadingLocation && <CustomSmallLoader />}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: hp(1),
  },
  headerLeft: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    marginVertical: hp(1),
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
  },
  memberPhone: {
    fontSize: 14,
    color: '#666',
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noMembersText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChatHeaderView;
