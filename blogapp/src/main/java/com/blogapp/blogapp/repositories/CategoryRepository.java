package com.blogapp.blogapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogapp.blogapp.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
