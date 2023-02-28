package com.example.panadol.model.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "businessInfo")
public class BusinessInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "businessInfoId")
    private Long id;
    @Column(nullable = false, name = "country", length = 50)
    private String country;
    @Column(nullable = false, name = "governorate", length = 50)
    private String governorate;
    @Column(nullable = false, name = "city", length = 50)
    private String city;
    @Column(nullable = false, name = "area", length = 50)
    private String area;
    @Column(nullable = false, name = "street", length = 50)
    private String street;
    @Column(nullable = false, name = "apartment", length = 50)
    private String apartment;
    @Column(nullable = false, name = "uniqueBusinessName", length = 100)
    private String uniqueBusinessName;
}
