package com.chatapp.service;

import com.chatapp.entity.ChatMessage;
import com.chatapp.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository repo;

    public ChatMessage save(ChatMessage message) {
        message.setId(UUID.randomUUID().toString());
        message.setTimestamp(LocalDateTime.now());
        return repo.save(message);
    }

    public List<ChatMessage> getChat(String user1, String user2) {
        return repo.findBySenderIdAndRecipientIdOrRecipientIdAndSenderId(user1, user2, user1, user2);
    }
}

