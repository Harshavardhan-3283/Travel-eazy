package com.example.api.travelapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.travelapi.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip,Integer> {
    List<Trip> findByUserid(Integer userid);
}
