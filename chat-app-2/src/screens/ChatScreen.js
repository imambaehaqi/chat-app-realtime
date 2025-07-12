import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { connectSocket, sendMessage, disconnectSocket } from '../services/socket';
import axios from 'axios';

const ChatScreen = () => {
  const userId = 'user-2'; // ganti hardcode ID sesuai kebutuhan
  const partnerId = 'user-1';
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("pehhhh")
    connectSocket((msg) => {
      console.log('Realtime masuk:', msg); // pastikan ini muncul!
      setMessages((prev) => [...prev, msg]);
    }, userId);

    axios.get(`http://10.10.102.149:8085/chat/${userId}/${partnerId}`)
      .then(res => setMessages(res.data));

    return () => disconnectSocket();
  }, []);

  const handleSend = () => {
    console.log('Kirim pesan:', message);
    sendMessage({
      senderId: userId,
      recipientId: partnerId,
      content: message,
    });
    setMessage('');
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.senderId === userId ? 'You' : 'Them'}: {item.content}
          </Text>
        )}
      />



      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

export default ChatScreen;