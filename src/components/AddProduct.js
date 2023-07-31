import React, { useState } from "react";
import { BASE_URL } from "../services/helper";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`${BASE_URL}/addproduct`, {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button className="appButton" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
