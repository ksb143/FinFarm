package com.moneygang.finfarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
@EnableScheduling
public class FinfarmApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(FinfarmApplication.class);
		app.setAdditionalProfiles("development");
		app.run(args);
	}

}
