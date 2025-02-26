import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GroupCreationModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={70}
            color="#00C853"
            style={styles.icon}
          />

          {/* Title Text */}
          <Text style={styles.titleText}>
            Congratulations! The group is being created as we hear back the
            responses to the SMS sent to the members.
          </Text>

          {/* Description */}
          <Text style={styles.descriptionText}>
            As soon as we hear back from most of the members, we will notify you
            via SMS.
          </Text>

          {/* OK Button */}
          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#00C853',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  okButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default GroupCreationModal;
