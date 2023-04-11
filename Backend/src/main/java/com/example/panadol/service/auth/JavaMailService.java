package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.NotificationEmail;
import com.example.panadol.exception.PanadolException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class JavaMailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendJavaMail(final NotificationEmail notificationEmail) {
        final String recipient = notificationEmail.getRecipient();
        final String subject = notificationEmail.getSubject();
        final String message = notificationEmail.getBody();
        final SimpleMailMessage email = new SimpleMailMessage();
        // email.setFrom(Objects.requireNonNull(env.getProperty("support.email")));
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(message);
        try {
            mailSender.send(email);
            log.info("Account activation");
        } catch (MailException e) {
            log.error("Exception occurred when sending mail");
            throw new PanadolException("Exception occurred when sending mail to " + notificationEmail.getRecipient(), e);
        }
    }
}
