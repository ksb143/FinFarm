package com.moneygang.finfarm;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(servers = {
		@Server(url = "/", description = "Default Server URL")
})
@SpringBootApplication
public class FinfarmApplication {

	public static void main(String[] args) {
		//SpringApplication.run(FinfarmApplication.class, args);
		SpringApplication app = new SpringApplication(FinfarmApplication.class);
		app.setAdditionalProfiles("development");
		app.run(args);
	}

}
