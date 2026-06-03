import { Link } from "react-router-dom";
import "../App.css";

function Home() {
    return (
        <div className="page-container">
            <div className="hero-banner">
                <div className="hero-content">
                    <h1>Fashion Trends Explorer</h1>
                    <p>Discover the latest styles, elite seasonal outerwear, and handcrafted collections curated specifically for your expression.</p>
                    <Link to="/products" className="hero-explore-btn">Explore Collection</Link>
                </div>
            </div>

            <h2 className="features-title">The FashionTrends Standard</h2>
            <div className="features-grid">
                <div className="feature-card">
                    <span className="feature-icon">✨</span>
                    <h3>Curated Wardrobe</h3>
                    <p>Handpicked contemporary outerwear tailored to fit modern aesthetics perfectly.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">🌿</span>
                    <h3>Premium Quality</h3>
                    <p>Crafted using elite, durable materials meant to elevate your daily style statement.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">⚡</span>
                    <h3>Secure Logistics</h3>
                    <p>Seamless processing with ultra-fast tracking straight to your doorstep.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;