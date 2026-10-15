export default function Cart({ items, onAdd, onRemove, onContinue, onClear }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="cart-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="eyebrow mb-1">YOUR BAG</p>
          <h1 className="section-title mb-1">Shopping Cart</h1>
          <p className="muted mb-0">{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
        </div>
        <button className="text-button" onClick={onContinue}><i className="bi bi-arrow-left me-2"></i>Continue shopping</button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon"><i className="bi bi-bag"></i></div>
          <h2>Your cart is empty</h2>
          <p className="muted">Looks like you haven't added anything yet.</p>
          <button className="primary-button" onClick={onContinue}>Explore products</button>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} onError={(event) => { event.currentTarget.src = "https://placehold.co/160x160/f4f4f5/555?text=Product"; }} />
                  <div className="cart-item-info">
                    <p className="product-category mb-1">{item.category}</p>
                    <h3>{item.name}</h3>
                    <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                    <div className="quantity-control cart-quantity">
                      <button onClick={() => onRemove(item.id)} aria-label="Decrease quantity"><i className="bi bi-dash"></i></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onAdd(item)} aria-label="Increase quantity"><i className="bi bi-plus"></i></button>
                    </div>
                  </div>
                  <strong className="line-total">₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                </div>
              ))}
              <button className="text-button clear-cart" onClick={onClear}><i className="bi bi-trash3 me-2"></i>Clear cart</button>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="order-summary">
              <h2>Order summary</h2>
              <div className="summary-line"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              <div className="summary-line"><span>Delivery</span><span className="free-delivery">FREE</span></div>
              <div className="summary-line"><span>Tax</span><span>Included</span></div>
              <hr />
              <div className="summary-line summary-total"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              <button className="primary-button w-100 mt-3" onClick={() => window.alert("Demo project: checkout is not connected yet.")}>Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i></button>
              <p className="secure-note"><i className="bi bi-shield-check me-2"></i>Safe and secure checkout</p>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}