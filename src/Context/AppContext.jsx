import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [profile, setProfile] = useState({ name: "", age: "" });
    const [isProfileSaved, setIsProfileSaved] = useState(false);

    const toggleFavorite = (product) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.some((item) => item.id === product.id);
            if (exists) {
                return prevFavorites.filter((item) => item.id !== product.id);
            } else {
                return [...prevFavorites, product];
            }
        });
    };

    return (
        <AppContext.Provider value={{
            favorites,
            toggleFavorite,
            profile,
            setProfile,
            isProfileSaved,
            setIsProfileSaved
        }}>
            {children}
        </AppContext.Provider>
    );
}