package ru.alliance.backend.api.dto;

import java.time.OffsetDateTime;

public record ApiErrorDto(
        String code,
        String message,
        String details,
        String path,
        OffsetDateTime timestamp
) {
}
