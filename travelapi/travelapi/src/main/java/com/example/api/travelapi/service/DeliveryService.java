package com.example.api.travelapi.service;

import com.example.api.travelapi.model.DeliveryInfo;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {
    private static final double AVERAGE_SPEED = 20.0; // km/h
    private static final double BASE_FEE = 2.0; // Base delivery fee
    private static final double PER_KM_FEE = 0.5; // Additional fee per kilometer

    public DeliveryInfo calculateDeliveryInfo(double restaurantLat, double restaurantLng, 
                                            double deliveryLat, double deliveryLng,
                                            String pickupLocation, String deliveryLocation) {
        // Calculate distance using Haversine formula
        double distance = calculateDistance(restaurantLat, restaurantLng, deliveryLat, deliveryLng);
        
        // Calculate estimated time (in minutes)
        int estimatedTime = calculateEstimatedTime(distance);
        
        // Calculate delivery fee
        double deliveryFee = calculateDeliveryFee(distance);

        return new DeliveryInfo(
            Math.round(distance * 10.0) / 10.0, // Round to 1 decimal place
            estimatedTime,
            Math.round(deliveryFee * 100.0) / 100.0, // Round to 2 decimal places
            pickupLocation,
            deliveryLocation
        );
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth's radius in kilometers

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c; // Distance in km
    }

    private int calculateEstimatedTime(double distance) {
        // Convert distance and speed to get time in hours
        double timeInHours = distance / AVERAGE_SPEED;
        // Convert to minutes and add 10 minutes for pickup and delivery handling
        return (int) Math.ceil(timeInHours * 60) + 10;
    }

    private double calculateDeliveryFee(double distance) {
        return BASE_FEE + (distance * PER_KM_FEE);
    }
}
