// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Pressable,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { hp } from '../../Utils/Responsive';
// import { socket, connectSocket, disconnectSocket } from '../../Utils/Socket';
// import { Token } from '../../Service/Config';
// import { useSelector } from 'react-redux';

// const ChatScreen = ({ route, navigation }) => {
//   const { groupName, groupMembers, groupId } = route.params;
//   const [messageText, setMessageText] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const { user } = useSelector((state: RootState) => state.user);
//   const isuser = user?._id;
//   console.log("isuser",JSON.stringify(isuser));
//   useEffect(() => {
//     console.log('Attempting to connect to the WebSocket...');
//     const token = Token;
//     connectSocket(token);
// console.log("chattoken",token);
//     socket.on('connect', () => {
//       console.log('WebSocket connected successfully!');
//       console.log('Joining group:', groupId);
//       socket.emit('joinGroup', { group_id: groupId });
//     });
//     socket.on('connect_error', (error) => {
//       console.error('WebSocket connection error:', error);
//     });
//     socket.on('disconnect', (reason) => {
//       console.warn('WebSocket disconnected. Reason:', reason);
//     });
//     socket.on('previousMessages', (messages) => {
//       console.log('Received previous messages:', JSON.stringify(messages));
//       setChatMessages(
//         messages.map((msg) => ({
//           id: msg._id,
//           text: msg.message,
//         }))
//       );
//     });
//     socket.on('message', (newMessage) => {
//       console.log('New message received:', JSON.stringify(newMessage));
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           id: newMessage._id,
//           text: newMessage.message,
//         },
//       ]);
//     });
//     return () => {
//       console.log('Disconnecting WebSocket...');
//       disconnectSocket();
//     };
//   }, [groupId]);

//   const sendMessage = () => {
//     if (messageText.trim() !== '') {
//       console.log('Sending message:', messageText);
//       socket.emit('sendMessage', { group_id: groupId, message: messageText });
//       setMessageText('');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.header}
//         onPress={() =>
//           navigation.navigate('ChatHeaderView', { groupName, groupMembers, groupId })
//         }>
//         <Pressable onPress={() => navigation.goBack()} style={styles.headerLeft}>
//           <Icon name="arrow-back" size={24} color="green" />
//         </Pressable>
//         <View style={{ marginHorizontal: hp(3) }}>
//           <Text style={styles.headerTitle}>{groupName}</Text>
//           <View style={styles.headerRight}>
//             <Text style={styles.groupMembers}>
//               {Array.isArray(groupMembers)
//                 ? `${groupMembers.length} members`
//                 : 'Loading members...'}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
    
//       <FlatList
//   data={chatMessages}
//   showsVerticalScrollIndicator={false}
//   keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} 
//   renderItem={({ item }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.isSender ? styles.senderMessage : styles.receiverMessage,
//       ]}>
//       <Text
//         style={[
//           styles.messageText,
//           item.isSender ? styles.senderText : styles.receiverText,
//         ]}>
//         {item.text}
//       </Text>
//     </View>
//   )}
//   inverted={false}
//   contentContainerStyle={styles.chatList}
// />

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           value={messageText}
//           onChangeText={setMessageText}
//           placeholderTextColor={'black'}
//         />
//         <Pressable onPress={sendMessage} style={styles.sendButton}>
//           <Icon name="send" size={24} color="white" />
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: hp(2),
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   headerLeft: {
//     marginRight: hp(2),
//   },
//   headerTitle: {
//     fontSize: hp(2.5),
//     fontWeight: 'bold',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   groupMembers: {
//     fontSize: hp(1.8),
//     color: '#666',
//   },
//   messageContainer: {
//     padding: hp(1.5),
//     borderRadius: hp(1),
//     marginVertical: hp(0.5),
//     maxWidth: '80%',
//   },
//   senderMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#DCF8C6',
//   },
//   receiverMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#ECECEC',
//   },
//   messageText: {
//     fontSize: hp(2),
//   },
//   senderText: {
//     color: '#000',
//   },
//   receiverText: {
//     color: '#000',
//   },
//   chatList: {
//     padding: hp(2),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: hp(1.5),
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
//   input: {
//     flex: 1,
//     padding: hp(1),
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: hp(1),
//     marginRight: hp(1),
//     color: 'black',
//   },
//   sendButton: {
//     backgroundColor: 'green',
//     padding: hp(1.5),
//     borderRadius: hp(1),
//   },
// });

// export default ChatScreen;


