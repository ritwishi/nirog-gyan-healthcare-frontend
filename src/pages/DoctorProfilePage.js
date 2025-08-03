import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/pages/DoctorProfile.css";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedDoctor } = useAppContext();

  // Mock doctor data wrapped in useMemo
  const mockDoctor = useMemo(
    () => ({
      id: parseInt(id),
      name: "Dr. Neha Sharma",
      specialization: "Cardiology",
      experience: "15 years",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      bio: "Dr. Neha Sharma is a renowned cardiologist in India with 15 years of experience in treating heart conditions. She specializes in preventive cardiology and interventional procedures.",
      fee: "₹1200",
      schedule: {
        Monday: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
        Tuesday: ["9:00 AM", "11:00 AM", "1:00 PM", "4:00 PM"],
        Wednesday: ["10:00 AM", "2:00 PM", "3:00 PM"],
        Thursday: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"],
        Friday: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
      },
    }),
    [id]
  );

  useEffect(() => {
    setTimeout(() => {
      setDoctor(mockDoctor);
      setSelectedDoctor(mockDoctor);
      setLoading(false);
    }, 1000);
  }, [mockDoctor, setSelectedDoctor]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="error-container">
        <h2>Doctor not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const availableDays = Object.entries(doctor.schedule).filter(
    ([day, slots]) => slots.length > 0
  );

  return (
    <div className="doctor-profile">
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to Doctors
        </Link>

        <div className="profile-header">
          <div className="doctor-image">
            <img src={doctor.image} alt={doctor.name} />
          </div>

          <div className="doctor-details">
            <h1>{doctor.name}</h1>
            <p className="specialization">{doctor.specialization}</p>
            <p className="experience">{doctor.experience} of experience</p>
            <p className="fee">Consultation Fee: {doctor.fee}</p>

            <div className="availability-badge available">
              {doctor.availability}
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="about-section">
            <h2>About Dr. {doctor.name.split(" ")[1]}</h2>
            <p>{doctor.bio}</p>
          </div>

          <div className="schedule-section">
            <h2>Available Schedule</h2>
            {availableDays.length === 0 ? (
              <p className="no-schedule">Currently no available slots</p>
            ) : (
              <div className="schedule-grid">
                {availableDays.map(([day, slots]) => (
                  <div key={day} className="day-schedule">
                    <h3>{day}</h3>
                    <div className="time-slots">
                      {slots.map((slot) => (
                        <span key={slot} className="time-slot">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {doctor.availability === "Available Today" && (
            <div className="booking-section">
              <Link
                to={`/book/${doctor.id}`}
                className="btn btn-primary btn-large"
              >
                Book Appointment
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
