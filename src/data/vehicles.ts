
import { VehicleProps } from "@/components/VehicleCard";

export const vehicles: VehicleProps[] = [
  {
    id: "v1",
    name: "Toyota Land Cruiser",
    type: "4x4",
    price: 80,
    pricePerDay: 80,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    image: "/placeholder.svg",
    features: ["Climatisation", "GPS", "Bluetooth", "Toit ouvrant"],
    availability: true
  },
  {
    id: "v2",
    name: "Hyundai i10",
    type: "car",
    price: 35,
    pricePerDay: 35,
    seats: 4,
    transmission: "Manual",
    fuelType: "Essence",
    image: "/placeholder.svg",
    features: ["Économique", "Facile à conduire", "Idéal pour la ville"],
    availability: true
  },
  {
    id: "v3",
    name: "Yamaha XT660",
    type: "motorcycle",
    price: 45,
    pricePerDay: 45,
    seats: 2,
    transmission: "Manual",
    fuelType: "Essence",
    image: "/placeholder.svg",
    features: ["Trail", "Tout terrain", "Légère"],
    availability: true
  }
];
