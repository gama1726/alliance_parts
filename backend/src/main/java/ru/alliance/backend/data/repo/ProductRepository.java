package ru.alliance.backend.data.repo;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.alliance.backend.data.entity.ProductEntity;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, String> {
    @Override
    @EntityGraph(attributePaths = {"badges", "recommended", "offers", "analogs", "analogs.offers"})
    Optional<ProductEntity> findById(String id);

    Optional<ProductEntity> findByArticleNormalized(String articleNormalized);
}
