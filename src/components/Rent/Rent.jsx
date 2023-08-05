import React, { useState } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import propertiesData from "../../Data";
import "./Rent.css";

export default function Rent() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [rentRange, setRentRange] = useState([0, 5000]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

  const handleLocationChange = (event) => {
    const inputValue = event.target.value;
    setSelectedLocation(inputValue);

    if (inputValue === "") {
      setLocationSuggestions([]);
    } else {
      var filteredSuggestions = propertiesData.filter((property) =>
        property.location.toLowerCase().includes(inputValue.toLowerCase())
      );
      filteredSuggestions = filteredSuggestions.map((property) =>
        property.location.split(", ").slice(1).join(" ")
      );
      filteredSuggestions = [...new Set(filteredSuggestions)];
      setLocationSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setLocationSuggestions([]);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleRentPriceChange = (value) => {
    setRentRange([rentRange[0], value]);
  };

  const getUniquePropertyTypes = () => {
    const uniqueTypes = [
      ...new Set(propertiesData.map((property) => property.propertyType)),
    ];
    return uniqueTypes;
  };

  const handleSearch = () => {
    const filteredProperties = propertiesData.filter((property) => {
      const locationMatch =
        selectedLocation === "" ||
        property.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());

      const dateMatch = selectedDate === "" || property.date === selectedDate;

      const rentMatch =
        property.rent >= rentRange[0] && property.rent <= rentRange[1];

      const propertyTypeMatch =
        selectedPropertyType === "" ||
        property.propertyType === selectedPropertyType;

      return locationMatch && dateMatch && rentMatch && propertyTypeMatch;
    });

    filteredProperties.sort(function (first, second) {
      return first.rent - second.rent;
    });
    setFilteredProperties(filteredProperties);
  };

  /*const calculateAdjustedPrice = () => {
    const maxRent = Math.max(
      ...propertiesData.map((property) => property.rent)
    );
    const minRent = Math.min(
      ...propertiesData.map((property) => property.rent)
    );

    return [minRent, maxRent];
  };*/

  return (
    <>
      <div className="rent">
        <div className="rent-container">
          <div className="rent-row-1">
            <h1>Search properties to rent</h1>
            <div className="search">
              <input type="text" value="" placeholder="Search here" />
              <div className="search-items">
                <div className="item">A</div>
                <div className="item">B</div>
                <div className="item">C</div>
                <div className="item">D</div>
                <div className="item">E</div>
              </div>
            </div>
          </div>
          <div className="rent-row-2">
            <div className="rent-col">
              <label>Location</label>
              <br />
              <div className="select">
                <input
                  type="text"
                  placeholder="Search Location"
                  id="location-input"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                />
                <ul>
                  {locationSuggestions.map((propertyLocation, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(propertyLocation)}
                    >
                      {propertyLocation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rent-col">
              <label>When</label>
              <br />
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: selectedDate ? "black" : "",
                }}
              >
                {selectedDate ? <>{selectedDate}</> : <>Select Move-in-Date</>}
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </span>
            </div>
            <div className="rent-col">
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label>Rent Range</label>
                <label style={{ marginRight: "15px" }}>
                  ${rentRange[0]} - ${rentRange[1]}
                </label>
              </label>
              <br />
              <Slider
                min={0}
                max={5000}
                value={rentRange[1]}
                onChange={handleRentPriceChange}
                className="slider"
                style={{ width: "93%" }}
              />
            </div>
            <div className="rent-col">
              <label>Property Type</label>
              <br />
              <span>
                <span>
                  <select
                    className="styled-select"
                    value={selectedPropertyType}
                    onChange={(e) => setSelectedPropertyType(e.target.value)}
                  >
                    <option value="">Select Property</option>
                    {getUniquePropertyTypes().map((propertyType, index) => (
                      <option key={index} value={propertyType}>
                        {propertyType}
                      </option>
                    ))}
                  </select>
                </span>
              </span>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="rent-row-3">
            {filteredProperties.map((property, index) => (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src={property.image} alt={property.name} />
                </div>
                <div className="card-content">
                  <span>${property.rent}</span>
                  <p>/month</p>
                  <br />
                  <h2>{property.name}</h2>
                  <br />
                  <p>{property.location}</p>
                  <hr />
                  <div className="card-footer">
                    <p>
                      <FaBed />
                      {property.bedrooms} Beds
                    </p>
                    <p>
                      <FaBath />
                      {property.bathrooms} Bathrooms
                    </p>
                    <p>Size: {property.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
