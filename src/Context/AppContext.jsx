import React, { createContext, useState, useMemo, useCallback, useContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("fashion_favs");
        return saved ? JSON.parse(saved) : [];
    });

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("fashion_profile");
        return saved ? JSON.parse(saved) : { name: "", age: "" };
    });

    const [isProfileSaved, setIsProfileSaved] = useState(() => {
        return localStorage.getItem("fashion_isSaved") === "true";
    });

    useEffect(() => {
        localStorage.setItem("fashion_favs", JSON.stringify(favorites));
        localStorage.setItem("fashion_profile", JSON.stringify(profile));
        localStorage.setItem("fashion_isSaved", isProfileSaved);
    }, [favorites, profile, isProfileSaved]);

    const toggleFavorite = useCallback((product) => {
        setFavorites((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) return prev.filter((item) => item.id !== product.id);
            return [...prev, product];
        });
    }, []);

    const contextValue = useMemo(() => ({
        favorites, toggleFavorite, profile, setProfile, isProfileSaved, setIsProfileSaved
    }), [favorites, toggleFavorite, profile, isProfileSaved]);

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);