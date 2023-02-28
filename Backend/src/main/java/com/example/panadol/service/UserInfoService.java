package com.example.panadol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserInfoService {

    /*
     *
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CheckoutRepository checkoutRepository;

    private AppUser getCurrentUser(String email) {
        return userRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User Email not Found - " + email));
    }

    public ProfileInfoResponse getUserInfo(String email) {
        AppUser appUser = getCurrentUser(email);
        return ProfileInfoResponse.builder().
                firstName(appUser.getFirstName()).
                lastName(appUser.getLastName()).
                email(appUser.getEmail()).
                phoneNumber(appUser.getPhoneNumber()).
                dateOfBirth(appUser.getDateOfBirth()).
                gender(appUser.getGender()).
                build();
    }

    public List<ProductSpecificDetails> getUserOwnerProducts(String email) {
        Optional<AppUser> owner = userRepository.findByEmail(email);
        if (!owner.isPresent()) return new ArrayList<>();
        List<Product> products = productRepository.findAllByManager(owner.get());
        List<ProductSpecificDetails> productResponse = new ArrayList<>();
        for (Product product : products) {
            ProductSpecificDetails response = ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    price(product.getPrice()).
                    inStock(product.getInStock()).
                    description(product.getDescription()).
                    image(product.getImage()).
                    build();
            productResponse.add(response);
        }
        return productResponse;
    }

    public List<ProductSpecificDetails> getUserPurchasedProducts(String email) {
        Optional<AppUser> owner = userRepository.findByEmail(email);
        if (!owner.isPresent()) return new ArrayList<>();
        List<Long> products = checkoutRepository.findCustomerPurchases(owner.get().getUserId());
        log.info("Length of Purchased Products {}", products.size());
        List<ProductSpecificDetails> productResponse = new ArrayList<>();
        for (Long productId : products) {
            Product product = productRepository.getById(productId);
            ProductSpecificDetails response = ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    price(product.getPrice()).
                    inStock(product.getInStock()).
                    description(product.getDescription()).
                    image(product.getImage()).
                    build();
            productResponse.add(response);
        }
        return productResponse;
    }
    */
}
