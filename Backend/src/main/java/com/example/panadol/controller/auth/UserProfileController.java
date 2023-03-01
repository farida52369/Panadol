package com.example.panadol.controller.auth;

import com.example.panadol.dto.auth.ChangePassword;
import com.example.panadol.dto.auth.ProfileResponse;
import com.example.panadol.service.auth.UserProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserProfileController {
    private final UserProfileService userProfileService;

    @GetMapping(value = "/profile")
    public ResponseEntity<ProfileResponse> getUserInfo() {
        return ResponseEntity.ok().body(userProfileService.getUserInfo());
    }

    @GetMapping(value = "/newUsername")
    public ResponseEntity<Boolean> changeUsername(@RequestParam String newUsername) {
        return ResponseEntity.ok().body(userProfileService.changeUsername(newUsername));
    }

    @GetMapping(value = "/newPhoneNumber")
    public ResponseEntity<Boolean> changePhoneNumber(@RequestParam String newPhoneNumber) {
        return ResponseEntity.ok().body(userProfileService.changePhoneNumber(newPhoneNumber));
    }

    @PostMapping(value = "/newPassword", consumes = {"application/json"})
    public ResponseEntity<Boolean> changePassword(@Valid @RequestBody ChangePassword password) {
        return ResponseEntity.ok().body(userProfileService.changePassword(password));
    }
}
