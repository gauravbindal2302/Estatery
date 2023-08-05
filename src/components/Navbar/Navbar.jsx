import React from "react";
import { FaEnvelopeOpen } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <div className="left">
            <div className="logo">
              <FaEnvelopeOpen className="logo-icon" /> <a href="/">Estatery</a>
            </div>
            <div className="navigation">
              <ul>
                <li>Rent</li>
                <li>Buy</li>
                <li>Sell</li>
                <li>
                  <div className="custom-dropdown">
                    <span>Manage Property</span>
                    <div className="custom-options">
                      <div className="option">Residential</div>
                      <div className="option">Commercial</div>
                      <div className="option">Industrial</div>
                      <div className="option">Raw Land</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="custom-dropdown">
                    <span>Resources</span>
                    <div className="custom-options">
                      <div className="option">Internet</div>
                      <div className="option">Brokers</div>
                      <div className="option">Landlords</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="login-and-register">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
