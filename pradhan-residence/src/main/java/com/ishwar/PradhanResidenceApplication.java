package com.ishwar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = "com.ishwar.model")
@ComponentScan(basePackages = { "com.ishwar.controller", "com.ishwar" }) // Add the necessary package(s)
public class PradhanResidenceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PradhanResidenceApplication.class, args);
	}

}
