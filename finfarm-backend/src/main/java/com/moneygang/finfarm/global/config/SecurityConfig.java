package com.moneygang.finfarm.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf((csrf) -> csrf.disable())
                .cors((cors) -> cors.disable())
                .headers((headers) -> headers.disable())
                .authorizeHttpRequests((authorizeRequests) ->
                        authorizeRequests
                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll() // `/public/**` 경로는 인증 없이 접근 허용
                                .requestMatchers("/member", "/member/login", "/member/sign-up").permitAll()
                                .anyRequest().authenticated() // 나머지 모든 경로는 인증 필요
                )
                .build();
    }

}
