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
@Table(name = "identityInfo")
public class IdentityInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "identityInfoId")
    private Long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nationalId", referencedColumnName = "nationalId")
    private NationalId nationalID;
    @Column(nullable = false, name = "firstName", length = 50)
    private String firstName;
    @Column(nullable = false, name = "middleName", length = 50)
    private String middleName;
    @Column(nullable = false, name = "lastName", length = 50)
    private String lastName;
    @Column(nullable = false, name = "dateOfBirth", length = 12)
    private String dateOfBirth;
}
