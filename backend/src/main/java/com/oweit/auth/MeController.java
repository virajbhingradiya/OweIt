package com.oweit.auth;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class MeController {

	record Me(String userId, boolean admin) {
	}

	/** Who sent this token: Clerk user id, and whether they have the admin role. */
	@GetMapping("/api/me")
	Me me(Authentication auth) {
		boolean admin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_admin"));
		return new Me(auth.getName(), admin);
	}

}
