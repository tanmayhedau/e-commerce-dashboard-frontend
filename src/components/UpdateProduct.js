import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`${BASE_URL}/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleUpdateProduct = async () => {
    let result = await fetch(`${BASE_URL}/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="appButton" onClick={handleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
