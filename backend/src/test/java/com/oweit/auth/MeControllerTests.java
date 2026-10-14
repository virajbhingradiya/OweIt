package com.oweit.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.test.web.servlet.MockMvc;

import com.oweit.TestcontainersConfiguration;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(properties = "CLERK_ISSUER=https://clerk.test.invalid")
@AutoConfigureMockMvc
class MeControllerTests {

	@Autowired
	MockMvc mvc;

	@Autowired
	OAuth2TokenValidator<Jwt> authorizedPartyValidator;

	@Autowired
	JwtAuthenticationConverter jwtConverter;

	@Test
	void rejectsRequestWithoutToken() throws Exception {
		mvc.perform(get("/api/me")).andExpect(status().isUnauthorized());
	}

	@Test
	void returnsClerkUserId() throws Exception {
		mvc.perform(get("/api/me").with(jwt().jwt(j -> j.subject("user_123"))))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.userId").value("user_123"))
			.andExpect(jsonPath("$.admin").value(false));
	}

	@Test
	void mapsClerkRoleClaimToSpringRole() {
		var auth = jwtConverter.convert(Jwt.withTokenValue("t").header("alg", "RS256").subject("user_1")
			.claim("role", "admin").build());
		assertThat(auth.getAuthorities()).extracting("authority").contains("ROLE_admin");
	}

	@Test
	void adminEndpointsRequireAdminRole() throws Exception {
		mvc.perform(get("/api/admin/anything").with(jwt()))
			.andExpect(status().isForbidden());
		// 404, not 403: security let the admin through; there's just no endpoint there yet.
		mvc.perform(get("/api/admin/anything").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_admin"))))
			.andExpect(status().isNotFound());
	}

	@Test
	void meReportsAdmin() throws Exception {
		mvc.perform(get("/api/me").with(jwt().authorities(new SimpleGrantedAuthority("ROLE_admin"))))
			.andExpect(jsonPath("$.admin").value(true));
	}

	@Test
	void healthIsPublic() throws Exception {
		mvc.perform(get("/actuator/health")).andExpect(status().isOk());
	}

	@Test
	void rejectsTokenMintedForAnotherOrigin() {
		assertThat(authorizedPartyValidator.validate(token("http://localhost:5173")).hasErrors()).isFalse();
		assertThat(authorizedPartyValidator.validate(token("https://evil.example")).hasErrors()).isTrue();
	}

	private static Jwt token(String azp) {
		return Jwt.withTokenValue("t").header("alg", "RS256").claim("azp", azp)
			.issuedAt(Instant.now()).expiresAt(Instant.now().plusSeconds(60)).build();
	}

}
