package ru.alliance.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "garage_car")
public class GarageCarEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "label", nullable = false)
    private String label;

    @Column(name = "subtitle", nullable = false)
    private String subtitle;

    @Column(name = "vin", nullable = false)
    private String vin;

    @Column(name = "catalog_hint", nullable = false)
    private String catalogHint;

    public String getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getVin() {
        return vin;
    }

    public String getCatalogHint() {
        return catalogHint;
    }
}
