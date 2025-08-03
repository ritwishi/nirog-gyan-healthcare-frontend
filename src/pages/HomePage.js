import React, { useState, useEffect } from "react";
import DoctorCard from "../components/doctor/DoctorCard";
import { SPECIALIZATIONS } from "../utils/constants";
import "../styles/pages/HomePage.css";

// Mock data for development
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: "12 years",
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    fee: "$200",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Dermatology",
    experience: "8 years",
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    fee: "$150",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Neurology",
    experience: "15 years",
    availability: "Fully Booked",
    image:
      "https://images.unsplash.com/photo-1594824475337-af8a7c50b2ba?w=300&h=300&fit=crop&crop=face",
    fee: "$250",
  },
  {
    id: 4,
    name: "Dr. David Kumar",
    specialization: "Orthopedics",
    experience: "10 years",
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    fee: "$180",
  },
];

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setDoctors(mockDoctors);
      setFilteredDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== "All") {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === selectedSpecialization
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialization]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="container">
        <div className="hero-section">
          <h1>Find & Book Appointments with Top Doctors</h1>
          <p>
            Connect with qualified healthcare professionals and book your
            appointments easily
          </p>
        </div>

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="specialization-select"
            >
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="results-section">
          <h2>Available Doctors ({filteredDoctors.length})</h2>

          {filteredDoctors.length === 0 ? (
            <div className="no-results">
              <p>No doctors found matching your criteria.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
