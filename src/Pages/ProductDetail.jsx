import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductDetails } from "../api/fashionApi";
import "../App.css";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductDetails(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="page-container"><div className="loading-spinner">Loading item specifications...</div></div>;
    if (!product) return <div className="page-container"><h3>Product not found</h3><Link to="/products">Back</Link></div>;

    return (
        <div className="page-container">
            <div className="detail-layout">
                <div className="detail-image-box"><img src={product.image} alt={product.title} /></div>
                <div className="detail-info-box">
                    <Link to="/products" className="back-link">← Back to Catalog</Link>
                    <span className="detail-category">{product.category}</span>
                    <h1 className="detail-title">{product.title}</h1>
                    <p className="detail-price">${product.price.toFixed(2)}</p>
                    <p className="detail-description">{product.description}</p>
                    <div className="rating-box">⭐ {product.rating?.rate} ({product.rating?.count} reviews)</div>
                    <button className="add-cart-placeholder-btn" onClick={() => alert("Added to bag!")}>👜 Add to Bag</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;