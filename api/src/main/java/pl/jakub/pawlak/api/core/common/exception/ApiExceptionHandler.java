package pl.jakub.pawlak.api.core.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pl.jakub.pawlak.starter.infrastructure.AttributeNames;
import pl.jakub.pawlak.starter.infrastructure.exception.ExceptionResponseBody;

import java.time.LocalDateTime;

@Slf4j
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<ExceptionResponseBody> handleClientsException(
            Exception ex, WebRequest request) {

        final HttpServletRequest servletWebRequest = ((ServletWebRequest) request).getRequest();
        final ExceptionResponseBody responseBody = buildExceptionResponseBody(ex, servletWebRequest, HttpStatus.UNPROCESSABLE_ENTITY);
        log.error("ERROR {}", responseBody.toString());
        return ResponseEntity.unprocessableEntity().body(responseBody);
    }

    private ExceptionResponseBody buildExceptionResponseBody(Exception ex, HttpServletRequest servletWebRequest, HttpStatus httpStatus) {
        return ExceptionResponseBody.builder()
                .path(servletWebRequest.getRequestURI())
                .traceId(servletWebRequest.getAttribute(AttributeNames.TRACE_ID).toString())
                .message(ex.getMessage())
                .dateTime(LocalDateTime.now())
                .status(httpStatus)
                .build();
    }
}
