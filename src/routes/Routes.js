import Addproducts from "../pages/Add products/Addproducts";
import Cartpage from "../pages/Cartpage/Cartpage";
import Displayproducts from "../pages/Displayproducts/Displayproducts";
import { Routes, Route, Navigate } from "react-router-dom";

export const RouterManagement = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Addproducts />} />
        <Route path="/displayProduct" element={<Displayproducts />} />
        <Route path="/cartItems" element={<Cartpage />} />
      </Routes>
    </>
  );
};
