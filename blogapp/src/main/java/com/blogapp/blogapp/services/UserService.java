package com.blogapp.blogapp.services;


import java.util.List;

import com.blogapp.blogapp.dtos.UserDto;

public interface UserService {
    UserDto createUser(UserDto dto);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
}

