package com.blogapp.blogapp.services.impl;


import com.blogapp.blogapp.dtos.CommentDto;
import com.blogapp.blogapp.entities.Comment;
import com.blogapp.blogapp.repositories.CommentRepository;
import com.blogapp.blogapp.repositories.PostRepository;
import com.blogapp.blogapp.services.CommentService;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repo;
    private final PostRepository postRepo;

    public CommentServiceImpl(CommentRepository repo, PostRepository postRepo) {
        this.repo = repo;
        this.postRepo = postRepo;
    }

    public CommentDto createComment(CommentDto dto) {
        Comment c = new Comment();
        c.setContent(dto.getContent());
        c.setPost(postRepo.findById(dto.getPostId()).orElse(null));
        Comment saved = repo.save(c);
        dto.setId(saved.getId());
        return dto;
    }

    public List<CommentDto> getCommentsByPost(Long postId) {
        return repo.findByPostId(postId).stream().map(c -> {
            CommentDto cd = new CommentDto();
            cd.setId(c.getId());
            cd.setContent(c.getContent());
            cd.setPostId(postId);
            return cd;
        }).collect(Collectors.toList());
    }
}

