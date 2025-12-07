package com.blogapp.blogapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

@Bean
public OpenAPI baseOpenAPI() {
    return new OpenAPI()
            .info(new Info()
                    .title("Blog App API Documentation")
                    .version("1.0.0")
                    .description("REST API Documentation for Kesava's Blog Application"))
            .addSecurityItem(new io.swagger.v3.oas.models.security.SecurityRequirement().addList("Bearer Authentication"))
            .components(new io.swagger.v3.oas.models.Components()
                    .addSecuritySchemes("Bearer Authentication",
                            new io.swagger.v3.oas.models.security.SecurityScheme()
                                    .name("Bearer Authentication")
                                    .type(io.swagger.v3.oas.models.security.SecurityScheme.Type.HTTP)
                                    .scheme("bearer")
                                    .bearerFormat("JWT")
                    ));
}
}