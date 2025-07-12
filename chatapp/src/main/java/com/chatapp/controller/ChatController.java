package com.chatapp.controller;

import com.chatapp.entity.ChatMessage;
import com.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessage message) {
        ChatMessage saved = chatService.save(message);
        // Kirim ke penerima
        messagingTemplate.convertAndSend("/topic/messages/" + message.getRecipientId(), saved);

        // Kirim juga ke pengirim, agar muncul langsung
        messagingTemplate.convertAndSend("/topic/messages/" + message.getSenderId(), saved);
    }

    @GetMapping("/{user1}/{user2}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String user1, @PathVariable String user2) {
        return ResponseEntity.ok(chatService.getChat(user1, user2));
    }
}