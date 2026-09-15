package com.manikdev.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allow localhost and 127.0.0.1 on any frontend port
        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:*",
                "http://127.0.0.1:*"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setExposedHeaders(List.of(
                "Authorization"
        ));

        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // Login
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // Public GET
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/profile",
                                "/api/dashboard/**",
                                "/api/skills",
                                "/api/projects",
                                "/api/experience",
                                "/api/education",
                                "/api/certificates",
                                "/api/achievements",
                                "/api/learning",
                                "/api/contact",
                                "/api/recommendations"
                        ).permitAll()

                        // Public POST
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/profile/view",
                                "/api/contact",
                                "/api/recommendations"
                        ).permitAll()

                        // Admin POST
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/profile",
                                "/api/skills",
                                "/api/projects",
                                "/api/experience",
                                "/api/education",
                                "/api/certificates",
                                "/api/achievements",
                                "/api/learning"
                        ).hasRole("ADMIN")

                        // Admin PUT
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/profile/**",
                                "/api/skills/**",
                                "/api/projects/**",
                                "/api/experience/**",
                                "/api/education/**",
                                "/api/certificates/**",
                                "/api/achievements/**",
                                "/api/learning/**"
                        ).hasRole("ADMIN")

                        // Admin DELETE
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/profile/**",
                                "/api/skills/**",
                                "/api/projects/**",
                                "/api/experience/**",
                                "/api/education/**",
                                "/api/certificates/**",
                                "/api/achievements/**",
                                "/api/learning/**",
                                "/api/contact/**",
                                "/api/recommendations/**"
                        ).hasRole("ADMIN")

                        .requestMatchers("/error").permitAll()

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}