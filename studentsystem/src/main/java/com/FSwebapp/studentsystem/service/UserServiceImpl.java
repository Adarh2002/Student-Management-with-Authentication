package com.FSwebapp.studentsystem.service;

import com.FSwebapp.studentsystem.entity.UserEntity;
import com.FSwebapp.studentsystem.model.User;
import com.FSwebapp.studentsystem.repository.UserRepository;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        userRepository.save(userEntity);
        return user;
    }

    @Override
    public List<User> getAllUser() {
        List<UserEntity> userEntities
                = userRepository.findAll();

        List<User> users = userEntities
                .stream()
                .map(userEntity -> new User(
                        userEntity.getId(),
                        userEntity.getFirstname(),
                        userEntity.getLastname(),
                        userEntity.getEmailID()
                ))
                .collect(Collectors.toList());

        return users;
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity
                = userRepository.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public boolean deleteUser(Long id) {
        UserEntity user = userRepository.findById(id).get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity
                = userRepository.findById(id).get();
        userEntity.setEmailID(user.getEmailID());
        userEntity.setFirstname(user.getFirstname());
        userEntity.setLastname(user.getLastname());

        userRepository.save(userEntity);
        return user;
    }


}
