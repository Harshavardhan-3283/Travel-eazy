package com.example.api.travelapi.repository;

import com.example.api.travelapi.model.Trip;
import com.example.api.travelapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MySqlRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
