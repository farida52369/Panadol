package com.example.panadol.service.auth;

import com.example.panadol.dto.auth.SignUpRequest;
import com.example.panadol.exception.PanadolException;
import com.example.panadol.model.auth.AppUser;
import com.example.panadol.model.auth.VerificationToken;
import com.example.panadol.repository.auth.UserRepository;
import com.example.panadol.response.GenericResponse;
import com.example.panadol.security.Role;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Slf4j
@RunWith(MockitoJUnitRunner.class)
public class SignUpServiceTest {
    @InjectMocks
    private SignUpService signUpService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private VerTokenService verificationTokenService;
    @Captor
    private ArgumentCaptor<AppUser> appUserCaptor;

    @Test
    public void testSignUpWhenAllRequirementsAreMet() {
        // Arrange
        SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setUserName("testUser");
        signUpRequest.setEmail("test@example.com");
        signUpRequest.setPassword("testPassword");
        signUpRequest.setPhoneNumber("1234567890");

        // Mock the userRepository behavior
        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(new AppUser());

        // Mock the passwordEncoder behavior
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");

        // Act
        signUpService.registerNewUser(signUpRequest);

        // Assert
        verify(userRepository, times(1)).save(appUserCaptor.capture());
        verify(verificationTokenService, times(1)).sendMailConfirmRegisteration(any());

        // Retrieve the captured AppUser
        AppUser capturedAppUser = appUserCaptor.getValue();
        log.info("The AppUser {} is created", capturedAppUser);

        // Perform assertions on the captured AppUser
        assertEquals("testUser", capturedAppUser.getUserName());
        assertEquals("test@example.com", capturedAppUser.getEmail());
        assertEquals("encodedPassword", capturedAppUser.getPassword());
        assertEquals("1234567890", capturedAppUser.getPhoneNumber());
        assertFalse(capturedAppUser.getEnabled()); // Assuming this is the default value
        assertEquals(Role.ROLE_CUSTOMER, capturedAppUser.getRole());
    }

    @Test
    public void testSignUpWhenUserAlreadyExists() {
        // Arrange
        SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setEmail("test@example.com");

        // Mock the userRepository behavior to simulate an existing user
        AppUser existingUser = new AppUser();
        existingUser.setEnabled(true);  // Set the enabled value
        when(userRepository.findByEmail(any())).thenReturn(Optional.of(existingUser));

        // Act, Assert
        assertThrows(PanadolException.class, () -> signUpService.registerNewUser(signUpRequest));
    }

    @Test
    public void testVerifyAccountTokenValid() {
        // Arrange
        final String validToken = "validToken";
        final VerificationToken verificationToken = new VerificationToken();
        final AppUser user = mock(AppUser.class);
        verificationToken.setUser(user);

        // Mock behavior of the verificationTokenService
        when(verificationTokenService.validateVerificationToken(validToken)).thenReturn(GenericResponse.TOKEN_VALID);
        when(verificationTokenService.getByToken(validToken)).thenReturn(verificationToken);

        // Mock behavior of userRepository
        when(userRepository.save(any())).thenReturn(user);

        // Act
        String result = signUpService.verifyAccount(validToken);

        // Assert
        verify(user, times(1)).setEnabled(true);
        verify(userRepository, times(1)).save(user);
        verify(verificationTokenService, times(1)).deleteToken(verificationToken);
        assertEquals("Account activated Successfully!", result);
    }

    @Test
    public void testVerifyAccountTokenExpired() {
        // Arrange
        String expiredToken = "expiredToken";

        // Mock behavior of the verificationTokenService
        when(verificationTokenService.validateVerificationToken(expiredToken)).thenReturn(GenericResponse.TOKEN_EXPIRED);

        // Act
        String result = signUpService.verifyAccount(expiredToken);

        // Assert
        assertEquals("Token expired (normally expires after One hours)\nTry registration again ...", result);
    }

    @Test
    public void testVerifyAccountInvalidToken() {
        // Arrange
        String invalidToken = "invalidToken";

        // Mock behavior of the verificationTokenService
        when(verificationTokenService.validateVerificationToken(invalidToken)).thenReturn(GenericResponse.TOKEN_INVALID);

        // Act
        String result = signUpService.verifyAccount(invalidToken);

        // Assert
        assertEquals("Invalid Token that you provided :)", result);
    }
}
