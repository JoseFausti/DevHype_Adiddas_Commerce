package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .cors()
            .and()
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorizeRequest ->
                authorizeRequest
                    .requestMatchers("/auth/**").permitAll()

                    // PUT permitidos para autenticados
                    .requestMatchers(HttpMethod.PUT, "/users/{id}").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/productVariants/{id}").authenticated()

                    // POST permitidos para autenticados
                    .requestMatchers(HttpMethod.POST, "/directions").authenticated()
                    .requestMatchers(HttpMethod.POST, "/purchase_orders").authenticated()
                    .requestMatchers(HttpMethod.POST, "/pay/mp").authenticated()

                    // POST, PUT, DELETE para todos los endpoints solo ADMIN
                    .requestMatchers(HttpMethod.POST, "/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/**").hasRole("ADMIN")

                    // GET permitidos para todos
                    .requestMatchers(HttpMethod.GET, "/products").permitAll()
                    .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                    
                    .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider)
            .sessionManagement(sessionManagement -> 
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            // .formLogin(Customizer.withDefaults())
            .build();
    }
}
