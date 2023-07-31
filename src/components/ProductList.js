import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${BASE_URL}/products`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  const handleDeleteProduct = async (id) => {
    let result = await fetch(`${BASE_URL}/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product deleted");
      getProducts();
    }
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${BASE_URL}/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h1>Product list</h1>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search product here"
        onChange={handleSearch}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button
                className="deleteButton"
                onClick={() => handleDeleteProduct(item._id)}>
                Delete
              </button>
              <Link to={`/update/${item._id}`} className="updateButton">
                Update
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No result found</h1>
      )}
    </div>
  );
};

export default ProductList;
