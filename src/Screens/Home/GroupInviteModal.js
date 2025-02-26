import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import { fetchuserinvetation } from '../../Service/ApiService';
import { formatExpiryTime } from '../../Utils/Responsive';

const GroupInviteModal = ({visible, onClose, onAcceptInvite}) => {
  const [pendingGroups, setPendingGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchUserInvitations();
    }
  }, [visible]);

  const fetchUserInvitations = async () => {
    try {
      setLoading(true);
      const response = await fetchuserinvetation(); 
      console.log('response>>>>>', response);
      if (response.pendingGroups && response.pendingGroups.length > 0) {
        setPendingGroups(response.pendingGroups);
        Toast.show('Group invitations fetched successfully.', Toast.SHORT);
      } else {
        setPendingGroups([]);
      }
    } catch (error) {
      console.log("error",error)
      Toast.show('Error fetching group invitations.', Toast.SHORT);
    } finally {
      setLoading(false);
    }
    };

  const renderGroupItem = ({item}) => (
    <View style={styles.groupCard}>
      <View style={styles.groupCardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="people-circle" size={50} color="#4CAF50" />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.groupNameText} numberOfLines={1}>
            {item.groupName}
          </Text>
          <Text style={styles.expiryText}>
            {formatExpiryTime(item.expiryTime)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAcceptInvite(item.groupId)}>
          <Text style={styles.acceptButtonText}>Accept Invite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={30} color="red" />
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : pendingGroups.length > 0 ? (
            <FlatList
              data={pendingGroups}
              renderItem={renderGroupItem}
              keyExtractor={item => item.groupId}
              contentContainerStyle={styles.flatListContent}
            />
          ) : (
            <Text style={styles.noInvitationsText}>
              No invitations available
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  groupCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 25,
    padding: 5,
  },
  headerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  groupNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  expiryText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  noInvitationsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GroupInviteModal;
