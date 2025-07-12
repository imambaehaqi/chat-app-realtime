package com.chatapp.repository;

import com.chatapp.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findBySenderIdAndRecipientIdOrRecipientIdAndSenderId(
            String sender1, String recipient1, String sender2, String recipient2);
}