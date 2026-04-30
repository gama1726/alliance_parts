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
import ru.alliance.backend.service.CatalogMockService;

import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/api")
public class CatalogController {
    private final CatalogMockService catalogMockService;

    public CatalogController(CatalogMockService catalogMockService) {
        this.catalogMockService = catalogMockService;
    }

    @GetMapping("/search")
    public CatalogDtos.SearchResponseDto search(@RequestParam("q") @NotBlank String query) {
        return catalogMockService.search(query);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<CatalogDtos.ProductDto> productById(@PathVariable String id) {
        CatalogDtos.ProductDto dto = catalogMockService.getProductById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/garage")
    public List<CatalogDtos.GarageCarDto> garage() {
        return catalogMockService.getGarageCars();
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
