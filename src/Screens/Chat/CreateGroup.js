import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropdown from '../../Componnet/CustomDropdown';
import { dropdownData } from '../../Utils/Mockdata';
import GroupCreationModal from './GroupCreateModel';
import { sendGroupInvitation } from '../../Service/ApiService';
const AddMemberModal = ({visible, onClose, onAddMember}) => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedValue, setSelectedValue] = useState('1');
  const nameRegex = /^[a-zA-Z\s]+$/; 
  const phoneRegex = /^\d{10}$/;

  const validateInput = () => {
    if (!nameRegex.test(contactName)) {
      Toast.show('Name can only contain letters and spaces.');
      return false;
    }
    if (!phoneRegex.test(contactNumber)) {
      Toast.show('Phone number must be exactly 10 digits without spaces or special characters.');
      return false;
    }
    return true;
  };
  const handleChange = item => {
    setSelectedValue(item.value);
    console.log('Selected Value:', item);
  };
  const handleAddMember = () => {
    if (validateInput()) {
      onAddMember({
        id: Date.now(),
        name: contactName,
        number: contactNumber,
        role: dropdownData.find(item => item.value === selectedValue)?.label,
      });
      setContactName('');
      setContactNumber('');
      setSelectedValue('1');
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Member</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={contactName}
              onChangeText={setContactName}
              placeholder="Enter member name"
               placeholderTextColor="black"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={10}
               placeholderTextColor="black"
            />
          </View>
          <Text style={styles.inputLabel}>Select Role</Text>
          <CustomDropdown
            placeholder="Select a role"
            data={dropdownData}
            value={selectedValue}
            onChange={handleChange}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                (!contactName || !contactNumber) && styles.disabledButton,
              ]}
              onPress={handleAddMember}
              disabled={!contactName || !contactNumber || !selectedValue}>
              <Text style={styles.addButtonText}>Add Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [members, setMembers] = useState([]);
  const navigation = useNavigation()
const [isgroupModalVisible, setgroupModalVisible] = useState(false);
  const addMember = newMember => {
    setMembers([...members, newMember]);
  };

  const removeMember = id => {
    setMembers(members.filter(member => member.id !== id));
  };
  const handleCloseModal = () => {
    navigation.goBack();
    setgroupModalVisible(false); 
  };

  const createGroup = async () => {
    if (!groupName.trim()) {
      Toast.show('Please enter a group name');
      return;
    }

    if (members.length === 0) {
      Toast.show('Please add at least one member');
      return;
    }

    try {
      const formattedMembers = members.map(member => ({
        name: member.name,
        phone: member.number,
        role: 2,
      }));
      const groupData = {
        group_name: groupName,
        members: formattedMembers
      };
      console.log("groupdta",JSON.stringify(groupData))
      const response = await sendGroupInvitation(groupData);
      console.log("rep[osen",JSON.stringify(response))
      Toast.show('Group created successfully');

      // Reset form and close modal
      setgroupModalVisible(true);
      setGroupName('');
      setMembers([]);
    } catch (error) {
      Toast.show('Failed to create group. Please try again.');
      console.error('Group creation error:', error);
      console.log("errr>>>>",JSON.stringify(error))
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Group</Text>
      </View>

      <TextInput
        style={styles.groupNameInput}
        placeholder="Group Name"
        value={groupName}
        onChangeText={setGroupName}
        placeholderTextColor="black"
      />

      <TouchableOpacity
        style={styles.addMemberButton}
        onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addMemberButtonText}>Add Members</Text>
      </TouchableOpacity>

      <FlatList
        data={members}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.memberCard}>
            <View>
              <Text style={styles.memberName}>Name: {item.name}</Text>
              <Text style={styles.memberNumber}>Number: {item.number}</Text>
              <Text style={styles.memberRole}>Role: {item.role}</Text>
            </View>
            <TouchableOpacity onPress={() => removeMember(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No members added yet</Text>
        )}
      />

      {members.length > 0 && groupName.trim() && (
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={createGroup}>
          <Text style={styles.createGroupButtonText}>
            Create "{groupName}" Group
          </Text>
        </TouchableOpacity>
      )}

      <AddMemberModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAddMember={addMember}
      />
      <GroupCreationModal visible={isgroupModalVisible} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  groupNameInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  addMemberButton: {
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  addMemberButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    color:'black',
    marginTop: 5,
  },
  memberNumber: {
    fontSize: 18,
    color:'black',
    marginTop: 5,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 12,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#333',
  },
  addButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  createGroupButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  createGroupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  memberRole: {
    color: 'black',
    marginTop: 5,
    fontSize: 18,
  },
});

export default CreateGroup;
