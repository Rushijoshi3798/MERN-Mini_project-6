import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "50px",
        background: "#bae3f3",
        padding: "30px",
      }}>
      <Link to="/">Add New Users</Link>
      <Link to="/users">See All Users</Link>
    </div>
  );
};

export default Navbar;
