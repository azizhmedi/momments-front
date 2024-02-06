import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
function PublicNavbar() {
  return (
    <div className="public-nav-container">
      <h1>
        <NavLink
          to="/"
          style={({ isActive }) => {
            return {
              all: "unset",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              cursor: "pointer",
            };
          }}
        >
          BLOG-APP
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink
            to="/login"
            style={({ isActive }) => {
                return {
                  all: "unset",
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "red" : "black",
                  cursor: "pointer",
                };
            }}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            style={({ isActive }) => {
                return {
                  all: "unset",
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "red" : "black",
                  cursor: "pointer",
                };
            }}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PublicNavbar;
