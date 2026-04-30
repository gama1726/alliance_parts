package ru.alliance.backend.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alliance.backend.data.entity.VehicleLookupEntity;

public interface VehicleLookupRepository extends JpaRepository<VehicleLookupEntity, String> {
}
