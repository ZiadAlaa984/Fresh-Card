import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CardContext = createContext();

export default function CardContextProvider(props) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('tokenUser');
        setToken(tokenFromStorage);
    }, []);
    const headers = {
        token: localStorage.getItem('tokinUser')
    };
    const [Count, setCount] = useState(() => {
        const storedCount = localStorage.getItem('count');
        return storedCount ? parseInt(storedCount, 10) : 0;
    });
    const [withLength, setWithLength] = useState(0)
    const [withes, setWithes] = useState(() => {
        const storedWithes = localStorage.getItem('withes');
        try {
            return storedWithes ? JSON.parse(storedWithes) : [];
        } catch (error) {
            console.error("Error parsing stored withes from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        console.log("Saving withes to local storage:", withes);
        localStorage.setItem('withes', JSON.stringify(withes));
    }, [withes]);


    function addToWithList(productId) {
        console.log("Attempting to add product to cart with ID:", productId);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        }, {
            headers
        })
            .then((response) => {
                console.log("Response from server:", response.data);
                return response.data;
            })
            .catch((err) => {
                console.error("Error adding to cart:", err.response ? err.response.data : err.message);
                return Promise.reject(err);
            });
    }
    function addToCard(productId) {
        console.log("Attempting to add product to cart with ID:", productId);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
            .then((response) => {
                console.log("Response from server:", response.data);
                return response.data;
            })
            .catch((err) => {
                console.error("Error adding to cart:", err.response ? err.response.data : err.message);
                return Promise.reject(err);
            });
    }
    function removeCard(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
            .then((response) => response.data)
            .catch((err) => {
                console.error("Error removing from cart:", err);
                return Promise.reject(err);
            });
    }
    function removewishlist(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
            .then((response) => response.data)
            .catch((err) => {
                console.error("Error removing from cart:", err);
                return Promise.reject(err);
            });
    }
    function UpdateCard(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        }, {
            headers
        })
            .then((response) => response.data)
            .catch((err) => {
                console.error("Error updating cart:", err);
                return Promise.reject(err);
            });
    }

    function getCard() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response.data)
            .catch((err) => {
                console.error("Error getting cart:", err);
                return Promise.reject(err);
            });
    }
    function getWithList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
            .then((response) => response.data)
            .catch((err) => {
                console.error("Error getting cart:", err);
                return Promise.reject(err);
            });
    }
    const [productInWithes, setproductInWithes] = useState([])

    return (
        <CardContext.Provider value={{ addToCard, getWithList, setproductInWithes, productInWithes, removewishlist, getCard, withLength, setWithLength, removeCard, UpdateCard, addToWithList, setCount, Count, withes, setWithes }}>
            {props.children}
        </CardContext.Provider>
    )
}
