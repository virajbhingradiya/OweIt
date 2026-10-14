package com.oweit;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(properties = "CLERK_ISSUER=https://clerk.test.invalid")
class OweitApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
