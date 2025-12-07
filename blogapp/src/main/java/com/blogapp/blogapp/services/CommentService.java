package com.blogapp.blogapp.services;

import java.util.List;

import com.blogapp.blogapp.dtos.CommentDto;

public interface CommentService {
    CommentDto createComment(CommentDto dto);
    List<CommentDto> getCommentsByPost(Long postId);
}
