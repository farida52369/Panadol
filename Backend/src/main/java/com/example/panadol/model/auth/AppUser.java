package com.example.panadol.model.auth;

import com.example.panadol.security.Role;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appUser")
public class AppUser {
    @Id
    @Column(unique = true, nullable = false, name = "userId", length = 100)
    private String email;
    @Column(nullable = false, name = "userName", length = 100)
    private String userName;
    @Column(nullable = false, name = "encodedPassword", length = 65)
    private String password;
    @Column(nullable = false, name = "phone", length = 15)
    private String phoneNumber;
    private Boolean enabled;
    private Role role;
}
