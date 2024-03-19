package com.moneygang.finfarm.global.exception;

import com.google.gson.Gson;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
    private final Gson gson;
    private static final HttpHeaders jsonHeaders;
    static {
        jsonHeaders = new HttpHeaders();
        jsonHeaders.add(HttpHeaders.CONTENT_TYPE, "application/json");
    }

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<String> handlerNotFoundException(GlobalException globalException) {
        return ResponseEntity.status(globalException.getStatus())
                .headers(jsonHeaders)
                .body(stringToGson(globalException.getMessage()));
    }

    public String stringToGson(String message){
        return gson.toJson(Collections.singletonMap("message", message));
    }

}
