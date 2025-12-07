package com.blogapp.blogapp.controllers;

import com.blogapp.blogapp.dtos.UserDto;
import com.blogapp.blogapp.entities.User;
import com.blogapp.blogapp.repositories.UserRepository;
import com.blogapp.blogapp.security.JwtUtil;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, UserRepository userRepository) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        // authenticate (will throw if invalid)
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        // generate token
        String token = jwtUtil.generateToken(req.getEmail());

        // fetch user by email (do NOT return password)
        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            // this should not happen if authentication succeeded, but be defensive
            return ResponseEntity.status(500).body(Map.of("error", "User not found"));
        }

        // build safe DTO (avoid exposing password)
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        // return both token and user
        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("user", dto);

        return ResponseEntity.ok(body);
    }
}

@Data
class LoginRequest {
    private String email;
    private String password;
}
