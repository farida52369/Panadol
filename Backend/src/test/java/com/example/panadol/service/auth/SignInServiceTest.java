package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.AuthenticationResponse;
import com.example.panadol.dto.auth.LoginRequest;
import com.example.panadol.model.auth.RefreshToken;
import com.example.panadol.security.JwtProvider;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Slf4j
@RunWith(MockitoJUnitRunner.class)
public class SignInServiceTest {

    @Mock
    private JwtProvider jwtProvider;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private RefreshTokenService refreshTokenService;
    @Mock
    private AuthService authService;
    @InjectMocks
    private SignInService signInService;

    @Test
    public void testLoginToPanadol() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest("test@example.com", "password");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        )).thenReturn(authentication);
        when(jwtProvider.generateToken(authentication)).thenReturn("mockedToken");
        when(refreshTokenService.generateRefreshToken()).thenReturn(
                new RefreshToken(1234567890L, "mockedRefreshToken", new Date())
        );
        when(authService.getCurrentUserRole()).thenReturn("USER");

        // Act
        AuthenticationResponse response = signInService.loginToPanadol(loginRequest);

        // Assert
        assertNotNull(response);
        assertEquals("mockedToken", response.getAuthenticationToken());
        assertEquals("mockedRefreshToken", response.getRefreshToken());
        assertEquals("USER", response.getRole());

        // Verify that specific methods were called on the mocks
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtProvider, times(1)).generateToken(authentication);
        verify(refreshTokenService, times(1)).generateRefreshToken();
        verify(authService, times(1)).getCurrentUserRole();
    }
}
