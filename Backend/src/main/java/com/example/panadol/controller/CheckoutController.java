package com.example.panadol.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/checkout")
@AllArgsConstructor
public class CheckoutController {
    /*

    private final CheckoutService checkoutService;

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = {"application/json"}
    )
    public ResponseEntity<?> checkoutOrder(@RequestBody CheckoutRequest checkoutRequest) {
        log.info("Checking Out From User: {}", checkoutRequest.getCustomer());
        checkoutService.saveOrder(checkoutRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }*/
}
