package com.moneygang.finfarm.global.base;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface TokenProvider {
    String createAccessToken(String userId);
    String createRefreshToken(String userId);
    Authentication getAuthentication(String token);
    String resolveToken(HttpServletRequest req);
    boolean validateToken(String token);
}