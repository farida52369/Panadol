package com.example.panadol.service;

import com.example.panadol.dto.product.SomeProductInfoResponse;
import com.example.panadol.mapper.product.ProductAbstractionMapper;
import com.example.panadol.model.product.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProductAbstractionMapper abstractionMapper;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<SomeProductInfoResponse> getProducts(
            String searchBy,
            final String filterByCategory,
            final String filterByPrice,
            final String filterByRate
    ) {
        List<SomeProductInfoResponse> res = new ArrayList<>();

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> criteriaQuery = builder.createQuery(Product.class);
        Root<Product> root = criteriaQuery.from(Product.class);

        List<Predicate> finalPredicates = new ArrayList<>();
        // search by keyword in product title
        if (searchBy != null && !searchBy.isEmpty()) {
            searchBy = searchBy.toLowerCase();

            // Expression<List<String>> keyFeatures = root.get("description").get("keyFeatures");
            Predicate searchPredicate = builder.or(
                    builder.like(builder.lower(root.get("basicInfo").get("category")), "%" + searchBy + "%"),
                    builder.like(builder.lower(root.get("basicInfo").get("title")), "%" + searchBy + "%"),
                    builder.like(builder.lower(root.get("description").get("description")), "%" + searchBy + "%"),
                    builder.like(root.get("basicInfo").get("price").as(String.class), "%" + searchBy + "%"),
                    builder.like(root.get("basicInfo").get("inStock").as(String.class), "%" + searchBy + "%"),
                    builder.like(root.get("basicInfo").get("rate").as(String.class), "%" + searchBy + "%")
            );
            finalPredicates.add(searchPredicate);
            // log.info("After Search Term");
        }

        // filter by category
        if (filterByCategory != null && !filterByCategory.isEmpty()) {
            Predicate filterByCategoryPredicate = builder.equal(root.get("basicInfo").get("category"), filterByCategory);
            finalPredicates.add(filterByCategoryPredicate);
            // log.info("After Filter By Category");
        }

        // filter by rate
        Predicate filterByRatePredicate = builder.greaterThanOrEqualTo(root.get("basicInfo").get("rate"), getRate(filterByRate));
        log.info("After Filter By Rate");

        Predicate finalPredicate;
        switch (finalPredicates.size()) {
            case 2:
                finalPredicate = builder.and(filterByRatePredicate, finalPredicates.get(0), finalPredicates.get(1));
                break;
            case 1:
                finalPredicate = builder.and(filterByRatePredicate, finalPredicates.get(0));
                break;
            default:
                finalPredicate = builder.and(filterByRatePredicate);
                break;
        }
        criteriaQuery.where(finalPredicate);

        // filter by price
        switch (filterByPrice) {
            case "Descending":
                criteriaQuery.orderBy(builder.desc(root.get("basicInfo").get("price")));
                break;
            case "Ascending":
                criteriaQuery.orderBy(builder.asc(root.get("basicInfo").get("price")));
                break;
        }

        // Limit By Specific Offset
        TypedQuery<Product> productsQuery = entityManager.createQuery(criteriaQuery);

        List<Product> products = productsQuery.getResultList();
        // log.info("Size of List Products: {}", products.size());
        products.forEach(product -> {
            res.add(abstractionMapper.map(product));
            log.info("Product #{}", product.getProductId());
        });

        entityManager.close();
        return res;
    }

    /*
     * The solution for making offset and limit when search & filter service
    // productsQuery.setFirstResult(getNumber(offset));
    // productsQuery.setMaxResults(getNumber(limit));
    private int getNumber(final String strNum) {
        int review;
        try {
            review = strNum.equals("") ? 0 : Integer.parseInt(strNum);
            return review;
        } catch (NumberFormatException e) {
            return 0;
        }
    }
     */

    private double getRate(String rate) {
        double review;
        try {
            review = rate.equals("") ? 0.0 : Double.parseDouble(rate);
            return review;
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
}
