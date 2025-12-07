package com.blogapp.blogapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogapp.blogapp.entities.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContainingIgnoreCase(String keyword);
    List<Post> findByCategoryId(Long categoryId);
    List<Post> findByUserId(Long userId);
}
