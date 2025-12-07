package com.blogapp.blogapp.controllers;

import com.blogapp.blogapp.dtos.PostDto;
import com.blogapp.blogapp.services.PostService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    @PostMapping
    public PostDto create(@RequestBody PostDto dto) {
        return service.createPost(dto);
    }

    @PutMapping("/{id}")
    public PostDto update(@PathVariable Long id, @RequestBody PostDto dto) {
        return service.updatePost(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletePost(id);
    }

    @GetMapping
    public List<PostDto> getAll() {
        return service.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostDto get(@PathVariable Long id) {
        return service.getPostById(id);
    }

    @GetMapping("/search")
    public List<PostDto> search(@RequestParam String keyword) {
        return service.searchPosts(keyword);
    }

    @GetMapping("/category/{categoryId}")
    public List<PostDto> getByCategory(@PathVariable Long categoryId) {
        return service.getPostsByCategory(categoryId);
    }

    @GetMapping("/user/{userId}")
    public List<PostDto> getByUser(@PathVariable Long userId) {
        return service.getPostsByUser(userId);
    }

    
}

