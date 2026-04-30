package ru.alliance.backend.api;

import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alliance.backend.api.dto.CatalogDtos;
import ru.alliance.backend.api.error.ApiNotFoundException;
import ru.alliance.backend.service.CatalogDataService;

import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping({"/api", "/api/v1"})
public class CatalogController {
    private final CatalogDataService catalogDataService;

    public CatalogController(CatalogDataService catalogDataService) {
        this.catalogDataService = catalogDataService;
    }

    @GetMapping("/search")
    public CatalogDtos.SearchResponseDto search(@RequestParam("q") @NotBlank String query) {
        return catalogDataService.search(query);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<CatalogDtos.ProductDto> productById(@PathVariable String id) {
        CatalogDtos.ProductDto dto = catalogDataService.getProductById(id);
        if (dto == null) {
            throw new ApiNotFoundException("Товар с id '" + id + "' не найден.");
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/garage")
    public List<CatalogDtos.GarageCarDto> garage() {
        return catalogDataService.getGarageCars();
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
