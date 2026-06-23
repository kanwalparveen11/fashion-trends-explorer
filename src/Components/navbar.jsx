import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import "./navbar.css";

function Navbar() {
    const { favorites } = useContext(AppContext);
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">FashionTrends</Link>
            </div>

            <div className="navbar-links">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
                <Link to="/favorites" className="nav-link badge-link">
                    Favorites
                    {favorites.length > 0 && (
                        <span className="cart-badge">{favorites.length}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;