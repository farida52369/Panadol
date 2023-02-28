package com.example.panadol.security;

import com.example.panadol.model.auth.AppUser;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
public class JwtUser implements UserDetails {
    private final AppUser user;

    public JwtUser(AppUser user) {
        this.user = user;
    }

    public String getRole() {
        return user.getRole().role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole()));
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.user.getEnabled();
    }

    @Override
    public String toString() {
        return "User Info [id=" + user.getEmail() + ", name=" + user.getUserName() + ", enabled=" + user.getEnabled() + "]";
    }
}
