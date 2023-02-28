package com.example.panadol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserInfoController {

    /*
     *
    private final UserInfoService userInfoService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/profile/{email}"
    )
    public ResponseEntity<ProfileInfoResponse> getUserInfo(@PathVariable String email) {
        log.info("Getting User Info {}" + email);
        return ResponseEntity.ok().body(userInfoService.getUserInfo(email));
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/owned/products/{email}"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getUserOwnerProducts(@PathVariable String email) {
        log.info("Getting User Owned Products");
        return ResponseEntity.ok().body(userInfoService.getUserOwnerProducts(email));
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/purchased/products/{email}"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getUserPurchasedProducts(@PathVariable String email) {
        log.info("Getting User Purchased Products");
        return ResponseEntity.ok().body(userInfoService.getUserPurchasedProducts(email));
    }
    */
}
