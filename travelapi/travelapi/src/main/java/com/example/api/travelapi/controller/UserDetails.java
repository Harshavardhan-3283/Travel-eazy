package com.example.api.travelapi.controller;
import com.example.api.travelapi.model.*;
import com.example.api.travelapi.model.User;
import com.example.api.travelapi.repository.*;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserDetails {
    @Autowired
    MySqlRepository mySqlRepository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    HotelRepository HotelRepository ;
    @Autowired
    RestaurantRepository restaurantRepository ;
    @Autowired
    TransportRepository transportRepository;
    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
        return mySqlRepository.findAll();
    }
    @PostMapping("/api/register")
    public ResponseEntity<?> create(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");
        String userName = (String) requestBody.get("userName");
        String userType = (String) requestBody.get("userType");

        // Check if the email already exists
        User existingUser = mySqlRepository.findByEmail(email);
        if (existingUser != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Create a new user if email does not exist
        User newUser = new User(userType, password, email, userName);
        User savedUser = mySqlRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> loginRequest) {
        String email = (String) loginRequest.get("email");
        String password = (String) loginRequest.get("password");
        
        User user = mySqlRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "Invalid email or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    @PostMapping("/saveTrip")
    public ResponseEntity<?> saveTrip(@RequestBody Map<String, Object> requestBody) {
        Integer userid = (Integer) requestBody.get("userid");
        String fromAddress = (String) requestBody.get("fromAddress");
        String toAddress = (String) requestBody.get("toAddress");
        String journeyDate = (String) requestBody.get("journeyDate");
        Integer adults = (Integer) requestBody.get("adults");
        Integer children = (Integer) requestBody.get("children");
        String travelMode = (String) requestBody.get("travelMode");
        String type = (String) requestBody.get("type");

        // Create a new user if email does not exist
        Trip newTrip = new Trip(userid, fromAddress, toAddress, journeyDate,adults, children, travelMode, type);
        Trip savedUser = tripRepository.save(newTrip);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    @GetMapping("/getTrips")
    public ResponseEntity<?> getTripsByUserId(@RequestParam Integer userid) {
        List<Trip> trips = tripRepository.findByUserid(userid);
//        if (trips.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No trips found for the given userId.");
//        }
        return ResponseEntity.ok(trips);
    }
    @PostMapping("/saveRestaurant")
    public ResponseEntity<?> saveRestaurant(@RequestBody Map<String, Object> requestBody) {
        Integer userid = (Integer) requestBody.get("userid");
//        String name = (String) requestBody.get("name");
//        Integer quantity = (Integer) requestBody.get("quantity");
        String restaurantName = (String) requestBody.get("restaurantName");
        String destination = (String) requestBody.get("destination");
        String type = (String) requestBody.get("type");
        List<Map<String, Object>> dishes = (List<Map<String, Object>>) requestBody.get("dishes");
        for (Map<String, Object> dish : dishes) {
            String name = (String) dish.get("name");
            Integer quantity = (Integer) dish.get("quantity");

            // Create and save the restaurant entry
            Restaurant restaurantDetails = new Restaurant(userid, name, quantity, restaurantName, destination, type);
            restaurantRepository.save(restaurantDetails);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("userid", userid);
        response.put("restaurantName", restaurantName);
        response.put("destination", destination);
        response.put("type", type);
        response.put("dishes", dishes);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/getRestaurant")
    public ResponseEntity<?> getRestaurantByUserId(@RequestParam Integer userid) {
        List<Restaurant> restaurants = restaurantRepository.findByUserid(userid);
//        if (restaurants.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No restaurants found for the given userId.");
//        }
        return ResponseEntity.ok(restaurants);
    }
    @PostMapping("/saveHotel")
    public ResponseEntity<?> saveHotel(@RequestBody Map<String, Object> requestBody) {
        Integer userid = (Integer) requestBody.get("userid");
        String hotelname = (String) requestBody.get("hotelname");
        String roomtype = (String) requestBody.get("roomtype");
        Integer numberofrooms = (Integer) requestBody.get("numberofrooms");
        String destination = (String) requestBody.get("destination");
        String type = (String) requestBody.get("type");
        Double price = getDefaultPrice(roomtype);

        Hotel hotel = new Hotel(userid, hotelname, roomtype, numberofrooms, destination, type, price);
        Hotel savedHotel = HotelRepository.save(hotel);
        return ResponseEntity.ok(savedHotel);
    }

    private Double getDefaultPrice(String roomType) {
        // Default prices for different room types
        Map<String, Double> prices = new HashMap<>();
        prices.put("King Size Room", 250.0);
        prices.put("Deluxe", 200.0);
        prices.put("Suite", 300.0);
        prices.put("Single", 100.0);
        prices.put("Double", 150.0);
        
        return prices.getOrDefault(roomType, 150.0); // Default price if room type not found
    }
    @GetMapping("/getHotel")
    public ResponseEntity<?> getHotelByUserId(@RequestParam Integer userid) {
        List<Hotel> hotels = HotelRepository.findByUserid(userid);
//        if (hotels.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Hotel(s) found for the given userId.");
//        }
        return ResponseEntity.ok(hotels);
    }
    @PostMapping("/saveTransport")
    public ResponseEntity<?> saveTransport(@RequestBody Map<String, Object> requestBody) {
        Integer userid = (Integer) requestBody.get("userid");
        String fromLocation = (String) requestBody.get("from");
        String toLocation = (String) requestBody.get("to");
        String mode = (String) requestBody.get("mode");
        Double fee = Double.valueOf(requestBody.get("fee").toString());
        String destination = (String) requestBody.get("destination");
        String type = (String) requestBody.get("type");

        Transport transportDetails = new Transport(userid, fromLocation, toLocation, mode, fee, destination, type);
        Transport savedTransport = transportRepository.save(transportDetails);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTransport);
    }
    @GetMapping("/getTransport")
    public ResponseEntity<?> getTransportByUserId(@RequestParam Integer userid) {
        List<Transport> transports = transportRepository.findByUserid(userid);
//        if (transports.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No transport(s) found for the given userId.");
//        }
        return ResponseEntity.ok(transports);
    }
    @PostMapping("/login")
    public ResponseEntity<?> getUserByEmail(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");
        System.out.println(email);
        System.out.println(password);

        // Find the user by email
        User user = mySqlRepository.findByEmail((String) requestBody.get("email")); // Assume findByEmail is defined in your repository
        System.out.println(user);
        if (user == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Verify the password
        if (!user.getPassword().equals(password)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Return the user object (or token in real-world scenarios)
        return ResponseEntity.ok(user);
    }

    @PostMapping("/calculateDelivery")
    public ResponseEntity<?> calculateDeliveryInfo(@RequestBody Map<String, Object> requestBody) {
        try {
            Integer restaurantId = (Integer) requestBody.get("restaurantId");
            Map<String, Double> deliveryLocation = (Map<String, Double>) requestBody.get("deliveryLocation");
            String pickupLocationStr = (String) requestBody.get("pickupLocation");
            String deliveryLocationStr = (String) requestBody.get("deliveryLocationStr");

            // Get restaurant details
            Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
            if (!restaurant.isPresent()) {
                return ResponseEntity.badRequest().body("Restaurant not found");
            }

            // Calculate delivery info
            DeliveryInfo deliveryInfo = deliveryService.calculateDeliveryInfo(
                restaurant.get().getLatitude(),
                restaurant.get().getLongitude(),
                deliveryLocation.get("lat"),
                deliveryLocation.get("lng"),
                pickupLocationStr,
                deliveryLocationStr
            );

            return ResponseEntity.ok(deliveryInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error calculating delivery info: " + e.getMessage());
        }
    }
}
