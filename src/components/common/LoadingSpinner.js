import React from "react";
import "../../styles/components/LoadingSpinner.css";

const LoadingSpinner = ({
  size = "medium",
  message = "Loading...",
  fullScreen = false,
}) => {
  const sizeClass = `spinner-${size}`;

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className={`spinner ${sizeClass}`}>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          {message && <p className="loading-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClass}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={`skeleton skeleton-${type}`}>
      {type === "card" && (
        <>
          <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-info">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-subtitle"></div>
            </div>
          </div>
          <div className="skeleton-body">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-half"></div>
          </div>
        </>
      )}
      {type === "list" && (
        <>
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line skeleton-half"></div>
        </>
      )}
    </div>
  ));

  return <div className="skeleton-container">{skeletons}</div>;
};

export default LoadingSpinner;
