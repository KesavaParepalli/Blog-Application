package com.blogapp.blogapp.services.impl;

import com.blogapp.blogapp.dtos.CategoryDto;
import com.blogapp.blogapp.entities.Category;
import com.blogapp.blogapp.repositories.CategoryRepository;
import com.blogapp.blogapp.services.CategoryService;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repo;

    public CategoryServiceImpl(CategoryRepository repo) {
        this.repo = repo;
    }

    public CategoryDto createCategory(CategoryDto dto) {
        Category c = new Category();
        c.setName(dto.getName());
        c.setDescription(dto.getDescription());
        Category saved = repo.save(c);
        dto.setId(saved.getId());
        return dto;
    }

    public List<CategoryDto> getAllCategories() {
        return repo.findAll().stream().map(c -> {
            CategoryDto dto = new CategoryDto();
            dto.setId(c.getId());
            dto.setName(c.getName());
            dto.setDescription(c.getDescription());
            return dto;
        }).collect(Collectors.toList());
    }
    public CategoryDto getCategoryById(Long id) {
        Category c = repo.findById(id).orElse(null);
        if (c == null) {
            return null;
        }
        CategoryDto dto = new CategoryDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setDescription(c.getDescription());
        return dto;
    }

    public void deleteCategory(Long id) {
        repo.deleteById(id);
    }

    public CategoryDto updateCategory(Long id, CategoryDto dto) {
        Category c = repo.findById(id).orElse(null);
        if (c == null) {
            return null;
        }
        c.setName(dto.getName());
        c.setDescription(dto.getDescription());
        Category updated = repo.save(c);
        dto.setId(updated.getId());
        return dto;
    }

}

