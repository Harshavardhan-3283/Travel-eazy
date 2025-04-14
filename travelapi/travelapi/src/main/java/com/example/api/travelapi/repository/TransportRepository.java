package com.example.api.travelapi.repository;

import com.example.api.travelapi.model.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransportRepository extends JpaRepository<Transport,Integer> {
    List<Transport> findByUserid(Integer userid);
}
