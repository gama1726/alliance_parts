package ru.alliance.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicle_lookup")
public class VehicleLookupEntity {
    @Id
    @Column(name = "vin", nullable = false)
    private String vin;

    @Column(name = "brand", nullable = false)
    private String brand;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "generation", nullable = false)
    private String generation;

    @Column(name = "model_year", nullable = false)
    private String year;

    @Column(name = "engine", nullable = false)
    private String engine;

    public String getVin() {
        return vin;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public String getGeneration() {
        return generation;
    }

    public String getYear() {
        return year;
    }

    public String getEngine() {
        return engine;
    }
}
