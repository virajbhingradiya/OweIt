package com.oweit;

import org.springframework.boot.SpringApplication;

public class TestOweitApiApplication {

	public static void main(String[] args) {
		SpringApplication.from(OweitApiApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
