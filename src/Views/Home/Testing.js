import React, { useEffect, useState } from "react";
import axios from "axios";

const Testing = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("api name")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {products &&
        products.map((prod) => (
          <div className="container">
            <div className="row hidden-md-up">
              <div className="col md-9">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    class="card-img-top"
                    src={prod.image}
                    alt="Card image cap"
                  />

                  <div className="card-block-white bg-success mb-3">
                    <h4 className="card-title">
                      <center>{prod.id}</center>
                    </h4>
                    <li className="card-text">{prod.price}</li>
                    <li className="card-text">{prod.rating.rate}</li>
                    <li className="card-text">{prod.category}</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Testing;
