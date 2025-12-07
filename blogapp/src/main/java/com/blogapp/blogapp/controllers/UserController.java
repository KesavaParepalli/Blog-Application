package com.blogapp.blogapp.controllers;

import com.blogapp.blogapp.dtos.UserDto;
import com.blogapp.blogapp.services.UserService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public UserDto create(@RequestBody UserDto dto) {
        return service.createUser(dto);
    }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @GetMapping
    public List<UserDto> getAll() {
        return service.getAllUsers();
    }
}

