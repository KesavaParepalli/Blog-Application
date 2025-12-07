package com.blogapp.blogapp.services;


import java.util.List;

import com.blogapp.blogapp.dtos.CategoryDto;

public interface CategoryService {
    CategoryDto createCategory(CategoryDto dto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long id);
    void deleteCategory(Long id);
    CategoryDto updateCategory(Long id, CategoryDto dto);
}

