import React, { useState, useMemo } from "react";
import { useApp } from "../Context/AppContext";
import { Link } from "react-router-dom";

function Favourite() {
    const { favorites, toggleFavorite, profile, setProfile, isProfileSaved, setIsProfileSaved } = useApp();
    const [name, setName] = useState(profile.name);
    const [age, setAge] = useState(profile.age);


    const totalValue = useMemo(() => {
        return favorites.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    }, [favorites]);

    const handleSave = (e) => {
        e.preventDefault();
        setProfile({ name, age });
        setIsProfileSaved(true);
    };

    return (
        <div className="page-container">
            <div className="vault-hero">
                <span className="vault-badge">Premium Member Vault</span>
                <h1>{isProfileSaved ? `${profile.name}'s Collection` : "Luxury Style Vault"}</h1>
            </div>

            <div className="vault-panel">
                {!isProfileSaved ? (
                    <form onSubmit={handleSave} className="vault-inputs-row">
                        <div className="vault-field">
                            <label>Owner Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Kanwal Parveen" />
                        </div>
                        <div className="vault-field">
                            <label>Age Class</label>
                            <input value={age} onChange={(e)=>setAge(e.target.value)} required placeholder="22" />
                        </div>
                        <button type="submit" className="vault-action-btn">Activate Dashboard</button>
                    </form>
                ) : (
                    <div className="vault-user-banner" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <div>
                            <h3>Elite Dashboard: {profile.name}</h3>
                            <p>Status: Premium Curator | Age: {profile.age}</p>
                        </div>
                        <div className="analytics-card" style={{ background: '#800020', color: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
                            <small>VAULT VALUE</small>
                            <h2 style={{ margin: 0 }}>${totalValue}</h2>
                        </div>
                        <button onClick={()=>setIsProfileSaved(false)} className="vault-edit-btn">Edit Profile</button>
                    </div>
                )}
            </div>

            <h2>Saved Masterpieces ({favorites.length})</h2>
            {favorites.length === 0 ? (
                <div className="vault-empty-card">
                    <p>Your vault is empty. Start adding luxury trends.</p>
                    <Link to="/products" className="vault-discover-link">Browse Catalog</Link>
                </div>
            ) : (
                <div className="products-grid">
                    {favorites.map(item => (
                        <div key={item.id} className="product-card">
                            <div className="product-image-wrapper">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="product-info">
                                <h3>{item.title}</h3>
                                <p className="product-price">${item.price}</p>
                                <button className="vault-remove-btn" onClick={() => toggleFavorite(item)}>Remove from Vault</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourite;