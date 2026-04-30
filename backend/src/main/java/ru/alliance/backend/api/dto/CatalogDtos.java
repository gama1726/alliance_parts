package ru.alliance.backend.api.dto;

import java.util.List;

public final class CatalogDtos {
    private CatalogDtos() {
    }

    public record SearchResponseDto(
            String query,
            String type,
            String status,
            VehicleDto vehicle,
            ProductDto product,
            HintDto hint,
            SidebarDto sidebar
    ) {
    }

    public record ProductDto(
            String id,
            String article,
            String brand,
            String name,
            String line,
            double rating,
            int reviewsCount,
            String image,
            List<String> badges,
            List<RecommendedDto> recommended,
            List<OfferDto> offers,
            List<AnalogDto> analogs
    ) {
    }

    public record RecommendedDto(
            String id,
            String title,
            int price,
            String currency,
            String delivery,
            boolean highlight
    ) {
    }

    public record OfferDto(
            String id,
            String supplier,
            int price,
            String stock,
            String city
    ) {
    }

    public record AnalogDto(
            String id,
            String brand,
            String article,
            String name,
            List<AnalogOfferDto> offers
    ) {
    }

    public record AnalogOfferDto(
            String supplier,
            int price
    ) {
    }

    public record VehicleDto(
            String brand,
            String model,
            String generation,
            String year,
            String engine
    ) {
    }

    public record HintDto(
            String kind,
            String title,
            String text
    ) {
    }

    public record SidebarDto(
            List<GarageCarDto> garageCars,
            List<CatalogGroupDto> catalogGroups
    ) {
    }

    public record GarageCarDto(
            String id,
            String label,
            String subtitle,
            String vin,
            String catalogHint
    ) {
    }

    public record CatalogGroupDto(
            String id,
            String title,
            String count
    ) {
    }
}
