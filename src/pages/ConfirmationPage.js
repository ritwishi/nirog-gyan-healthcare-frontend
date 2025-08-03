import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/pages/ConfirmationPage.css";

const ConfirmationPage = () => {
  const { bookingData } = useAppContext();

  if (!bookingData.patientName) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="error-message">
            <h2>No booking information found</h2>
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="success-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="var(--success-500)" />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1>Appointment Confirmed!</h1>
          <p className="success-message">
            Your appointment has been successfully booked. You will receive a
            confirmation email shortly.
          </p>

          <div className="appointment-details">
            <h2>Appointment Details</h2>

            <div className="detail-row">
              <strong>Patient Name:</strong>
              <span>{bookingData.patientName}</span>
            </div>

            <div className="detail-row">
              <strong>Email:</strong>
              <span>{bookingData.email}</span>
            </div>

            <div className="detail-row">
              <strong>Phone:</strong>
              <span>{bookingData.phone}</span>
            </div>

            <div className="detail-row">
              <strong>Doctor:</strong>
              <span>{bookingData.doctorName}</span>
            </div>

            <div className="detail-row">
              <strong>Date:</strong>
              <span>
                {new Date(bookingData.selectedDate).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>

            <div className="detail-row">
              <strong>Time:</strong>
              <span>{bookingData.selectedTime}</span>
            </div>

            <div className="detail-row">
              <strong>Status:</strong>
              <span className="status-confirmed">Confirmed</span>
            </div>

            {bookingData.notes && (
              <div className="detail-row">
                <strong>Notes:</strong>
                <span>{bookingData.notes}</span>
              </div>
            )}
          </div>

          <div className="important-notes">
            <h3>Important Notes:</h3>
            <ul>
              <li>Please arrive 15 minutes before your appointment time</li>
              <li>Bring a valid ID and insurance card</li>
              <li>
                You can reschedule or cancel up to 24 hours before your
                appointment
              </li>
              <li>
                A confirmation email has been sent to your registered email
                address
              </li>
            </ul>
          </div>

          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary"
            >
              Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
