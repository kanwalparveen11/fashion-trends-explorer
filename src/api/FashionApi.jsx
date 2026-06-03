const BASE_URL = "https://fakestoreapi.com/products";

export const fetchTrendingCatalog = async () => {
    try {
        const response = await fetch(`${BASE_URL}/category/women's%20clothing`);
        if (!response.ok) throw new Error("Network response error");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
export const fetchProductDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Network response error");
        return await response.json();
    } catch (error) {
        console.error(`API Error for product ${id}:`, error);
        throw error;
    }
};