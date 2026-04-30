package ru.alliance.backend.data.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
public class ProductEntity {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "article", nullable = false)
    private String article;

    @Column(name = "article_normalized", nullable = false)
    private String articleNormalized;

    @Column(name = "brand", nullable = false)
    private String brand;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "line_text", nullable = false)
    private String line;

    @Column(name = "rating", nullable = false)
    private double rating;

    @Column(name = "reviews_count", nullable = false)
    private int reviewsCount;

    @Column(name = "image", nullable = false)
    private String image;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("id asc")
    private List<ProductBadgeEntity> badges = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("id asc")
    private List<RecommendedEntity> recommended = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("id asc")
    private List<OfferEntity> offers = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("id asc")
    private List<AnalogEntity> analogs = new ArrayList<>();

    public String getId() {
        return id;
    }

    public String getArticle() {
        return article;
    }

    public String getArticleNormalized() {
        return articleNormalized;
    }

    public String getBrand() {
        return brand;
    }

    public String getName() {
        return name;
    }

    public String getLine() {
        return line;
    }

    public double getRating() {
        return rating;
    }

    public int getReviewsCount() {
        return reviewsCount;
    }

    public String getImage() {
        return image;
    }

    public List<ProductBadgeEntity> getBadges() {
        return badges;
    }

    public List<RecommendedEntity> getRecommended() {
        return recommended;
    }

    public List<OfferEntity> getOffers() {
        return offers;
    }

    public List<AnalogEntity> getAnalogs() {
        return analogs;
    }
}
