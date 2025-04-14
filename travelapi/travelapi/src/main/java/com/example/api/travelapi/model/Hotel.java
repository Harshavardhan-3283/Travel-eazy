package com.example.api.travelapi.model;
import jakarta.persistence.*;

/**
 * Hotel Entity
 */
@Entity
@Table(name = "Hoteldetails")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer userid;

    @Column(nullable = false)
    private String hotelname;

    @Column(nullable = false)
    private String roomtype;

    @Column(nullable = false)
    private Integer numberofrooms;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Double price;

    public Hotel(Integer userid, String hotelname, String roomtype, Integer numberofrooms, String destination, String type, Double price) {
        this.userid = userid;
        this.hotelname = hotelname;
        this.roomtype = roomtype;
        this.numberofrooms = numberofrooms;
        this.destination = destination;
        this.type = type;
        this.price = price;
    }

    public Hotel() {}

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

    public String getHotelname() {
        return hotelname;
    }

    public void setHotelname(String hotelname) {
        this.hotelname = hotelname;
    }

    public String getRoomtype() {
        return roomtype;
    }

    public void setRoomtype(String roomtype) {
        this.roomtype = roomtype;
    }

    public Integer getNumberofrooms() {
        return numberofrooms;
    }

    public void setNumberofrooms(Integer numberofrooms) {
        this.numberofrooms = numberofrooms;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
