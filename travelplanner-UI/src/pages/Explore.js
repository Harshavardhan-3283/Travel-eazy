import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs, ListGroup, Row, Col, Badge, Card, Modal, Button, Form } from "react-bootstrap";
import { FaStar, FaDollarSign, FaTaxi } from "react-icons/fa";
import './ExploreDestination.css'; // Import custom CSS for styling
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import './Explore.css'
import axios from 'axios';

// Mock data for destinations
const mockData = {

  Agra: {
    placesToVisit: [
      {
        name: "Taj Mahal",
        isOpen: true,
        distance: "2 km",
        details: "An iconic symbol of love, built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
      },
      {
        name: "Agra Fort",
        isOpen: false,
        distance: "3 km",
        details: "A UNESCO World Heritage site, the fort served as the main residence of the emperors of the Mughal dynasty.",
      },
      {
        name: "Fatehpur Sikri",
        isOpen: true,
        distance: "30 km",
        details: "A historic city built by Emperor Akbar, known for its grand architecture and historical significance.",
      },
      {
        name: "Mehtab Bagh",
        isOpen: true,
        distance: "5 km",
        details: "A garden complex across the Yamuna River offering a stunning view of the Taj Mahal.",
      },
    ],
    hotels: [
      {
        name: "ITC Mughal Agra",
        pricePerNight: "$150",
        timeToReach: "30 mins",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant"],
        
      },
      {
        name: "The Oberoi Amarvilas",
        pricePerNight: "$500",
        timeToReach: "20 mins",
        amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Bar", "Fitness Center"],
        
      },
      {
        name: "Radisson Hotel Agra",
        pricePerNight: "$100",
        timeToReach: "25 mins",
        amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Pool"],
        
      },
      {
        name: "Courtyard by Marriott Agra",
        pricePerNight: "$120",
        timeToReach: "15 mins",
        amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Gym"],
        
      },
    ],
    restaurants: [
      {
        name: "Pinch of Spice",
        rating: 4.5,
        cuisine: "Indian",
        averagePrice: "$30",


      },
      {
        name: "Peshawri",
        rating: 4.7,
        cuisine: "North Indian",
        averagePrice: "$40",
        
      },
      {
        name: "Dasaprakash",
        rating: 4.4,
        cuisine: "South Indian",
        averagePrice: "$25",
        
      },
      {
        name: "Shankara Vegis",
        rating: 4.3,
        cuisine: "Vegetarian",
        averagePrice: "$20",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJZ_p5k_ElexN-byanJx5S03nWutnLqhR6pw&s"
      },
    ],
    localTransport: [
      {
        name: "Auto Rickshaw",
        pricePerHour: "$5",
        availableInMinutes: 5,
        details: "A common and inexpensive mode of transport for short distances.",
      },
      {
        name: "Cycle Rickshaw",
        pricePerHour: "$3",
        availableInMinutes: 10,
        details: "A traditional form of transport that runs on pedal power, great for narrow streets.",
      },
      {
        name: "Private Cabs",
        pricePerHour: "$15",
        availableInMinutes: 10,
        details: "Private cabs are available for hire, suitable for longer distances.",
      },
      {
        name: "City Bus",
        pricePerHour: "$1",
        availableInMinutes: 15,
        details: "A low-cost public transport option, perfect for traveling across the city.",
      },
    ],
  },
  Chennai: {
    placesToVisit: [
      {
        name: "Marina Beach",
        isOpen: true,
        distance: "0 km",
        details: "A long urban beach, popular for evening walks and sunbathing.",
      },
      {
        name: "Kapaleeshwarar Temple",
        isOpen: true,
        distance: "5 km",
        details: "A historic Hindu temple dedicated to Lord Shiva, known for its architecture.",
      },
      {
        name: "Fort St. George",
        isOpen: true,
        distance: "2 km",
        details: "A historic British fort, now a museum showcasing colonial artifacts.",
      },
      {
        name: "Government Museum",
        isOpen: true,
        distance: "3 km",
        details: "One of the oldest museums in India, housing a vast collection of art and artifacts.",
      },
    ],
    hotels: [
      {
        name: "Taj Coromandel",
        pricePerNight: "$180",
        timeToReach: "25 mins",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Restaurant", "Bar"],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQclngWeXrYAkcCzLC4sqkVJinIy300korW2Q&s'
      },
      {
        name: "The Leela Palace",
        pricePerNight: "$300",
        timeToReach: "15 mins",
        amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Beachfront"],
        
      },
      {
        name: "Radisson Blu",
        pricePerNight: "$120",
        timeToReach: "30 mins",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR659n3CIJzU6FgiG5lNdo0Z6ajDyPk7UgUPw&s",
        amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Gym"],
      },
      {
        name: "ITC Grand Chola",
        pricePerNight: "$250",
        timeToReach: "20 mins",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRongBtyQY2IJqg5HYkCRoDwvgTbdN_pv9VfQ&s",
        amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Pool"],
      },
    ],
    restaurants: [
      {
        name: "Buhari",
        rating: 4.5,
        cuisine: "Indian",
        averagePrice: "$35",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnurUGmOv7NN1ow3kylCnty2dTK8-MLsZq8w&s'
      },
      {
        name: "Peshawri",
        rating: 4.8,
        cuisine: "North Indian",
        averagePrice: "$45",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0hYWHZkpH0iSXD7pKk77wPK_oR8xDC39Iw&s'
      },
      {
        name: "The Marina",
        rating: 4.3,
        cuisine: "Seafood",
        averagePrice: "$40",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWe4mDZYW5iYQJG76ezK_a3S8tv_zDlKO8fg&s"
      },
      {
        name: "Anjappar",
        rating: 4.2,
        cuisine: "Chettinad",
        averagePrice: "$30",
        
      },
    ],
    localTransport: [
      {
        name: "Auto Rickshaw",
        pricePerHour: "$4",
        availableInMinutes: 5,
        details: "Ideal for short trips within the city.",
      },
      {
        name: "Private Cabs",
        pricePerHour: "$12",
        availableInMinutes: 5,
        details: "Available for a comfortable ride to any destination.",
      },
      {
        name: "Metro",
        pricePerHour: "$1.5",
        availableInMinutes: 10,
        details: "Affordable and quick, connecting key parts of the city.",
      },
      {
        name: "City Bus",
        pricePerHour: "$0.8",
        availableInMinutes: 20,
        details: "Economical public transport option for daily travel.",
      },
    ],
  },
  Kerala: {
    placesToVisit: [
      {
        name: "Alleppey Backwaters",
        isOpen: true,
        distance: "0 km",
        details: "The backwaters of Alleppey are famous for houseboat cruises and tranquil views of the lush green landscape.",
      },
      {
        name: "Munnar Tea Gardens",
        isOpen: true,
        distance: "140 km",
        details: "Famous for its sprawling tea gardens, Munnar offers scenic views of the Western Ghats and pleasant weather.",
      },
      {
        name: "Athirappilly Waterfalls",
        isOpen: true,
        distance: "70 km",
        details: "Known as the 'Niagara of India', this waterfall is a popular spot for nature lovers and movie shoots.",
      },
      {
        name: "Wayanad Wildlife Sanctuary",
        isOpen: true,
        distance: "120 km",
        details: "A pristine wildlife sanctuary offering great opportunities for trekking and wildlife photography.",
      },
    ],
    hotels: [
      {
        name: "Taj Green Cove Resort",
        pricePerNight: "$200",
        timeToReach: "2 hours",
        amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Private Beach"],
        
      },
      {
        name: "The Leela Kovalam",
        pricePerNight: "$250",
        timeToReach: "1 hour",
        amenities: ["Free Wi-Fi", "Infinity Pool", "Spa", "Beachfront"],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlbvFyPssHnbVThr0EpS8cN76F46NhCyFtQ&s'
      },
      {
        name: "Kumarakom Lake Resort",
        pricePerNight: "$300",
        timeToReach: "2.5 hours",
        amenities: ["Houseboats", "Spa", "Restaurant", "Free Wi-Fi"],
        
      },
      {
        name: "Vythiri Village Resort",
        pricePerNight: "$120",
        timeToReach: "3 hours",
        amenities: ["Free Wi-Fi", "Spa", "Pool", "Restaurant"],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQclngWeXrYAkcCzLC4sqkVJinIy300korW2Q&s'
      },
    ],
    restaurants: [
      {
        name: "Sree Krishna Inn",
        rating: 4.5,
        cuisine: "Kerala Traditional",
        averagePrice: "$25",
        
      },
      {
        name: "The Tandoor",
        rating: 4.7,
        cuisine: "Indian",
        averagePrice: "$40",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR659n3CIJzU6FgiG5lNdo0Z6ajDyPk7UgUPw&s"
      },
      {
        name: "Fish Market",
        rating: 4.3,
        cuisine: "Seafood",
        averagePrice: "$35",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRongBtyQY2IJqg5HYkCRoDwvgTbdN_pv9VfQ&s"
      },
      {
        name: "The Kerala Kitchen",
        rating: 4.2,
        cuisine: "Kerala Cuisine",
        averagePrice: "$20",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0hYWHZkpH0iSXD7pKk77wPK_oR8xDC39Iw&s'
      },
    ],
    localTransport: [
      {
        name: "Auto Rickshaw",
        pricePerHour: "$4",
        availableInMinutes: 5,
        details: "Auto rickshaws are widely available for short distances within cities.",
      },
      {
        name: "Private Cabs",
        pricePerHour: "$15",
        availableInMinutes: 10,
        details: "Private cabs are available for comfortable city-wide travel.",
      },
      {
        name: "Boat Rides",
        pricePerHour: "$10",
        availableInMinutes: 10,
        details: "Explore the backwaters of Kerala on a boat ride, which is a popular way of transport.",
      },
      {
        name: "Buses",
        pricePerHour: "$2",
        availableInMinutes: 15,
        details: "Affordable and common for intercity and local travel.",
      },
    ],
  },
  AndhraPradesh: {
    placesToVisit: [
      {
        name: "Tirumala Tirupati",
        isOpen: true,
        distance: "0 km",
        details: "A major pilgrimage site, Tirupati is famous for the Venkateswara Temple located on the Tirumala hills.",
      },
      {
        name: "Araku Valley",
        isOpen: true,
        distance: "110 km",
        details: "A scenic hill station known for its coffee plantations, trekking trails, and beautiful landscapes.",
      },
      {
        name: "Rishikonda Beach",
        isOpen: true,
        distance: "25 km",
        details: "A pristine beach near Visakhapatnam, perfect for water sports and relaxation.",
      },
      {
        name: "Borra Caves",
        isOpen: true,
        distance: "90 km",
        details: "Ancient limestone caves known for stalactites and stalagmites, located in the Ananthagiri hills.",
      },
    ],
    hotels: [
      {
        name: "Taj Tirupati",
        pricePerNight: "$180",
        timeToReach: "30 mins",
        amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Gym"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        name: "Novotel Visakhapatnam",
        pricePerNight: "$150",
        timeToReach: "1 hour",
        amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Spa"],
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=749&q=80"
      },
      {
        name: "Park Hyatt Visakhapatnam",
        pricePerNight: "$220",
        timeToReach: "1 hour",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Bar"],
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    restaurants: [
      {
        name: "Bamboo Bay",
        rating: 4.6,
        cuisine: "Seafood",
        averagePrice: "$40",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        name: "Golden Dragon",
        rating: 4.3,
        cuisine: "Chinese",
        averagePrice: "$35",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        name: "Sarvi Restaurant",
        rating: 4.4,
        cuisine: "Indian",
        averagePrice: "$25",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    localTransport: [
      {
        name: "Auto Rickshaw",
        pricePerHour: "$3",
        availableInMinutes: 5,
        details: "Auto rickshaws are widely available for short-distance travel.",
      },
      {
        name: "Private Cabs",
        pricePerHour: "$12",
        availableInMinutes: 10,
        details: "Private cabs are available for all distances and offer a comfortable ride.",
      },
      {
        name: "State Transport Buses",
        pricePerHour: "$1.5",
        availableInMinutes: 15,
        details: "Public buses offer economical travel for locals and intercity commutes.",
      },
      {
        name: "Train Service",
        pricePerHour: "$5",
        availableInMinutes: 30,
        details: "For longer distances, the train service is a popular mode of transport.",
      },
    ],
  },
  Mumbai: {
    placesToVisit: [
      {
        name: "Gateway of India",
        isOpen: true,
        distance: "1 km",
        details: "An iconic arch monument overlooking the Arabian Sea, built to commemorate the visit of King George V and Queen Mary.",
      },
      {
        name: "Marine Drive",
        isOpen: true,
        distance: "3 km",
        details: "A scenic boulevard by the sea, also known as the Queen’s Necklace for its beautifully lit view at night.",
      },
      {
        name: "Chhatrapati Shivaji Maharaj Terminus",
        isOpen: true,
        distance: "5 km",
        details: "A UNESCO World Heritage site, this historic railway station features stunning Victorian Gothic architecture.",
      },
      {
        name: "Haji Ali Dargah",
        isOpen: false,
        distance: "7 km",
        details: "A famous mosque and tomb situated on an islet in the Arabian Sea, accessible by a narrow walkway.",
      },
      {
        name: "Sanjay Gandhi National Park",
        isOpen: true,
        distance: "25 km",
        details: "A lush green oasis in the city, offering nature trails, a safari, and the ancient Kanheri Caves.",
      },
      {
        name: "Elephanta Caves",
        isOpen: false,
        distance: "11 km (ferry ride)",
        details: "A network of sculpted caves dedicated to Lord Shiva, located on Elephanta Island.",
      },
    ],
    hotels: [
      {
        name: "The Taj Mahal Palace",
        pricePerNight: "$250",
        timeToReach: "15 mins",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant", "Sea View"],
        
      },
      {
        name: "Trident Nariman Point",
        pricePerNight: "$200",
        timeToReach: "20 mins",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Business Center"],
        
      },
      {
        name: "The St. Regis Mumbai",
        pricePerNight: "$220",
        timeToReach: "25 mins",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Luxury Suites", "Restaurant"],
        
      },
      {
        name: "JW Marriott Juhu",
        pricePerNight: "$180",
        timeToReach: "35 mins",
        amenities: ["Beach Access", "Free Wi-Fi", "Pool", "Spa", "Multiple Restaurants"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLjpNeHda-dT3x11GrruV9lDZBIcc_64eiQ&s", // Add image URL
      },
      {
        name: "Sofitel Mumbai BKC",
        pricePerNight: "$170",
        timeToReach: "30 mins",
        amenities: ["Free Wi-Fi", "Spa", "Gym", "Restaurant", "Conference Rooms"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZNjl6pwBmqjjtjqNxMy6CB6_jd_l29XMpg&s", // Add image URL
      },
    ],
    restaurants: [
      {
        name: "The Table",
        rating: 4.7,
        cuisine: "Continental",
        averagePrice: "$50",
        
      },
      {
        name: "Peshawri - ITC Maratha",
        rating: 4.8,
        cuisine: "North Indian",
        averagePrice: "$60",
        
      },
      {
        name: "Bastian",
        rating: 4.6,
        cuisine: "Seafood",
        averagePrice: "$70",
        
      },
      {
        name: "Trishna",
        rating: 4.5,
        cuisine: "Seafood",
        averagePrice: "$40",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArkE8ug_aNv82OfMlrzxTTzf0uxUKy39xLQ&s", // Add image URL
      },
      {
        name: "Leopold Cafe",
        rating: 4.4,
        cuisine: "Multi-Cuisine",
        averagePrice: "$35",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjZWxF857wSQn-JXkXtibHxZpX4xmyj1p6tA&s", // Add image URL
      },
    ],
    localTransport: [
      {
        name: "Auto Rickshaw",
        pricePerHour: "$5",
        availableInMinutes: 5,
        details: "A common and inexpensive mode of transport for short distances.",
      },
      {
        name: "Cycle Rickshaw",
        pricePerHour: "$3",
        availableInMinutes: 10,
        details: "A traditional form of transport that runs on pedal power, great for narrow streets.",
      },
      {
        name: "Private Cabs",
        pricePerHour: "$15",
        availableInMinutes: 10,
        details: "Private cabs are available for hire, suitable for longer distances.",
      },
      {
        name: "City Bus",
        pricePerHour: "$1",
        availableInMinutes: 15,
        details: "A low-cost public transport option, perfect for traveling across the city.",
      },
    ],
  },
  Goa: {
    placesToVisit: [
      {
        name: "Baga Beach",
        isOpen: true,
        distance: "2 km",
        details: "A popular beach known for water sports, nightlife, and beach shacks offering delicious seafood.",
      },
      {
        name: "Basilica of Bom Jesus",
        isOpen: true,
        distance: "10 km",
        details: "A UNESCO World Heritage site and one of the oldest churches in Goa, housing the remains of St. Francis Xavier.",
      },
      {
        name: "Dudhsagar Falls",
        isOpen: true,
        distance: "60 km",
        details: "A breathtaking four-tiered waterfall located on the Mandovi River, surrounded by lush greenery.",
      },
      {
        name: "Fort Aguada",
        isOpen: true,
        distance: "8 km",
        details: "A 17th-century Portuguese fort offering panoramic views of the Arabian Sea and a historic lighthouse.",
      },
      {
        name: "Anjuna Flea Market",
        isOpen: false,
        distance: "3 km",
        details: "A vibrant market held every Wednesday, offering everything from clothing to handicrafts and souvenirs.",
      },
      {
        name: "Chapora Fort",
        isOpen: true,
        distance: "5 km",
        details: "A historical fort known for its stunning sunset views and its appearance in the movie 'Dil Chahta Hai.'",
      },
    ],
    hotels: [
      {
        name: "Taj Exotica Resort & Spa",
        pricePerNight: "$300",
        timeToReach: "40 mins",
        amenities: ["Beachfront", "Free Wi-Fi", "Pool", "Spa", "Golf Course"],
        
      },
      {
        name: "The Leela Goa",
        pricePerNight: "$280",
        timeToReach: "45 mins",
        amenities: ["Beach Access", "Free Wi-Fi", "Pool", "Luxury Villas", "Restaurant"],
        
      },
      {
        name: "Park Hyatt Goa Resort and Spa",
        pricePerNight: "$250",
        timeToReach: "50 mins",
        amenities: ["Beachfront", "Free Wi-Fi", "Spa", "Multiple Pools", "Kids' Club"],
        
      },
      {
        name: "Novotel Goa Resort & Spa",
        pricePerNight: "$150",
        timeToReach: "30 mins",
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant"],
        
      },
      {
        name: "Vivanta Goa, Panaji",
        pricePerNight: "$130",
        timeToReach: "20 mins",
        amenities: ["Free Wi-Fi", "Rooftop Pool", "Gym", "Restaurant", "City View"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQclngWeXrYAkcCzLC4sqkVJinIy300korW2Q&s", // Add image URL
      },
    ],
    restaurants: [
      {
        name: "Thalassa",
        rating: 4.8,
        cuisine: "Greek",
        averagePrice: "$40",
        
      },
      {
        name: "Pousada by the Beach",
        rating: 4.7,
        cuisine: "Goan, Seafood",
        averagePrice: "$50",
        
      },
      {
        name: "Sakana",
        rating: 4.5,
        cuisine: "Japanese",
        averagePrice: "$30",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR659n3CIJzU6FgiG5lNdo0Z6ajDyPk7UgUPw&s", // Add image URL
      },
      {
        name: "Gunpowder",
        rating: 4.6,
        cuisine: "South Indian",
        averagePrice: "$35",
        
      },
      {
        name: "Martin’s Corner",
        rating: 4.5,
        cuisine: "Goan, Seafood",
        averagePrice: "$40",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0hYWHZkpH0iSXD7pKk77wPK_oR8xDC39Iw&s", // Add image URL
      },
    ],
    localTransport: [
      {
        name: "Auto Rickshaw",
        pricePerHour: "$5",
        availableInMinutes: 5,
        details: "A common and inexpensive mode of transport for short distances.",
      },
      {
        name: "Cycle Rickshaw",
        pricePerHour: "$3",
        availableInMinutes: 10,
        details: "A traditional form of transport that runs on pedal power, great for narrow streets.",
      },
      {
        name: "Private Cabs",
        pricePerHour: "$15",
        availableInMinutes: 10,
        details: "Private cabs are available for hire, suitable for longer distances.",
      },
      {
        name: "City Bus",
        pricePerHour: "$1",
        availableInMinutes: 15,
        details: "A low-cost public transport option, perfect for traveling across the city.",
      },
    ],
  }
};

// Mock data for destinations
// [Same mockData as above]


const ExploreDestination = () => {
  const location = useLocation();
  const destination = location.state?.destination;
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupLocationsData, setPickupLocationsData] = useState([]);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const getPickupLocations = useCallback(() => {
    // Static pickup locations with distance and time data
    const staticPickupLocations = {
      'AndhraPradesh': [
        { name: 'Vijayawada Station', distance: '2.5 km', time: '15 mins' },
        { name: 'RTC Complex Vizag', distance: '3.2 km', time: '20 mins' },
        { name: 'Tirupati Bus Stand', distance: '1.8 km', time: '12 mins' },
        { name: 'Guntur Market', distance: '4.0 km', time: '25 mins' },
        { name: 'Nellore Central', distance: '2.9 km', time: '18 mins' }
      ],
      'Agra': [
        { name: 'Agra Cantt Railway Station', distance: '3.1 km', time: '20 mins' },
        { name: 'Taj Ganj Market', distance: '1.5 km', time: '10 mins' },
        { name: 'Sadar Bazaar', distance: '2.8 km', time: '18 mins' },
        { name: 'Raja Ki Mandi', distance: '3.5 km', time: '22 mins' },
        { name: 'Trans Yamuna Colony', distance: '4.2 km', time: '28 mins' }
      ],
      // Add other cities with similar data structure
    };

    return staticPickupLocations[destination] || staticPickupLocations['AndhraPradesh'];
  }, [destination]);

  useEffect(() => {
    const locations = getPickupLocations();
    setPickupLocationsData(locations);
  }, [getPickupLocations]);

  const handlePickupLocationChange = (location, distance, time) => {
    setPickupLocation(location);
    setEstimatedDistance(distance);
    setEstimatedTime(time);
  };

  const [data, setData] = useState({
    placesToVisit: [],
    hotels: [],
    restaurants: [],
    localTransport: [],
  });
  const [currentStep, setCurrentStep] = useState("menu");
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [transportDetails, setTransportDetails] = useState({
    from: '',
    to: '',
    mode: '',
    fee: '',
  });
  const [deliveryMode, setDeliveryMode] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateUpiId = (upi) => {
    // UPI ID format: username@bankname
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upi) {
      return "UPI ID is required";
    }
    if (!upiRegex.test(upi)) {
      return "Invalid UPI ID format. Example: username@bankname";
    }
    return "";
  };

  const validateDeliveryForm = () => {
    const errors = {};
    
    if (!deliveryMode) {
      errors.deliveryMode = "Please select a delivery mode";
    }

    if (deliveryMode === "Takeaway" && !pickupLocation) {
      errors.pickupLocation = "Please select a pickup location";
    }

    if (deliveryMode === "Delivery" && !toAddress) {
      errors.toAddress = "Please enter delivery address";
    }

    if (!paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
    }

    if (paymentMethod === "UPI") {
      const upiValidationError = validateUpiId(upiId);
      if (upiValidationError) {
        errors.upiId = upiValidationError;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    console.log(mockData[destination]);

    if (destination && mockData[destination]) {
      setData(mockData[destination]);
    } else {
      setData(mockData['AndhraPradesh'])
    }
  }, [destination]);
  useEffect(() => {
    if ( toAddress && deliveryMode === "Delivery") {
      const generateRandomData = () => {
        const randomDistance = (Math.random() * 10 + 1).toFixed(1); // Distance between 1 to 10 km
        const randomTime = Math.floor(Math.random() * 20 + 10); // Time between 10 to 30 minutes
        setEstimatedDistance(`${randomDistance} km`);
        setEstimatedTime(`${randomTime} mins`);
      };

      generateRandomData();
    }
  }, [ toAddress, deliveryMode]);
  const saveDataToCookies = (key, newData) => {
    const existingData = Cookies.get(key) ? JSON.parse(Cookies.get(key)) : [];
    const updatedData = Array.isArray(existingData) ? [...existingData, newData] : [newData];
    Cookies.set(key, JSON.stringify(updatedData), { expires: 7 }); // Data expires in 7 days
  };
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setRestaurantMenu([
      { name: 'Pasta', description: 'Delicious Italian dish made with durum wheat noodles.', quantity: 0, price: 12.99 },
      { name: 'Noodles', description: 'Stir-fried Asian noodles with vegetables and sauces.', quantity: 0, price: 10.99 },
      { name: 'Pizza', description: 'A classic Italian dish topped with cheese, tomato sauce, and various toppings.', quantity: 0, price: 15.49 },
      { name: 'Burger', description: 'Juicy beef patty in a soft bun with lettuce, cheese, and sauce.', quantity: 0, price: 9.99 },
      { name: 'Sushi', description: 'Japanese dish consisting of vinegared rice paired with seafood or vegetables.', quantity: 0, price: 18.99 },
      { name: 'Salad', description: 'A healthy mix of fresh vegetables, fruits, and dressings.', quantity: 0, price: 7.99 },
      { name: 'Tacos', description: 'Mexican dish made of corn tortillas filled with meat, cheese, and veggies.', quantity: 0, price: 8.49 },
      { name: 'Fried Chicken', description: 'Crispy battered chicken pieces fried to perfection.', quantity: 0, price: 11.99 },
      { name: 'Lasagna', description: 'Layers of pasta, meat sauce, cheese, and béchamel sauce baked together.', quantity: 0, price: 13.49 },
      { name: 'Steak', description: 'A thick cut of beef grilled to your preferred doneness.', quantity: 0, price: 21.99 }
    ]);
    setShowRestaurantModal(true);
  };

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setRoomTypes([
      { name: 'King Size Room', description: 'A luxurious king size bed with a great view.', quantity: 0, price: 200 },
      { name: 'Deluxe', description: 'A deluxe room with all amenities and a king bed.', quantity: 0, price: 150 },
      { name: 'Suite', description: 'A spacious suite with separate living and sleeping areas.', quantity: 0, price: 300 },
      { name: 'Single', description: 'A compact room perfect for solo travelers.', quantity: 0, price: 100 },
      { name: 'Double', description: 'A room with a double bed, suitable for two guests.', quantity: 0, price: 120 },
    ]);
    setShowHotelModal(true);
  };

  const handleTransportClick = () => {
    setShowTransportModal(true);
  };
  const handleTransportChange = (e) => {
    setTransportDetails({
      ...transportDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleQuantityChange = (index, increment, type) => {
    const updatedList = type === 'restaurant' ? [...restaurantMenu] : [...roomTypes];
    updatedList[index].quantity = Math.max(0, updatedList[index].quantity + increment);

    if (type === 'restaurant') {
      setRestaurantMenu(updatedList);
    } else {
      setRoomTypes(updatedList);
    }
  };
  const handleSaveTransport = async () => {
    const transportData = {
      userid: parseInt(Cookies.get('userid')),
      from: transportDetails.from,
      to: transportDetails.to,
      mode: transportDetails.mode,
      fee: '500',
      destination,
      type: 'Local',
    };
    try {
      const response = await axios.post('http://localhost:8080/saveTransport', transportData);
      console.log(response.data);
      alert('Local transport booked successfully!');
      navigate('/saved-trip', {
        state: transportData[0]
      })
    } catch (error) {
      console.error(error.response.data);
    }
    console.log('Saved Transport Data:', transportData);
    // alert('Local transport booked successfully!');
    saveDataToCookies('savedData', transportData);
    navigate('/saved-trip', {
      state: transportData[0]
    })
    setShowTransportModal(false);
  };
  const handleSaveRestaurantMenu = async () => {
    if (!validateDeliveryForm()) {
      return;
    }
    var dishes = [];
    restaurantMenu.filter((item) => item.quantity > 0).map((item) => (
      dishes.push(
        {
          name: item.name,
          quantity: item.quantity,
        })
    ));
    const menuData = {
      userid: parseInt(Cookies.get('userid')),
      dishes: dishes,
      restaurantName: selectedRestaurant.name,
      destination,
      type: 'Restaurant',
      deliveryMode,
      toAddress: deliveryMode === "Delivery" ? toAddress : null,
      pickupLocation: deliveryMode === "Takeaway" ? pickupLocation : null,
      paymentMethod,
      upiId: paymentMethod === "UPI" ? upiId : null,
    };
    // const menuData = restaurantMenu.filter((item) => item.quantity > 0).map((item) => ({
    //   name: item.name,
    //   quantity: item.quantity,
    //   restaurantName: selectedRestaurant.name,
    //   destination,
    //   type: 'Restaurant',
    // }));
    try {
      const response = await axios.post('http://localhost:8080/saveRestaurant', menuData);
      console.log(response.data);
      alert('Payment done successfully. Restaurant order placed!');
      navigate('/saved-trip', {
        state: menuData[0]
      })
    } catch (error) {
      console.error(error.response.data);
    }
    console.log('Saved Restaurant Menu:', menuData);
    // menuData.forEach((item) => saveDataToCookies('savedData', item));
    navigate('/saved-trip', {
      state: menuData[0]
    })
    setShowRestaurantModal(false);
  };
  const handleSaveHotel = async () => {
    var bookings = []
    roomTypes.filter(room => room.quantity > 0).map(room => (
      bookings.push({
        roomtype: room.name,
        numberofrooms: room.quantity, // Assuming 1 room selection per type
      })
    ));
    const hotelData = {
      userid: parseInt(Cookies.get('userid')),
      hotelname: selectedHotel.name,
      bookings: bookings,
      destination,
      type: 'Hotel',
    }
    try {
      const response = await axios.post('http://localhost:8080/saveHotel', hotelData);
      console.log(response.data);
      alert('Hotel booking successful!');
      navigate('/saved-trip', {
        state: hotelData[0]
      })
    } catch (error) {
      console.error(error.response.data);
    }
    console.log('Saved Hotel Data:', hotelData);
    // hotelData.forEach((item) => saveDataToCookies('savedData', item));
    navigate('/saved-trip', {
      state: hotelData[0]
    })
    setShowHotelModal(false);
  };
  

  const calculateTotalPrice = () => {
    return roomTypes.reduce((total, room) => total + (room.price * room.quantity), 0);
  };

  if (!destination) {
    return <div>Please select a destination to explore.</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-left mb-4">Explore {destination}</h2>

      <Tabs defaultActiveKey="placesToVisit" id="explore-tabs" className="mb-3">
        {/* Tab for Places */}
        <Tab eventKey="placesToVisit" title="Top Places to Visit">
          <ListGroup>
            {data.placesToVisit.map((place, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={8}>
                    <strong>{place.name}</strong>
                    <p>{place.details}</p>
                  </Col>
                  <Col md={4}>
                    <p>Distance: {place.distance}</p>
                    <p>Status: {place.isOpen ? <Badge bg="success">Open</Badge> : <Badge bg="danger">Closed</Badge>}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>

        {/* Tab for Hotels */}
        <Tab eventKey="hotels" title="Top Hotels">
          <Row>
            {data.hotels.map((hotel, index) => (
              <Col md={4} key={index}>
                <Card className="mb-4 hotel-card" onClick={() => handleHotelClick(hotel)}>
                  <div className="hotel-image-container">
                    <Card.Img 
                      variant="top" 
                      src={hotel.image} 
                      className="hotel-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{hotel.name}</Card.Title>
                    <Card.Text>
                      <strong>Amenities:</strong> {hotel.amenities.join(", ")}
                    </Card.Text>
                    <Row>
                      <Col>
                        <p><strong>Price per Night:</strong> {hotel.pricePerNight}</p>
                      </Col>
                      <Col>
                        <p><strong>Time to Reach:</strong> {hotel.timeToReach}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* Tab for Restaurants */}
        <Tab eventKey="restaurants" title="Top Restaurants">
          <Row>
            {data.restaurants.map((restaurant, index) => (
              <Col md={4} key={index}>
                <Card className="mb-4 restaurant-card" onClick={() => handleRestaurantClick(restaurant)}>
                  <div className="restaurant-image-container">
                    <Card.Img 
                      variant="top" 
                      src={restaurant.image} 
                      className="restaurant-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>
                      <strong>Cuisine:</strong> {restaurant.cuisine}
                    </Card.Text>
                    <Row>
                      <Col>
                        <p><FaStar color="gold" /> {restaurant.rating}</p>
                      </Col>
                      <Col>
                        <p><FaDollarSign /> {restaurant.averagePrice} for two</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* Tab for Local Transport */}
        <Tab eventKey="localTransport" title="Local Transport" onClick={() => handleTransportClick()}>
          <ListGroup>
            {data.localTransport.map((transport, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={8}>
                    <FaTaxi /> {transport.name}
                    <p>Details: {transport.details}</p>
                  </Col>
                  <Col md={4}>
                    <p>Price per Hour: {transport.pricePerHour}</p>
                    <p>Available in: {transport.availableInMinutes} minutes</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>

      {/* <Modal show={showRestaurantModal} onHide={() => setShowRestaurantModal(false)} className="modal-styled">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRestaurant?.name} Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {restaurantMenu.map((item, index) => (
              <ListGroup.Item key={index} className="menu-item">
                <Row>
                  <Col md={8}>
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                  </Col>
                  <Col md={4} className="text-center">
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(index, -1, 'restaurant')}>-</Button>
                    <span className="quantity">{item.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(index, 1, 'restaurant')}>+</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRestaurantModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveRestaurantMenu}>Save</Button>
        </Modal.Footer>
      </Modal> */}
      <Modal show={showRestaurantModal} onHide={() => setShowRestaurantModal(false)} className="modal-styled">
  <Modal.Header closeButton>
    <Modal.Title>
      {/* {selectedRestaurant?.name} Menu */}
    {currentStep === "menu" ? "Select Menu" : "Delivery & Payment"}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {currentStep === "menu" && (
    <>
    <ListGroup>
      {restaurantMenu.map((item, index) => (
        <ListGroup.Item key={index} className="menu-item">
          <Row>
            <Col md={8}>
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ${item.price}</p>
            </Col>
            <Col md={4} className="text-center">
              <Button variant="outline-secondary" onClick={() => handleQuantityChange(index, -1, 'restaurant')}>-</Button>
              <span className="quantity">{item.quantity}</span>
              <Button variant="outline-secondary" onClick={() => handleQuantityChange(index, 1, 'restaurant')}>+</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
    <div className="total-cost">
      <h5 className="text-right">
        Total Cost: $
        {restaurantMenu.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </h5>
    </div>
    </>
  )}
  {currentStep === "delivery" && (
          <>
            <Form.Group>
              <Form.Label>Delivery Mode</Form.Label>
              <Form.Control
                as="select"
                value={deliveryMode}
                onChange={(e) => setDeliveryMode(e.target.value)}
                isInvalid={!!formErrors.deliveryMode}
                required
              >
                <option value="">Select...</option>
                <option value="Takeaway">Takeaway</option>
                <option value="Delivery">Delivery</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.deliveryMode}
              </Form.Control.Feedback>
            </Form.Group>

            {deliveryMode === "Takeaway" && (
              <Form.Group className="mt-3">
                <Form.Label>Select Pickup Location</Form.Label>
                {pickupLocationsData.map((location, index) => (
                  <div key={index} className="mb-3">
                    <Form.Check
                      type="radio"
                      id={`pickup-${index}`}
                      label={location.name}
                      name="pickupLocation"
                      value={location.name}
                      checked={pickupLocation === location.name}
                      onChange={() => handlePickupLocationChange(location.name, location.distance, location.time)}
                      className="mb-1"
                      isInvalid={!!formErrors.pickupLocation}
                      required
                    />
                    {pickupLocation === location.name && (
                      <div className="ml-4 text-muted small">
                        <div>Distance: {location.distance}</div>
                        <div>Estimated Time: {location.time}</div>
                      </div>
                    )}
                  </div>
                ))}
                {formErrors.pickupLocation && (
                  <div className="text-danger small">{formErrors.pickupLocation}</div>
                )}
              </Form.Group>
            )}

            {deliveryMode === "Delivery" && (
              <>
                <Form.Group>
                  <Form.Label>To Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    placeholder="Enter delivery address"
                    isInvalid={!!formErrors.toAddress}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.toAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}
{estimatedDistance && estimatedTime && (
              <div className="distance-time-estimation mt-3">
                <h6>Estimated Distance: {estimatedDistance}</h6>
                <h6>Estimated Time: {estimatedTime}</h6>
              </div>
            )}
            <Form.Group>
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                isInvalid={!!formErrors.paymentMethod}
                required
              >
                <option value="">Select...</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="UPI">UPI</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.paymentMethod}
              </Form.Control.Feedback>
            </Form.Group>

            {paymentMethod === "UPI" && (
              <Form.Group>
                <Form.Label>UPI ID</Form.Label>
                <Form.Control
                  type="text"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    setUpiError(validateUpiId(e.target.value));
                  }}
                  placeholder="Enter UPI ID (e.g., username@bankname)"
                  isInvalid={!!formErrors.upiId}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.upiId}
                </Form.Control.Feedback>
                {!formErrors.upiId && upiError && (
                  <div className="text-muted small mt-1">
                    Format: username@bankname (e.g., john@okicici)
                  </div>
                )}
              </Form.Group>
            )}
          </>
        )}
  </Modal.Body>
  <Modal.Footer>
  {currentStep === "menu" ? (
          <>
            <Button variant="secondary" onClick={() => setShowRestaurantModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setCurrentStep("delivery")}>
              Save & Continue
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setCurrentStep("menu")}>
              Back
            </Button>
            <Button variant="primary" onClick={handleSaveRestaurantMenu}>
              Proceed
            </Button>
          </>
        )}
    {/* <Button variant="secondary" onClick={() => setShowRestaurantModal(false)}>Close</Button>
    <Button variant="primary" onClick={handleSaveRestaurantMenu}>Save</Button> */}
  </Modal.Footer>
</Modal>


      {/* Hotel Room Modal */}
      <Modal show={showHotelModal} onHide={() => setShowHotelModal(false)} className="modal-styled">
        <Modal.Header closeButton>
          <Modal.Title className="h5">{selectedHotel?.name} Rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {roomTypes.map((room, index) => (
              <ListGroup.Item key={index} className="room-item">
                <Row>
                  <Col md={8}>
                    <h5>{room.name}</h5>
                    <p>{room.description}</p>
                  </Col>
                  <Col md={4} className="text-center">
                    <p><strong>Price:</strong> ${room.price}</p>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(index, -1, 'hotel')}>-</Button>
                    <span className="quantity">{room.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(index, 1, 'hotel')}>+</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}><strong>Total Price:</strong> ${calculateTotalPrice()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHotelModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveHotel}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Local Transport Modal */}
      <Modal show={showTransportModal} onHide={() => setShowTransportModal(false)} className="modal-styled">
        <Modal.Header closeButton>
          <Modal.Title>Local Transport</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="from">
              <div className="row" style={{ padding: '7px 7px 0 7px' }}>
                <div className="col-md-4">
                  <Form.Label>From</Form.Label>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    type="text"
                    name="from"
                    value={transportDetails.from}
                    onChange={handleTransportChange}
                    placeholder="Enter departure location"
                    className="input-field"
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="to">
              <div className="row" style={{ padding: '7px 7px 0 7px' }}>
                <div className="col-md-4">
                  <Form.Label>To</Form.Label>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    type="text"
                    name="to"
                    value={transportDetails.to}
                    onChange={handleTransportChange}
                    placeholder="Enter destination location"
                    className="input-field"
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="mode">
              <div className="row" style={{ padding: '7px 7px 0 7px' }}>
                <div className="col-md-4">
                  <Form.Label>Mode of Transport</Form.Label>
                </div>
                <div className="col-md-8">
                  <Form.Control as="select" name="mode" value={transportDetails.mode} onChange={handleTransportChange} className="input-field">
                    <option value="">Select Mode</option>
                    <option value="bike">Bike</option>
                    <option value="auto">Auto</option>
                    <option value="cab-mini">Cab (Mini)</option>
                    <option value="cab-big">Cab (Big)</option>
                  </Form.Control>
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="fee">
              <div className="row" style={{ padding: '7px 7px 0 7px' }}>
                <div className="col-md-4">
                  <Form.Label>Ride Fee</Form.Label>
                </div>
                <div className="col-md-8">
                  <Form.Control
                    type="text"
                    name="fee"
                    value="Rs. 100"
                    readOnly
                    className="fee-static"
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTransportModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveTransport}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExploreDestination;