package com.blogapp.blogapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogapp.blogapp.entities.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
}