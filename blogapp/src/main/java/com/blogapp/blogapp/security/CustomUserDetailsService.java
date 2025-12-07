package com.blogapp.blogapp.security;


import com.blogapp.blogapp.entities.User;
import com.blogapp.blogapp.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repo;

    public CustomUserDetailsService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String email) {
        User user = repo.findByEmail(email);
        if (user == null) throw new UsernameNotFoundException("User not found");
        return new CustomUserDetails(user);
    }
}
