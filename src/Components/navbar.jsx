import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
    const { favorites } = useContext(AppContext);

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid #eaeaea", alignItems: "center", backgroundColor: "#ffffff" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#800020", letterSpacing: "0.5px" }}>
                ✨ FashionTrends
            </div>
            <div style={{ display: "flex", gap: "25px" }}>
                <Link to="/" style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}>Home</Link>
                <Link to="/products" style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}>Products</Link>
                <Link to="/favorites" style={{ textDecoration: "none", color: "#333", fontWeight: "500", position: "relative" }}>
                    Favorites {favorites && favorites.length > 0 && (
                    <span style={{ backgroundColor: "#800020", color: "white", fontSize: "0.75rem", padding: "2px 7px", borderRadius: "50%", marginLeft: "4px" }}>
              {favorites.length}
            </span>
                )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;