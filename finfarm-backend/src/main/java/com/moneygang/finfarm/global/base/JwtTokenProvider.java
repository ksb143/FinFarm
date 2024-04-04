package com.moneygang.finfarm.global.base;

import com.moneygang.finfarm.global.exception.GlobalException;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final UserDetailsService userDetailsService;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.token.secret}")
    private String secretKey;
    private long accessExpirationTime = 1000L * 60 * 60;
    private long refreshExpirationTime = 1000L * 60 * 60 * 24;

    public String createAccessToken(String userId) {
        Claims claims = Jwts.claims();
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + accessExpirationTime);
        claims.put("userId", String.valueOf(userId));
        claims.put("role", List.of("USER"));

        Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(key)
                .compact();
    }
    public String createRefreshToken(String userId){
        Claims claims = Jwts.claims().setSubject(userId);
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpirationTime);
        Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());

        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(key)
                .compact();

        // redis에 저장
        redisTemplate.opsForValue().set(
                "token_"+userId,
                refreshToken,
                refreshExpirationTime,
                TimeUnit.MILLISECONDS
        );

        return refreshToken;
    }
    public Authentication getAuthentication(String token) {
        Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());
        String username = (String) Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("userId");
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    public boolean validateToken(String token){
        try{
            Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch(ExpiredJwtException e) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다.");
        } catch(JwtException e) {
            throw new GlobalException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다.");
        }
    }

    public String getUserEmailFromToken(String token) {
        Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.get("userId", String.class); // "userId"는 토큰 생성 시 사용한 키입니다.
    }

}
