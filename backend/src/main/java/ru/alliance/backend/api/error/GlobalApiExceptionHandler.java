package ru.alliance.backend.api.error;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.alliance.backend.api.dto.ApiErrorDto;

import java.time.OffsetDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalApiExceptionHandler {

    @ExceptionHandler(ApiNotFoundException.class)
    public ResponseEntity<ApiErrorDto> handleNotFound(ApiNotFoundException ex, HttpServletRequest request) {
        return build(HttpStatus.NOT_FOUND, "NOT_FOUND", ex.getMessage(), null, request.getRequestURI());
    }

    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<ApiErrorDto> handleValidation(Exception ex, HttpServletRequest request) {
        String details;
        if (ex instanceof ConstraintViolationException cve) {
            details = cve.getConstraintViolations().stream()
                    .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                    .collect(Collectors.joining("; "));
        } else {
            details = ex.getMessage();
        }
        return build(
                HttpStatus.BAD_REQUEST,
                "VALIDATION_ERROR",
                "Параметры запроса заполнены некорректно.",
                details,
                request.getRequestURI()
        );
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiErrorDto> handleServiceUnavailable(IllegalStateException ex, HttpServletRequest request) {
        return build(
                HttpStatus.SERVICE_UNAVAILABLE,
                "SERVICE_UNAVAILABLE",
                "Сервис временно недоступен.",
                ex.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorDto> handleUnexpected(Exception ex, HttpServletRequest request) {
        return build(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "INTERNAL_ERROR",
                "Произошла внутренняя ошибка сервиса.",
                ex.getMessage(),
                request.getRequestURI()
        );
    }

    private ResponseEntity<ApiErrorDto> build(
            HttpStatus status,
            String code,
            String message,
            String details,
            String path
    ) {
        return ResponseEntity.status(status).body(
                new ApiErrorDto(code, message, details, path, OffsetDateTime.now())
        );
    }
}
