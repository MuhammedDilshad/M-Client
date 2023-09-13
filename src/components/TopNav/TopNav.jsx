import React from "react";
import "./TopNav.css";
import { useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();
  return (
    <div className="TopNav">
      <strong onClick={() => navigate("/addProducts")}>Add Product</strong>
      <strong onClick={() => navigate("/displayProduct")}>
        Display Product
      </strong>
      <strong onClick={() => navigate("/cartItems")}>Cart Page</strong>
    </div>
  );
}

export default TopNav;
