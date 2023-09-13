import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { GetPostFromCart } from "../../Api/postRequest";
import { getPosts } from "../../Api/postRequest";
import Cart from "../../components/Cart/Cart";

function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await GetPostFromCart();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const value = await getPosts();
        setProducts(value);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCartItems();
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   GetPostFromCart()
  //     .then((data) => {
  //       setCartItems(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [cartItems]);
  // useEffect(() => {
  //   getPosts()
  //     .then((value) => {
  //       setProducts(value);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [products]);
  return (
    <div>
      <TopNav />
      <div className="cartItems">
        <Cart cartItems={cartItems.data} products={products.data} />
      </div>
    </div>
  );
}

export default Cartpage;
