import { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Cart from "./components/Cart.jsx";
import { products } from "./data/products.js";

const categories = ["All", "Clothing", "Shoes", "Electronics", "Accessories", "Beauty"];

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(searchTerm);
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((current) => current
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0));
  }

  function goHome() {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        onCartClick={() => { setPage("cart"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onHomeClick={goHome}
      />

      <main className="container store-container">
        {page === "cart" ? (
          <Cart
            items={cart}
            onAdd={addToCart}
            onRemove={removeFromCart}
            onContinue={goHome}
            onClear={() => setCart([])}
          />
        ) : (
          <>
            <section className="hero-section">
              <div className="hero-copy">
                <span className="hero-pill"><i className="bi bi-stars me-2"></i>YOUR EVERYDAY STORE</span>
                <h1>Find your next<br /><span>favourite thing.</span></h1>
                <p>Everyday essentials, cool accessories, and little upgrades that make life better.</p>
                <button className="primary-button hero-button" onClick={() => document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth" })}>
                  Shop collection <i className="bi bi-arrow-down-right ms-2"></i>
                </button>
              </div>
              <div className="hero-art" aria-label="Shopping illustration">
                <div className="hero-circle"></div>
                <div className="floating-card card-one"><i className="bi bi-bag-heart"></i><span>Good finds</span></div>
                <div className="floating-card card-two"><i className="bi bi-lightning-charge"></i><span>Fresh picks</span></div>
                <div className="hero-bag"><i className="bi bi-bag-heart-fill"></i></div>
                <span className="hero-spark spark-one">✦</span><span className="hero-spark spark-two">✳</span>
              </div>
            < /section>

            <section className="shop-section" id="shop-products">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">HANDPICKED FOR YOU</p>
                  <h2 className="section-title">Shop our collection</h2>
                  <p className="muted mb-0">Little things. Big everyday energy.</p>
                </div>
                <span className="results-count">{filteredProducts.length} products</span>
              </div>

              <div className="category-row" aria-label="Filter products by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-chip ${activeCategory === category ? "active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="row g-4 product-grid">
                  {filteredProducts.map((product) => (
                    <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                      <ProductCard
                        product={product}
                        quantity={cart.find((item) => item.id === product.id)?.quantity || 0}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <i className="bi bi-search"></i>
                  <h3>No products found</h3>
                  <p>Try another search or select a different category.</p>
                  <button className="primary-button" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Show all products</button>
                </div>
              )}
            </section>
          </>
           )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <button className="brand-button footer-brand" onClick={goHome}>
            <span className="brand-icon"><i className="bi bi-bag-heart-fill"></i></span>
            <span>screen<span className="brand-accent">store</span></span>
          </button>
          <p>Made for your everyday. <span>© {new Date().getFullYear()} Screen Store</span></p>
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a>
        </div>
      </footer>
    </>
  );
        }