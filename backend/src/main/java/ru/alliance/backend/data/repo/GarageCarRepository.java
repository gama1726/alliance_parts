package ru.alliance.backend.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alliance.backend.data.entity.GarageCarEntity;

import java.util.List;

public interface GarageCarRepository extends JpaRepository<GarageCarEntity, String> {
    List<GarageCarEntity> findAllByOrderByIdAsc();
}
