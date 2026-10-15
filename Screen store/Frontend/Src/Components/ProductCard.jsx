export default function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <article className="product-card h-100">
      <div className="product-image-wrap">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className="wishlist-button" aria-label={`Add ${product.name} to wishlist`} onClick={(e) => e.currentTarget.classList.toggle("is-liked")}>
          <i className="bi bi-heart"></i>
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(event) => { event.currentTarget.src = "https://placehold.co/600x600/f4f4f5/555?text=Screen+Store"; }}
        />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h2 className="product-name">{product.name}</h2>
        <div className="product-rating"><i className="bi bi-star-fill"></i> {product.rating} <span>(customer rating)</span></div>
        <div className="price-row">
          <span className="product-price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="old-price">₹{product.oldPrice.toLocaleString("en-IN")}</span>
        </div>
        {quantity > 0 ? (
          <div className="quantity-control">
            <button onClick={() => onRemove(product.id)} aria-label="Decrease quantity"><i className="bi bi-dash"></i></button>
            <span>{quantity} in cart</span>
            <button onClick={() => onAdd(product)} aria-label="Increase quantity"><i className="bi bi-plus"></i></button>
          </div>
        ) : (
          <button className="add-button" onClick={() => onAdd(product)}>
            <i className="bi bi-bag-plus me-2"></i>Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}