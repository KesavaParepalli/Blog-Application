package com.blogapp.blogapp.services;
import java.util.List;

import com.blogapp.blogapp.dtos.PostDto;

public interface PostService {
    PostDto createPost(PostDto dto);
    PostDto updatePost(Long id, PostDto dto);
    void deletePost(Long id);
    List<PostDto> getAllPosts();
    PostDto getPostById(Long id);
    List<PostDto> searchPosts(String keyword);
    List<PostDto> getPostsByCategory(Long categoryId);
    List<PostDto> getPostsByUser(Long userId);
}
