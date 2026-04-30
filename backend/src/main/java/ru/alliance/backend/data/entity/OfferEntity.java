package ru.alliance.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_offer")
public class OfferEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "supplier", nullable = false)
    private String supplier;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "stock_text", nullable = false)
    private String stock;

    @Column(name = "city", nullable = false)
    private String city;

    public String getId() {
        return id;
    }

    public String getSupplier() {
        return supplier;
    }

    public int getPrice() {
        return price;
    }

    public String getStock() {
        return stock;
    }

    public String getCity() {
        return city;
    }
}
