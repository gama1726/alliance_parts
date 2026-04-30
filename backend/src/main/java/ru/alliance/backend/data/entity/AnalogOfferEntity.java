package ru.alliance.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "analog_offer")
public class AnalogOfferEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "analog_id", nullable = false)
    private AnalogEntity analog;

    @Column(name = "supplier", nullable = false)
    private String supplier;

    @Column(name = "price", nullable = false)
    private int price;

    public String getSupplier() {
        return supplier;
    }

    public int getPrice() {
        return price;
    }
}
