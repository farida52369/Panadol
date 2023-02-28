package com.example.panadol.dto.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationEmail {
    private String recipient;
    private String subject;
    private String body;
}
