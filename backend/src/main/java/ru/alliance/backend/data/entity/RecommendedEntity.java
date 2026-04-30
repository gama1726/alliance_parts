package ru.alliance.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recommended_offer")
public class RecommendedEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "currency", nullable = false)
    private String currency;

    @Column(name = "delivery", nullable = false)
    private String delivery;

    @Column(name = "highlight", nullable = false)
    private boolean highlight;

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getPrice() {
        return price;
    }

    public String getCurrency() {
        return currency;
    }

    public String getDelivery() {
        return delivery;
    }

    public boolean isHighlight() {
        return highlight;
    }
}
