package com.blogapp.blogapp.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.blogapp.blogapp.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
