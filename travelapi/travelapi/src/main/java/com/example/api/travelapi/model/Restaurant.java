package com.example.api.travelapi.model;

import jakarta.persistence.*;

/**
 * Entity representing a restaurant.
 */
@Entity
@Table(name = "Restaurantdetails")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userid;
    private String name;

    private Integer quantity;

    private String restaurantName;

    private String destination;

    private String type;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    public Restaurant(Integer userid, String name, Integer quantity, String restaurantName, String destination, String type, Double latitude, Double longitude) {
        this.userid = userid;
        this.name = name;
        this.quantity = quantity;
        this.restaurantName = restaurantName;
        this.destination = destination;
        this.type = type;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    public Restaurant() {}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
