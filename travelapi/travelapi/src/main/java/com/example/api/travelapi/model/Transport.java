package com.example.api.travelapi.model;

import jakarta.persistence.*;
@Entity
@Table(name = "Transportdetails")
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userid;

    private String fromLocation;

    private String toLocation;

    private String mode;

    private Double fee;

    private String destination;

    private String type;


    public Transport(Integer userid, String fromLocation, String toLocation, String mode, Double fee, String destination, String type) {
        this.userid = userid;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.mode = mode;
        this.fee = fee;
        this.destination = destination;
        this.type = type;
    }

public Transport() {}
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
