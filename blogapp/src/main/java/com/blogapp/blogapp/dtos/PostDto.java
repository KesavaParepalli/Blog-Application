package com.blogapp.blogapp.dtos;


import java.util.List;

public class PostDto {
    private Long id;

    private String title;
    private String content;
    private String userName;
    private Long categoryId;
    private Long userId;
    private List<CommentDto> comments;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public List<CommentDto> getComments() { return comments; }
    public void setComments(List<CommentDto> comments) { this.comments = comments; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
}
