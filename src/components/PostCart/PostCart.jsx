import React from "react";
import { addToCart } from "../../Api/postRequest";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Swal from "sweetalert2";

import "./PostCart.css";

function PostCart(data) {
  const { productName, image, _id, productQuantity } = data.data;
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic = "https://m-backend-mzrt.onrender.com/images/";

  const addToTheCart = (postId) => {
    if (productQuantity > 0) {
      console.log(postId, "postidqqq");
      Swal.fire({
        title: "Thanks for adding the product to the cart!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      addToCart(postId);
    } else {
      Swal.fire({
        title: "Product Out of Stock",
        text: "Sorry, this product is currently out of stock.",
        icon: "error",
      });
    }
  };
  return (
    <div className="card-container">
      <div className="cat">
        <img className="postImages" src={`${serverPublic}/${image}`} alt="" />
        <h1 className="posthOne">
          {productName}
          <AiOutlineShoppingCart
            className="addtoCart"
            onClick={() => addToTheCart(_id)}
          />
        </h1>
      </div>
    </div>
  );
}

export default PostCart;
