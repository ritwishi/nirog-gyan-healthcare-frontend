import React, { useState, useEffect } from "react";
import { SPECIALIZATIONS } from "../../utils/constants";
import "../../styles/components/SearchBar.css";

const SearchBar = ({
  onSearchChange,
  onSpecializationChange,
  searchTerm = "",
  selectedSpecialization = "All",
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, onSearchChange]);

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="search-section">
      <div className="search-container">
        {/* Search Input */}
        <div
          className={`search-input-wrapper ${isSearchFocused ? "focused" : ""}`}
        >
          <div className="search-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search doctors by name, specialty, or hospital..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="search-input"
          />

          {localSearchTerm && (
            <button
              className="clear-search-btn"
              onClick={handleClearSearch}
              type="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Specialization Filter */}
        <div className="filter-wrapper">
          <div className="filter-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
            </svg>
          </div>

          <select
            value={selectedSpecialization}
            onChange={(e) => onSpecializationChange(e.target.value)}
            className="specialization-select"
          >
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>
                {spec === "All" ? "All Specializations" : spec}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button className="search-btn" type="button">
          <span>Search</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>

      {/* Quick Filters */}
      <div className="quick-filters">
        <span className="quick-filters-label">Quick Filters:</span>
        <div className="filter-tags">
          {["Available Today", "Highly Rated", "Nearby", "Emergency"].map(
            (filter) => (
              <button key={filter} className="filter-tag">
                {filter}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
