package com.example.api.travelapi.repository;

import com.example.api.travelapi.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Integer> {
    List<Restaurant> findByUserid(Integer userid);
}
