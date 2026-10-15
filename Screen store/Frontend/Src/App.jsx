
import { useEffect, useState } from "react";
import { api } from "./api.js";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api("/products")
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-3" key={product._id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>₹{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
