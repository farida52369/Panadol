package com.example.panadol.security;

public enum Role {
    ROLE_SELLER("SELLER"),
    ROLE_CUSTOMER("CUSTOMER");

    public final String role;

    Role(String role) {
        this.role = role;
    }
}
