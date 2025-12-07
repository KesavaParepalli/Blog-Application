package com.blogapp.blogapp.services.impl;

import com.blogapp.blogapp.dtos.CommentDto;
import com.blogapp.blogapp.dtos.PostDto;
import com.blogapp.blogapp.entities.Post;
import com.blogapp.blogapp.entities.User;
import com.blogapp.blogapp.repositories.CategoryRepository;
import com.blogapp.blogapp.repositories.CommentRepository;
import com.blogapp.blogapp.repositories.PostRepository;
import com.blogapp.blogapp.repositories.UserRepository;
import com.blogapp.blogapp.services.PostService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepo;
    private final UserRepository userRepo;
    private final CategoryRepository categoryRepo;
    private final CommentRepository commentRepo;

    public PostServiceImpl(PostRepository postRepo, UserRepository userRepo,
                           CategoryRepository categoryRepo, CommentRepository commentRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.commentRepo = commentRepo;
    }

    private String getLoggedInEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal.toString();
    }


    public PostDto createPost(PostDto dto) {
        Post p = new Post();
        String email = getLoggedInEmail();
        User user = userRepo.findByEmail(email);
        p.setTitle(dto.getTitle());
        p.setContent(dto.getContent());
        p.setUser(user);
        p.setCategory(categoryRepo.findById(dto.getCategoryId()).orElse(null));
        Post saved = postRepo.save(p);
        dto.setId(saved.getId());
        return dto;
    }

    public PostDto updatePost(Long id, PostDto dto) {
        Post p = postRepo.findById(id).orElse(null);
        if (p == null) return null;
        String loggedInEmail = getLoggedInEmail();
        if (!p.getUser().getEmail().equals(loggedInEmail)) {
            throw new RuntimeException("You are not allowed to update this post!");
        }
        p.setTitle(dto.getTitle());
        p.setContent(dto.getContent());
        postRepo.save(p);
        dto.setId(id);
        dto.setUserId(p.getUser().getId());
        return dto;
    }
    /*public PostDto updatePost(Long id, PostDto dto) {
    Post p = postRepo.findById(id).orElse(null);
    if (p == null) return null;

    p.setTitle(dto.getTitle());
    p.setContent(dto.getContent());
    p.setUpdatedAt(LocalDateTime.now());   // IMPORTANT

    postRepo.save(p);

    dto.setId(id);
    dto.setUserId(p.getUser().getId());
    return dto;
    }*/


    public void deletePost(Long id) {
         Post post = postRepo.findById(id).orElse(null);
        if (post == null) return;

        String loggedInEmail = getLoggedInEmail();

        if (!post.getUser().getEmail().equals(loggedInEmail)) {
            throw new RuntimeException("You are not allowed to delete this post!");
        }

        postRepo.delete(post);
        //postRepo.deleteById(id);
    }

    public List<PostDto> getAllPosts() {
        return postRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public PostDto getPostById(Long id) {
        Post p = postRepo.findById(id).orElse(null);
        return p == null ? null : toDto(p);
    }

    public List<PostDto> searchPosts(String keyword) {
        return postRepo.findByTitleContainingIgnoreCase(keyword).stream()
                .map(this::toDto).collect(Collectors.toList());
    }

    public List<PostDto> getPostsByCategory(Long categoryId) {
        return postRepo.findByCategoryId(categoryId).stream()
                .map(this::toDto).collect(Collectors.toList());
    }

    public List<PostDto> getPostsByUser(Long userId) {
        return postRepo.findByUserId(userId).stream()
                .map(this::toDto).collect(Collectors.toList());
    }

    private PostDto toDto(Post p) {
        PostDto dto = new PostDto();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setContent(p.getContent());
        dto.setCategoryId(p.getCategory().getId());
        dto.setUserId(p.getUser().getId());
        dto.setUserName(p.getUser().getName()); 

        List<CommentDto> comments = commentRepo.findByPostId(p.getId())
                .stream().map(c -> {
                    CommentDto cd = new CommentDto();
                    cd.setId(c.getId());
                    cd.setContent(c.getContent());
                    cd.setPostId(p.getId());
                    return cd;
                }).collect(Collectors.toList());

        dto.setComments(comments);
        return dto;
    }
}

