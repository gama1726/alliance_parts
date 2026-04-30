package ru.alliance.backend.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alliance.backend.data.entity.CatalogGroupEntity;

import java.util.List;

public interface CatalogGroupRepository extends JpaRepository<CatalogGroupEntity, String> {
    List<CatalogGroupEntity> findAllByOrderByIdAsc();
}
