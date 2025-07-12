import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client = null;

export const connectSocket = (onMessage, userId) => {
  if (client && client.active) return;

  client = new Client({
    webSocketFactory: () => new SockJS('http://10.10.102.149:8085/ws'),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('CONNECTED');

      client.subscribe(`/topic/messages/${userId}`, (message) => {
        const payload = JSON.parse(message.body);
        console.log('Pesan dari socket:', payload); // <-- ini WAJIB muncul
        onMessage(payload);
      });
    },
    debug: (msg) => console.log('STOMP:', msg),
  });

  client.activate();
};



export const disconnectSocket = () => {
  if (client && client.active) {
    client.deactivate();
    console.log('Socket disconnected');
  }
};

export const sendMessage = (message) => {
  if (client && client.connected) {
    client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(message),
    });
  }
};
