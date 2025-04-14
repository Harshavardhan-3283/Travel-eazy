package com.example.api.travelapi.repository;

import com.example.api.travelapi.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel,Integer> {
    List<Hotel> findByUserid(Integer userid);

}
