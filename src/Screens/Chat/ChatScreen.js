import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hp } from '../../Utils/Responsive';
import { socket, connectSocket, disconnectSocket } from '../../Utils/Socket';
import { Token } from '../../Service/Config';
import { useSelector } from 'react-redux';

const ChatScreen = ({ route, navigation }) => {
  const { groupName, groupMembers, groupId } = route.params;
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const currentGroupRef = useRef(null);
  const isuser = user?._id;
  const flatListRef = useRef(null);
  useEffect(() => {
    console.log('Connecting to WebSocket for group:', groupId);
    
    if (currentGroupRef.current && currentGroupRef.current !== groupId) {
      socket.emit('leaveGroup', { group_id: currentGroupRef.current });
    }
    
    currentGroupRef.current = groupId;
    const token = Token;

    if (!socket.connected) {
      connectSocket(token);
    }

    const handleConnect = () => {
      console.log('WebSocket connected! Joining group:', groupId);
      socket.emit('joinGroup', { group_id: groupId });
    };

    const handlePreviousMessages = (messages) => {
      console.log('Received previous messages for group:', groupId);
      if (currentGroupRef.current === groupId) {
        setChatMessages(
          messages.map((msg) => ({
            id: msg.timestamp,
            text: msg.message,
            userId: msg.userId,
            userName: msg.userName,
            timestamp: msg.timestamp,
            groupId: groupId,
          }))
        );
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    };

    const handleNewMessage = (newMessage) => {
      console.log('New message received for group:', groupId);
      if (currentGroupRef.current === groupId) {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            id: newMessage.timestamp,
            text: newMessage.message,
            userId: newMessage.user,
            userName: newMessage.userName,
            timestamp: newMessage.timestamp,
            groupId: groupId,
          },
        ]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    };

    socket.on('connect', handleConnect);
    socket.on('previousMessages', handlePreviousMessages);
    socket.on('message', handleNewMessage);
    if (socket.connected) {
      handleConnect();
    }
    return () => {
      console.log('Leaving group:', groupId);
      socket.emit('leaveGroup', { group_id: groupId });
      socket.off('connect', handleConnect);
      socket.off('previousMessages', handlePreviousMessages);
      socket.off('message', handleNewMessage);
      currentGroupRef.current = null;
    };
  }, [groupId]);
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const sendMessage = () => {
    if (messageText.trim() !== '') {
      socket.emit('sendMessage', { group_id: groupId, message: messageText });
      setMessageText('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          navigation.navigate('ChatHeaderView', { groupName, groupMembers, groupId })
        }>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerLeft}>
          <Icon name="arrow-back" size={24} color="green" />
        </Pressable>
        <View style={{ marginHorizontal: hp(3) }}>
          <Text style={styles.headerTitle}>{groupName}</Text>
          <Text style={styles.groupMembers}>
            {Array.isArray(groupMembers)
              ? `${groupMembers.length} members`
              : 'Loading members...'}
          </Text>
        </View>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={chatMessages}
        inverted={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.userId === isuser ? styles.senderMessage : styles.receiverMessage,
            ]}>
            {item.userId !== isuser && (
              <Text style={styles.userNameText}>{item.userName}</Text>
            )}
            <View
              style={[
                styles.messageBubble,
                item.userId === isuser ? styles.senderBubble : styles.receiverBubble,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  item.userId === isuser ? styles.senderText : styles.receiverText,
                ]}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={messageText}
          onChangeText={setMessageText}
          placeholderTextColor={'black'}
        />
        <Pressable onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupMembers: {
    fontSize: 14,
    color: 'green',
  },
  chatList: {
    paddingVertical: 16,
  },
  headerLeft: { marginRight: hp(2) },
  headerTitle: { fontSize: hp(2.5), fontWeight: 'bold' },
  groupMembers: { fontSize: hp(1.8), color: '#666' },
  messageContainer: {
    padding: hp(1),
    borderRadius: hp(1),
    maxWidth: '75%',
  },
  messageBubble: {
    padding: hp(1.5),
    borderRadius: hp(1.5),
  },
  senderMessage: { alignSelf: 'flex-end' },
  receiverMessage: { alignSelf: 'flex-start' },
  senderBubble: { backgroundColor: '#DCF8C6' },
  receiverBubble: { backgroundColor: '#ECECEC' },
  messageText: { fontSize: hp(2) },
  senderText: { color: '#000' },
  receiverText: { color: '#000' },
  userNameText: {
   fontSize:15,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: hp(1),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: hp(1),
    marginRight: hp(1),
    color: 'black',
  },
  sendButton: { backgroundColor: 'green', padding: hp(1.5), borderRadius: hp(1) },
});

export default ChatScreen;