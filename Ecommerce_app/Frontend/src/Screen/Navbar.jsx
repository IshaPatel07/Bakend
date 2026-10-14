export default function Navbar({ search, setSearch, cartCount, onCartClick, onHomeClick }) {
  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container py-2">
          <button className="brand-button" onClick={onHomeClick} aria-label="Screen Store home">
            <span className="brand-icon"><i className="bi bi-bag-heart-fill"></i></span>
            <span>screen<span className="brand-accent">store</span></span>
          </button>

          <div className="search-wrap order-3 order-lg-2">
            <i className="bi bi-search search-icon"></i>
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search"><i className="bi bi-x-lg"></i></button>}
          </div>

          <div className="nav-actions order-2 order-lg-3">
            <button className="cart-button" onClick={onCartClick}>
              <i className="bi bi-bag"></i>
              <span className="d-none d-sm-inline">My Cart</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}