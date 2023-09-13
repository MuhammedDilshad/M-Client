import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { deletePost, addToCart, clearPost } from "../../Api/postRequest";
// import { addToCart } from "../../Api/postRequest";
// import { getPosts } from "../../Api/postRequest";

import Swal from "sweetalert2";
import "./Cart.css";

function Cart({ cartItems, products }) {
  const [productQuantities, setProductQuantities] = useState({});
  const [productTotals, setProductTotals] = useState({});
  const [cartItemList, setCartItemList] = useState([]);

  // const [refreshedRows, setRefreshedRows] = useState([]);

  console.log(cartItems, products, "ahsdgaukwgyedukwy");
  const [modalOpened, setModalOpened] = useState(false);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const newProductQuantities = {};
    const newProductTotals = {};

    cartItems?.forEach((item) => {
      newProductQuantities[item.productId] = item.quantity;
      newProductTotals[item.productId] = item.totel;
    });

    setProductQuantities(newProductQuantities);
    setProductTotals(newProductTotals);
    setCartItemList(cartItems);
  }, [cartItems]);

  const handleModal = () => {
    setModalOpened(true);
  };

  const addToTheCart = (postId) => {
    const product = products.find((item) => item._id === postId);

    console.log(product, "product");

    if (product.productQuantity > 0) {
      addToCart(postId)
        .then(() => {
          setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [postId]: (prevQuantities[postId] || 0) + 1,
          }));

          setProductTotals((prevTotals) => ({
            ...prevTotals,
            [postId]:
              (prevTotals[postId] || 0) + parseInt(product.productPrice),
          }));

          Swal.fire({
            title: "Thanks for adding the product to the cart!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      Swal.fire({
        title: "Product Out of Stock",
        text: "Sorry, this product is currently out of stock.",
        icon: "error",
      });
    }
  };
  const handleDelete = (postId) => {
    const product = cartItems.find((item) => item.productId === postId);

    console.log(product, "cartItemsidddddd");

    console.log(postId, "idddddd");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(postId);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [postId]: (prevQuantities[postId] || 0) - 1,
      }));

      setProductTotals((prevTotals) => ({
        ...prevTotals,
        [postId]: (prevTotals[postId] || 0) - parseInt(product.price),
      }));
    });
    setModalOpened(false);
  };
  const handleClear = (postId) => {
    const product = cartItems.find((item) => item.productId === postId);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear the quantity of this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearPost(postId);

        const updatedCartItemList = cartItemList.filter(
          (item) => item.productId !== postId
        );
        setCartItemList(updatedCartItemList);

        Swal.fire(
          "Cleared!",
          "The quantity of this product has been cleared.",
          "success"
        );
      }
    });
    setModalOpened(false);
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th className="productName">Product</th>
            <th className="Quantity">Quantity</th>
            <th>Image</th>
            <th>Totel</th>
            <th>To Cart</th>
            <th>Delete</th>
            <th>Clear</th>
          </tr>
        </thead>
        <tbody>
          {cartItemList
            ?.filter((item) => productQuantities[item.productId] > 0)
            .map((item) => {
              const { productId, productName, price, quantity, image, totel } =
                item;
              return (
                <tr key={productId}>
                  <td className="productName">{productName}</td>
                  {/* <td>{price}</td> */}
                  {/* <td>{quantity}</td> */}
                  <td>{productQuantities[productId]}</td>
                  <td>
                    <img
                      className="img"
                      src={serverPublic + "/" + image}
                      alt={productName}
                    />
                  </td>
                  {/* <td>{totel}</td> */}
                  <td>{productTotals[productId]}</td>

                  <td>
                    <AiOutlineShoppingCart
                      onClick={() => addToTheCart(productId)}
                      className="cartIcon"
                    />
                  </td>
                  <td>
                    <RiDeleteBin6Line
                      onClick={() => handleDelete(productId)}
                      className="cart-button"
                    />
                    {/* <button className="cart-button">Clear Cart</button> */}
                    {/* <button className="cart-button">Delete</button> */}
                  </td>
                  <td>
                    <button
                      className="cart-button"
                      onClick={() => handleClear(productId)}
                    >
                      clear
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
