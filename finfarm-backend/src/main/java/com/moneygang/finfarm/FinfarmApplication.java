package com.moneygang.finfarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FinfarmApplication {

	public static void main(String[] args) {
		//SpringApplication.run(FinfarmApplication.class, args);
		SpringApplication app = new SpringApplication(FinfarmApplication.class);
		app.setAdditionalProfiles("development");
		app.run(args);
	}

}
