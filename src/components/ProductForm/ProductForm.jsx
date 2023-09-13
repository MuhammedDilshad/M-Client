import React, { useState } from "react";
import { uploadImage, uploadPost } from "../../Api/postRequest";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";

function ProductForm() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    productName: "",
    productPrice: "",
    productQuantity: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      productName: data.productName,
      productPrice: data.productPrice,
      productQuantity: data.productQuantity,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("image", image);
      newData.image = filename;
      try {
        uploadImage(data);
      } catch (error) {
        console.log(error);
      }
      uploadPost(newData);
    }
    reset();
    navigate("/displayProduct");
  };
  return (
    <div className="ProductFormContainer">
      <div className="ProductForm">
        <form onSubmit={handleSubmit}>
          <div className="InputItems">
            <label htmlFor="productImage">Image:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              onChange={onImageChange}
              required
            />
          </div>
          <div className="InputItems">
            <label htmlFor="productName">Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              onChange={handleChange}
              value={data.productName}
              required
            />
          </div>
          <div className="InputItems">
            <label htmlFor="productPrice">Price:</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              onChange={handleChange}
              value={data.productPrice}
              required
            />
          </div>
          <div className="InputItems">
            <label htmlFor="productQuantity">Quantity:</label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              onChange={handleChange}
              value={data.productQuantity}
              required
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
