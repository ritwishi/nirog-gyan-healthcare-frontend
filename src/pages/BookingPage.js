import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/pages/BookingPage.css";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBookingData, addAppointment } = useAppContext();

  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    selectedDate: "",
    selectedTime: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock doctor data wrapped in useMemo
  const mockDoctor = useMemo(
    () => ({
      id: parseInt(id),
      name: "Dr. Neha Sharma",
      specialization: "Cardiology",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      fee: "₹1200",
    }),
    [id]
  );

  useEffect(() => {
    setDoctor(mockDoctor);
  }, [mockDoctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.selectedDate) {
      newErrors.selectedDate = "Please select a date";
    }

    if (!formData.selectedTime) {
      newErrors.selectedTime = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const appointment = {
        ...formData,
        doctorId: doctor.id,
        doctorName: doctor.name,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      addAppointment(appointment);
      setBookingData(appointment);

      setIsSubmitting(false);
      navigate("/confirmation");
    }, 1500);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 2);
    return maxDate.toISOString().split("T")[0];
  };

  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading booking form...</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1>Book Appointment</h1>
          <div className="doctor-info">
            <img src={doctor.image} alt={doctor.name} />
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>Fee: {doctor.fee}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="patientName" className="form-label">
              Patient Name *
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className={`form-input ${errors.patientName ? "form-error" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.patientName && (
              <span className="error-message">{errors.patientName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? "form-error" : ""}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${errors.phone ? "form-error" : ""}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="selectedDate" className="form-label">
              Appointment Date *
            </label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={formData.selectedDate}
              onChange={handleInputChange}
              className={`form-input ${errors.selectedDate ? "form-error" : ""}`}
              min={getMinDate()}
              max={getMaxDate()}
            />
            {errors.selectedDate && (
              <span className="error-message">{errors.selectedDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="selectedTime" className="form-label">
              Available Time Slots *
            </label>
            <select
              id="selectedTime"
              name="selectedTime"
              value={formData.selectedTime}
              onChange={handleInputChange}
              className={`form-select ${errors.selectedTime ? "form-error" : ""}`}
            >
              <option value="">Select a time slot</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
            </select>
            {errors.selectedTime && (
              <span className="error-message">{errors.selectedTime}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Any specific concerns or notes for the doctor"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Booking...
                </>
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
