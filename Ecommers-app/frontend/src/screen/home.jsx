import React from "react";

export default function home() {
  return (
    <div className="container">
      <div className="p-3">
        <div className="d-flex justify-content-between my-3">
          <h2>All cards items...</h2>
          <h3 id="total-price">Total: 2311/-</h3>
        </div>
        <div
          id="cart-div"
          className="d-flex flex-column align-items-center p-3"
        />
      </div>
    </div>
  );
}
