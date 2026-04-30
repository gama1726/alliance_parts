package ru.alliance.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alliance.backend.api.dto.CatalogDtos;
import ru.alliance.backend.data.entity.AnalogEntity;
import ru.alliance.backend.data.entity.ProductEntity;
import ru.alliance.backend.data.repo.CatalogGroupRepository;
import ru.alliance.backend.data.repo.GarageCarRepository;
import ru.alliance.backend.data.repo.ProductRepository;
import ru.alliance.backend.data.repo.VehicleLookupRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogMockService {
    private final ProductRepository productRepository;
    private final GarageCarRepository garageCarRepository;
    private final CatalogGroupRepository catalogGroupRepository;
    private final VehicleLookupRepository vehicleLookupRepository;

    public CatalogMockService(
            ProductRepository productRepository,
            GarageCarRepository garageCarRepository,
            CatalogGroupRepository catalogGroupRepository,
            VehicleLookupRepository vehicleLookupRepository
    ) {
        this.productRepository = productRepository;
        this.garageCarRepository = garageCarRepository;
        this.catalogGroupRepository = catalogGroupRepository;
        this.vehicleLookupRepository = vehicleLookupRepository;
    }

    @Transactional(readOnly = true)
    public CatalogDtos.SearchResponseDto search(String query) {
        String cleanQuery = query == null ? "" : query.trim();
        if ("simulate-error".equalsIgnoreCase(cleanQuery)) {
            throw new IllegalStateException("Демо-ошибка API поиска");
        }

        String type = detectQueryType(cleanQuery);
        String resolvedProductId = resolveProductId(cleanQuery);
        CatalogDtos.ProductDto product = resolvedProductId == null ? null : getProductById(resolvedProductId);
        CatalogDtos.VehicleDto vehicle = resolveVehicle(cleanQuery);
        CatalogDtos.HintDto hint = buildHint(cleanQuery, vehicle, product, type);
        String status = switch (hint.kind()) {
            case "ok" -> "ok";
            case "error" -> "error";
            default -> "empty";
        };

        return new CatalogDtos.SearchResponseDto(
                cleanQuery,
                type,
                status,
                vehicle,
                product,
                hint,
                new CatalogDtos.SidebarDto(getGarageCars(), getCatalogGroups())
        );
    }

    @Transactional(readOnly = true)
    public CatalogDtos.ProductDto getProductById(String id) {
        return productRepository.findById(id)
                .map(this::toProductDto)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public List<CatalogDtos.GarageCarDto> getGarageCars() {
        return garageCarRepository.findAllByOrderByIdAsc().stream()
                .map(item -> new CatalogDtos.GarageCarDto(
                        item.getId(),
                        item.getLabel(),
                        item.getSubtitle(),
                        item.getVin(),
                        item.getCatalogHint()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CatalogDtos.CatalogGroupDto> getCatalogGroups() {
        return catalogGroupRepository.findAllByOrderByIdAsc().stream()
                .map(item -> new CatalogDtos.CatalogGroupDto(
                        item.getId(),
                        item.getTitle(),
                        item.getCount()
                ))
                .toList();
    }

    private String detectQueryType(String raw) {
        if (raw == null || raw.isBlank()) return "empty";
        String compact = compact(raw);
        if (compact.length() == 17) return "vin";
        if (raw.matches(".*[A-Za-zА-Яа-я].*") && raw.matches(".*\\d.*")) return "article";
        if (raw.length() < 3) return "too_short";
        return "text";
    }

    private String resolveProductId(String query) {
        String n = compact(query);
        if (n.isBlank()) return null;
        Optional<String> exactId = productRepository.findById(n).map(ProductEntity::getId);
        if (exactId.isPresent()) return exactId.get();
        return productRepository.findByArticleNormalized(n)
                .map(ProductEntity::getId)
                .orElse(null);
    }

    private CatalogDtos.VehicleDto resolveVehicle(String query) {
        String vin = parseVin(query);
        if (vin == null) return null;
        return vehicleLookupRepository.findById(vin)
                .map(vehicle -> new CatalogDtos.VehicleDto(
                        vehicle.getBrand(),
                        vehicle.getModel(),
                        vehicle.getGeneration(),
                        vehicle.getYear(),
                        vehicle.getEngine()
                ))
                .orElse(null);
    }

    private CatalogDtos.HintDto buildHint(
            String query,
            CatalogDtos.VehicleDto vehicle,
            CatalogDtos.ProductDto product,
            String type
    ) {
        if (query == null || query.isBlank()) {
            return new CatalogDtos.HintDto("error", "Пустой запрос", "Введите артикул, VIN или текст запроса перед поиском.");
        }
        if (vehicle != null || product != null) {
            return new CatalogDtos.HintDto("ok", "Результаты найдены", "Откройте карточку или продолжите уточнение в фильтрах.");
        }
        if ("vin".equals(type)) {
            if (parseVin(query) == null) {
                return new CatalogDtos.HintDto("error", "VIN похож на некорректный", "VIN должен содержать 17 символов и не включать I, O, Q.");
            }
            return new CatalogDtos.HintDto("empty", "VIN не найден в демо-базе", "Для проверки используйте VF3MJAHXVGS314095.");
        }
        if ("too_short".equals(type)) {
            return new CatalogDtos.HintDto("error", "Слишком короткий запрос", "Введите минимум 3 символа или полный артикул.");
        }
        if ("article".equals(type)) {
            return new CatalogDtos.HintDto("empty", "Артикул не найден", "Попробуйте OE31601 или 4144109100.");
        }
        return new CatalogDtos.HintDto("empty", "Совпадений нет", "По запросу ничего не найдено в локальных данных.");
    }

    private String compact(String value) {
        if (value == null) return "";
        return value.replaceAll("[\\s\\u00A0\\-–—._/\\\\|]+", "").toUpperCase();
    }

    private String parseVin(String query) {
        String t = compact(query);
        if (t.length() != 17) return null;
        if (!t.matches("^[A-Z0-9]{17}$")) return null;
        if (t.matches(".*[IOQ].*")) return null;
        return t;
    }

    private CatalogDtos.ProductDto toProductDto(ProductEntity entity) {
        return new CatalogDtos.ProductDto(
                entity.getId(),
                entity.getArticle(),
                entity.getBrand(),
                entity.getName(),
                entity.getLine(),
                entity.getRating(),
                entity.getReviewsCount(),
                entity.getImage(),
                entity.getBadges().stream().map(b -> b.getBadge()).toList(),
                entity.getRecommended().stream()
                        .map(item -> new CatalogDtos.RecommendedDto(
                                item.getId(),
                                item.getTitle(),
                                item.getPrice(),
                                item.getCurrency(),
                                item.getDelivery(),
                                item.isHighlight()
                        ))
                        .toList(),
                entity.getOffers().stream()
                        .map(item -> new CatalogDtos.OfferDto(
                                item.getId(),
                                item.getSupplier(),
                                item.getPrice(),
                                item.getStock(),
                                item.getCity()
                        ))
                        .toList(),
                entity.getAnalogs().stream().map(this::toAnalogDto).toList()
        );
    }

    private CatalogDtos.AnalogDto toAnalogDto(AnalogEntity analog) {
        return new CatalogDtos.AnalogDto(
                analog.getId(),
                analog.getBrand(),
                analog.getArticle(),
                analog.getName(),
                analog.getOffers().stream()
                        .map(offer -> new CatalogDtos.AnalogOfferDto(offer.getSupplier(), offer.getPrice()))
                        .toList()
        );
    }
}
