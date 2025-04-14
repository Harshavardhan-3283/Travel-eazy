package com.example.api.travelapi.model;

public class DeliveryInfo {
    private double distance; // in kilometers
    private int estimatedTime; // in minutes
    private double deliveryFee;
    private String pickupLocation;
    private String deliveryLocation;

    public DeliveryInfo(double distance, int estimatedTime, double deliveryFee, String pickupLocation, String deliveryLocation) {
        this.distance = distance;
        this.estimatedTime = estimatedTime;
        this.deliveryFee = deliveryFee;
        this.pickupLocation = pickupLocation;
        this.deliveryLocation = deliveryLocation;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public int getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(int estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public double getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDeliveryLocation() {
        return deliveryLocation;
    }

    public void setDeliveryLocation(String deliveryLocation) {
        this.deliveryLocation = deliveryLocation;
    }
}
