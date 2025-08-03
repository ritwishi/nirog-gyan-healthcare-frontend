import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "../../styles/components/DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const { setSelectedDoctor } = useAppContext();

  const getAvailabilityClass = (availability) => {
    switch (availability) {
      case "Available Today":
        return "status-available";
      case "Fully Booked":
        return "status-booked";
      case "On Leave":
        return "status-leave";
      default:
        return "status-available";
    }
  };

  const handleDoctorSelect = () => {
    setSelectedDoctor(doctor);
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className="star filled"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="star half"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2v15.27z" />
        </svg>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="star empty"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-header">
        <div className="doctor-image">
          <img src={doctor.image} alt={doctor.name} />
          <div
            className={`availability-indicator ${getAvailabilityClass(doctor.availability)}`}
          >
            <span className="indicator-dot"></span>
          </div>
        </div>

        <div className="doctor-basic-info">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialty">{doctor.specialization}</p>
          <div className="doctor-rating">
            <div className="stars">
              {renderRatingStars(doctor.rating || 4.5)}
            </div>
            <span className="rating-text">
              {doctor.rating || 4.5} ({doctor.reviewCount || 0} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="doctor-card-body">
        <div className="doctor-details">
          <div className="detail-item">
            <span className="detail-label">Experience:</span>
            <span className="detail-value">{doctor.experience}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Consultation Fee:</span>
            <span className="detail-value fee">${doctor.fee || 200}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Hospital:</span>
            <span className="detail-value">
              {doctor.hospital || "Medical Center"}
            </span>
          </div>
        </div>

        <div
          className={`availability-status ${getAvailabilityClass(doctor.availability)}`}
        >
          <span className="status-icon">
            {doctor.availability === "Available Today" && "✓"}
            {doctor.availability === "Fully Booked" && "⚠"}
            {doctor.availability === "On Leave" && "✕"}
          </span>
          {doctor.availability}
        </div>
      </div>

      <div className="doctor-card-footer">
        <Link
          to={`/doctor/${doctor.id}`}
          className="btn btn-outline"
          onClick={handleDoctorSelect}
        >
          View Profile
        </Link>

        {doctor.availability === "Available Today" && (
          <Link
            to={`/book/${doctor.id}`}
            className="btn btn-primary"
            onClick={handleDoctorSelect}
          >
            Book Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
