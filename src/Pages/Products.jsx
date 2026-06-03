import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { fetchTrendingCatalog } from "../api/fashionApi";
import "../App.css";

function Products() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useContext(AppContext);

    useEffect(() => {
        fetchTrendingCatalog()
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="page-container"><p style={{ textAlign: "center", color: "#666" }}>Loading gorgeous collections...</p></div>;

    return (
        <div className="page-container">
            <h1>Trending Collection</h1>
            <p style={{ color: "#666", marginBottom: "20px" }}>Explore handcrafted premium fashion trends.</p>
            <div className="products-grid">
                {items.map((item) => {
                    const isFav = favorites.some((fav) => fav.id === item.id);
                    return (
                        <div key={item.id} className="product-card" style={{ position: "relative" }}>
                            <button
                                onClick={() => toggleFavorite(item)}
                                style={{ position: "absolute", top: "12px", right: "12px", background: "#ffffff", border: "1px solid #eee", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}
                            >
                                {isFav ? "❤️" : "🤍"}
                            </button>
                            <div className="product-image-wrapper">
                                <img src={item.image} alt={item.title} className="product-image" />
                            </div>
                            <div className="product-info">
                                <h3 className="product-title" title={item.title}>{item.title}</h3>
                                <p className="product-price">${item.price.toFixed(2)}</p>
                                <Link to={`/product/${item.id}`} className="view-details-btn">View Details</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;