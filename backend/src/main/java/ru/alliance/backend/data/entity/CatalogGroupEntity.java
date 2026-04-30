package ru.alliance.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "catalog_group")
public class CatalogGroupEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "count_text", nullable = false)
    private String count;

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCount() {
        return count;
    }
}
