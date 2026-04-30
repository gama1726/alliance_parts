package ru.alliance.backend.service;

import org.springframework.stereotype.Service;
import ru.alliance.backend.api.dto.CatalogDtos;

import java.util.List;
import java.util.Map;

@Service
public class CatalogMockService {
    private static final String DEMO_VIN = "VF3MJAHXVGS314095";

    private final Map<String, CatalogDtos.ProductDto> productsById = Map.of(
            "oe31601",
            new CatalogDtos.ProductDto(
                    "oe31601",
                    "OE31601",
                    "AZUMI",
                    "Фильтр масляный",
                    "Сервисный интервал — по регламенту производителя",
                    4.7,
                    128,
                    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=720&q=80",
                    List.of("В наличии на складе", "Подбор по VIN"),
                    List.of(
                            new CatalogDtos.RecommendedDto("r1", "Наш склад · под заказ 1 день", 612, "₽", "Завтра", true),
                            new CatalogDtos.RecommendedDto("r2", "Партнёр · Москва", 589, "₽", "2–3 дня", false),
                            new CatalogDtos.RecommendedDto("r3", "Партнёр · регион", 540, "₽", "4–6 дней", false)
                    ),
                    List.of(
                            new CatalogDtos.OfferDto("o1", "Alliance Север", 612, "12 шт.", "СПб"),
                            new CatalogDtos.OfferDto("o2", "Alliance Юг", 598, "8 шт.", "Краснодар"),
                            new CatalogDtos.OfferDto("o3", "Партнёр A", 575, "Под заказ", "Москва")
                    ),
                    List.of(
                            new CatalogDtos.AnalogDto("a1", "PARTRA", "FO7028", "Фильтр масляный",
                                    List.of(new CatalogDtos.AnalogOfferDto("Склад East", 499))),
                            new CatalogDtos.AnalogDto("a2", "LECAR", "LECAR000162501", "Фильтр масляный",
                                    List.of(new CatalogDtos.AnalogOfferDto("Склад West", 512)))
                    )
            ),
            "4144109100",
            new CatalogDtos.ProductDto(
                    "4144109100",
                    "4144109100",
                    "SSANGYONG",
                    "Ступица передняя в сборе (пример из каталога)",
                    "Оригинальная позиция по схеме FRT HUB & DISC",
                    4.9,
                    42,
                    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
                    List.of("Оригинал", "Проверка по VIN"),
                    List.of(
                            new CatalogDtos.RecommendedDto("y1", "Alliance · оригинал", 18490, "₽", "3 дня", true),
                            new CatalogDtos.RecommendedDto("y2", "Аналог премиум", 13250, "₽", "1 день", false)
                    ),
                    List.of(
                            new CatalogDtos.OfferDto("yo1", "Центральный склад", 18490, "2 шт.", "Москва")
                    ),
                    List.of(
                            new CatalogDtos.AnalogDto("ya1", "PARTS MALL", "PXHB-001", "Ступица в сборе",
                                    List.of(new CatalogDtos.AnalogOfferDto("Партнёр", 11990)))
                    )
            )
    );

    private final List<CatalogDtos.GarageCarDto> garageCars = List.of(
            new CatalogDtos.GarageCarDto("g1", "SSANGYONG Kyron", "2.0 Xdi 4x4 · D20DT · 2007", "—", "Узлы: CHASSIS → FRT HUB & DISC"),
            new CatalogDtos.GarageCarDto("g2", "PEUGEOT 3008", "P84E · 1.6 THP · 2016", DEMO_VIN, "Оригинальный каталог: тормозной диск задний")
    );

    private final List<CatalogDtos.CatalogGroupDto> catalogGroups = List.of(
            new CatalogDtos.CatalogGroupDto("maint", "ТО и расходники", "24 675"),
            new CatalogDtos.CatalogGroupDto("brake", "Тормозная система", "18 392"),
            new CatalogDtos.CatalogGroupDto("susp", "Подвеска", "16 834"),
            new CatalogDtos.CatalogGroupDto("body", "Кузов и оптика", "22 106")
    );

    public CatalogDtos.SearchResponseDto search(String query) {
        String cleanQuery = query == null ? "" : query.trim();
        if ("simulate-error".equalsIgnoreCase(cleanQuery)) {
            throw new IllegalStateException("Демо-ошибка API поиска");
        }

        String type = detectQueryType(cleanQuery);
        String resolvedProductId = resolveProductId(cleanQuery);
        CatalogDtos.ProductDto product = resolvedProductId == null ? null : productsById.get(resolvedProductId);
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
                new CatalogDtos.SidebarDto(garageCars, catalogGroups)
        );
    }

    public CatalogDtos.ProductDto getProductById(String id) {
        return productsById.get(id);
    }

    public List<CatalogDtos.GarageCarDto> getGarageCars() {
        return garageCars;
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
        if ("OE31601".equalsIgnoreCase(n)) return "oe31601";
        if ("4144109100".equals(n)) return "4144109100";
        return null;
    }

    private CatalogDtos.VehicleDto resolveVehicle(String query) {
        String vin = parseVin(query);
        if (vin == null) return null;
        if (!DEMO_VIN.equals(vin)) return null;
        return new CatalogDtos.VehicleDto("PEUGEOT", "3008", "II (P84E)", "2016", "1.6 THP");
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
}
