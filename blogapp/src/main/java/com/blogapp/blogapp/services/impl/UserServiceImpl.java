package com.blogapp.blogapp.services.impl;

import com.blogapp.blogapp.dtos.UserDto;
import com.blogapp.blogapp.entities.User;
import com.blogapp.blogapp.repositories.UserRepository;
import com.blogapp.blogapp.services.UserService;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    /*public UserDto createUser(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        User saved = repo.save(user);
        dto.setId(saved.getId());
        return dto;
    }*/

    public UserDto createUser(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        repo.save(user);
        return toDto(user);
    }

    public UserDto getUserById(Long id) {
        User user = repo.findById(id).orElse(null);
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public List<UserDto> getAllUsers() {
        return repo.findAll().stream().map(u -> {
            UserDto dto = new UserDto();
            dto.setId(u.getId());
            dto.setName(u.getName());
            dto.setEmail(u.getEmail());
            return dto;
        }).collect(Collectors.toList());
    }

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }
}

