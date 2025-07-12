package com.chatapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class AppUser {
    @Id
    private String id;
    private String username;
    private String expoPushToken;
}
