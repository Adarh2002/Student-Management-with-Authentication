package com.FSwebapp.studentsystem.repository;

import com.FSwebapp.studentsystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,  Long> {
}
