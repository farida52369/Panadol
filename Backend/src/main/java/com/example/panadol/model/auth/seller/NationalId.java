package com.example.panadol.model.auth.seller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "nationalId")
public class NationalId {
    @Id
    @Column(unique = true, nullable = false, name = "nationalId", length = 20)
    private String nationalId;
    @Column(nullable = false, name = "expiryDate", length = 12)
    private String expiryDate;
}
