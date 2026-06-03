import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../App.css";

function Favourite() {
    const { favorites, toggleFavorite, profile, setProfile, isProfileSaved, setIsProfileSaved } = useContext(AppContext);
    const [inputName, setInputName] = useState(profile.name);
    const [inputAge, setInputAge] = useState(profile.age);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputName.trim() && inputAge.trim()) {
            setProfile({ name: inputName, age: inputAge });
            setIsProfileSaved(true);
        }
    };

    return (
        <div className="vault-container">
            <div className="vault-hero">
                <span className="vault-badge">Exclusive Access</span>
                <h1>{isProfileSaved ? `${profile.name}'s Style Vault` : "The Luxury Style Vault"}</h1>
                <p>Curate your personal collection and manage custom fashion metrics.</p>
            </div>

            <div className="vault-panel">
                {!isProfileSaved ? (
                    <form onSubmit={handleSubmit} className="vault-form">
                        <div className="panel-meta-text">
                            <h3>Initialize Your Profile</h3>
                            <p>Setup your parameters to unlock personal collection insights.</p>
                        </div>
                        <div className="vault-inputs-row">
                            <div className="vault-field">
                                <label>Full Name</label>
                                <input type="text" placeholder="e.g., Kanwal Parveen" value={inputName} onChange={(e) => setInputName(e.target.value)} required />
                            </div>
                            <div className="vault-field">
                                <label>Age Profile</label>
                                <input type="number" placeholder="e.g., 21" value={inputAge} onChange={(e) => setInputAge(e.target.value)} required />
                            </div>
                            <button type="submit" className="vault-action-btn">Activate Dashboard</button>
                        </div>
                    </form>
                ) : (
                    <div className="vault-user-banner">
                        <div className="user-avatar-glow">👑</div>
                        <div className="user-welcome-text">
                            <h3>Welcome Back, Elite Member</h3>
                            <p>Profile Identity: <strong>{profile.name}</strong> &nbsp;|&nbsp; Age Class: <strong>{profile.age}</strong></p>
                        </div>
                        <button onClick={() => setIsProfileSaved(false)} className="vault-edit-btn">✍️ Modify Metrics</button>
                    </div>
                )}
            </div>

            <div className="wishlist-meta-header">
                <h2>Saved Pieces ({favorites.length})</h2>
                <div className="accent-line"></div>
            </div>

            {favorites.length === 0 ? (
                <div className="vault-empty-card">
                    <div className="vault-empty-icon">💎</div>
                    <h3>Your Vault is Currently Empty</h3>
                    <p>Explore our trending catalog and add items here to build your personal capsule collection.</p>
                    <Link to="/products" className="vault-discover-link">Explore Trends</Link>
                </div>
            ) : (
                <div className="products-grid">
                    {favorites.map((item) => (
                        <div key={item.id} className="product-card">
                            <div className="product-image-wrapper">
                                <img src={item.image} alt={item.title} className="product-image" />
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{item.title}</h3>
                                <p className="product-price">${item.price.toFixed(2)}</p>
                                <button className="vault-remove-btn" onClick={() => toggleFavorite(item)}><span>✕</span> Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourite;