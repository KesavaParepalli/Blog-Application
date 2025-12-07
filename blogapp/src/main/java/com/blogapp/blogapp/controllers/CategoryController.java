package com.blogapp.blogapp.controllers;


import com.blogapp.blogapp.dtos.CategoryDto;
import com.blogapp.blogapp.services.CategoryService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public CategoryDto create(@RequestBody CategoryDto dto) {
        return service.createCategory(dto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public CategoryDto update(@PathVariable Long id, @RequestBody CategoryDto dto) {
        return service.updateCategory(id, dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCategory(id);
    }

    @GetMapping
    public List<CategoryDto> getAll() {
        return service.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDto get(@PathVariable Long id) {
        return service.getCategoryById(id);
    }
}

