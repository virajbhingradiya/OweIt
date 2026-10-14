package com.oweit.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimValidator;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Clerk handles sign-up/sign-in. The browser sends Clerk's session token as
 * "Authorization: Bearer ...", and we verify it here (signature, issuer, expiry via
 * spring.security.oauth2.resourceserver.jwt.issuer-uri, plus the azp check below).
 */
@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/actuator/health/**", "/actuator/info", "/error").permitAll()
				// Convention: every admin-only endpoint lives under /api/admin.
				.requestMatchers("/api/admin/**").hasRole("admin")
				.anyRequest().authenticated())
			.oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
			// No server session: every request carries its own token.
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			// CSRF attacks ride on cookies the browser sends automatically. A bearer header is never
			// sent automatically, so CSRF protection isn't needed for this API.
			.csrf(csrf -> csrf.disable())
			.build();
	}

	/** Clerk's "azp" claim is the origin that requested the token; reject tokens minted for other sites. */
	@Bean
	OAuth2TokenValidator<Jwt> authorizedPartyValidator(
			@Value("${clerk.authorized-parties}") List<String> authorizedParties) {
		return new JwtClaimValidator<String>("azp", azp -> azp == null || authorizedParties.contains(azp));
	}

}
