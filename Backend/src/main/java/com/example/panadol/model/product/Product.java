package com.example.panadol.model.product;

import com.example.panadol.model.auth.AppUser;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private Long productId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ownerId", referencedColumnName = "userId")
    private AppUser ownerId;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "basicInfo", referencedColumnName = "basicInfoId")
    private ProductBasicInfo basicInfo;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "description", referencedColumnName = "descriptionId")
    private ProductDescription description;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_image_list", joinColumns = @JoinColumn(name = "product_id"))
    private List<ProductImage> imageList;
    private Date createdDate;

    public Product() {
        this.imageList = new ArrayList<>(4);
    }
}
