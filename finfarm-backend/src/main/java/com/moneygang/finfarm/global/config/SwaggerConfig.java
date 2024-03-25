package com.moneygang.finfarm.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;


@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi bankingApi() {
        return GroupedOpenApi.builder()
                .group("banking-api")
                .pathsToMatch("/banking/**")
                .build();
    }
    @Bean
    public GroupedOpenApi farmApi() {
        return GroupedOpenApi.builder()
                .group("farm-api")
                .pathsToMatch("/farm/**")
                .build();
    }
    @Bean
    public GroupedOpenApi marketApi() {
        return GroupedOpenApi.builder()
                .group("market-api")
                .pathsToMatch("/market/**")
                .build();
    }

    @Bean
    public GroupedOpenApi memberApi() {
        return GroupedOpenApi.builder()
                .group("member-api")
                .pathsToMatch("/member/**")
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER).name("Authorization");
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

        Components components = new Components().addSecuritySchemes("bearerAuth", securityScheme);

        return new OpenAPI()
                .components(components)
                .info(new Info().title("Finfarm API")
                        .description("Finfarm API를 통해 금융과 농업의 만남을 경험하세요.")
                        .version("v1"))
                .security(Arrays.asList(securityRequirement))
                // API 서버의 기본 URL을 추가합니다.
                .addServersItem(new Server().url("https://j10d203.p.ssafy.io/api").description("Default Server URL"))
                // 로컬 서버 주소를 추가합니다.
                .addServersItem(new Server().url("http://localhost:8080/api").description("Local Development Server"));
    }
}
