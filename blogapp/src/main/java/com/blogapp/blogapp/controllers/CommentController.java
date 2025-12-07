package com.blogapp.blogapp.controllers;


import com.blogapp.blogapp.dtos.CommentDto;
import com.blogapp.blogapp.services.CommentService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService service;

    public CommentController(CommentService service) {
        this.service = service;
    }

    @PostMapping
    public CommentDto create(@RequestBody CommentDto dto) {
        return service.createComment(dto);
    }

    @GetMapping("/post/{postId}")
    public List<CommentDto> getByPost(@PathVariable Long postId) {
        return service.getCommentsByPost(postId);
    }
}

