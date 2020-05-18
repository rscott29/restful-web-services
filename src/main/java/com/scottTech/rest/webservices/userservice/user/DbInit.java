package com.scottTech.rest.webservices.userservice.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class DbInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DbInit(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(String... args) {
        // Delete all
        this.userRepository.deleteAll();

        // Crete users
        User rich = new User( 10001, "Rich",  passwordEncoder.encode("rich123"), new Date(),"USER","ACCESS_TEST1");
        User admin = new User(10002, "admin", passwordEncoder.encode("admin123"), new Date(),"ADMIN","ACCESS_TEST1,ACCESS_TEST2");
        User manager = new User(10003, "manager",passwordEncoder.encode("manager123"), new Date(), "MANAGER","ACCESS_TEST1");

        List<User> users = Arrays.asList(rich,admin,manager);

        // Save to db
        this.userRepository.saveAll(users);
    }
}
