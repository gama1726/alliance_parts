package ru.alliance.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:catalog_api_test;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE",
        "spring.sql.init.mode=always",
        "spring.jpa.hibernate.ddl-auto=none"
})
class CatalogApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void searchByArticleReturnsProductAndOkStatus() throws Exception {
        mockMvc.perform(get("/api/search").param("q", "OE31601"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.query", is("OE31601")))
                .andExpect(jsonPath("$.status", is("ok")))
                .andExpect(jsonPath("$.type", is("article")))
                .andExpect(jsonPath("$.product.id", is("oe31601")))
                .andExpect(jsonPath("$.product.article", is("OE31601")))
                .andExpect(jsonPath("$.product.recommended", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    void searchByVinReturnsResolvedVehicle() throws Exception {
        mockMvc.perform(get("/api/search").param("q", "VF3MJAHXVGS314095"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("ok")))
                .andExpect(jsonPath("$.type", is("vin")))
                .andExpect(jsonPath("$.vehicle.brand", is("PEUGEOT")))
                .andExpect(jsonPath("$.vehicle.model", is("3008")));
    }

    @Test
    void productByIdReturnsNotFoundErrorPayload() throws Exception {
        mockMvc.perform(get("/api/products/missing-product"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code", is("NOT_FOUND")))
                .andExpect(jsonPath("$.message", notNullValue()))
                .andExpect(jsonPath("$.path", is("/api/products/missing-product")))
                .andExpect(jsonPath("$.timestamp", notNullValue()));
    }

    @Test
    void garageReturnsSeededCars() throws Exception {
        mockMvc.perform(get("/api/garage"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].id", notNullValue()))
                .andExpect(jsonPath("$[0].label", notNullValue()));
    }
}
