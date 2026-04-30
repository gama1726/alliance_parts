package ru.alliance.backend.data.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_analog")
public class AnalogEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "brand", nullable = false)
    private String brand;

    @Column(name = "article", nullable = false)
    private String article;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "analog", cascade = CascadeType.ALL)
    @OrderBy("id asc")
    private List<AnalogOfferEntity> offers = new ArrayList<>();

    public String getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public String getArticle() {
        return article;
    }

    public String getName() {
        return name;
    }

    public List<AnalogOfferEntity> getOffers() {
        return offers;
    }
}
