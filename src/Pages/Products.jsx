import React, { useState, useEffect, useMemo } from "react";
import { useApp } from "../Context/AppContext";
import { fetchTrendingCatalog } from "../api/FashionApi";
import { Link } from "react-router-dom";

function Products() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const { favorites, toggleFavorite } = useApp();

    useEffect(() => {
        let active = true;
        fetchTrendingCatalog().then((data) => {
            if (active) {
                setItems(data);
                setLoading(false);
            }
        });
        return () => { active = false; };
    }, []);


    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, items]);

    if (loading) return <div className="page-container">Loading Collection...</div>;

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Trending Collection</h1>
                <input
                    type="text"
                    placeholder="Search items..."
                    className="vault-field"
                    style={{ width: '300px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="products-grid">
                {filteredItems.map((item) => {
                    const isFav = favorites.some((f) => f.id === item.id);
                    return (
                        <div key={item.id} className="product-card">
                            <button
                                onClick={() => toggleFavorite(item)}
                                style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem', zIndex: 10 }}
                            >
                                {isFav ? "❤️" : "🤍"}
                            </button>
                            <div className="product-image-wrapper">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{item.title}</h3>
                                <p className="product-price">${item.price}</p>
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