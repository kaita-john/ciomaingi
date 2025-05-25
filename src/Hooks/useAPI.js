import {useCallback, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


const baseUrl = "http://ciomaingifarm.website"

function errorChecker(error, setError) {
    console.error("Request error:", error);
    let errorMessage = "An error occurred. Please try again later.";

    if (error.response) { // Check if the server returned an error response
        const errorData = error.response.data;
        if (errorData) { // Check if errorData exists (sometimes it might be empty)
            if (errorData.detail) {
                errorMessage = `Error: ${error.response.status} - ${JSON.stringify(errorData.detail)}`;
            } else if (errorData.error) {
                errorMessage = `Error: ${error.response.status} - ${JSON.stringify(errorData.error)}`;
            } else if (errorData.details) {
                errorMessage = `Error: ${error.response.status} - ${JSON.stringify(errorData.details)}`;
            } else if (errorData.message) {
                errorMessage = `Error: ${error.response.status} - ${JSON.stringify(errorData.message)}`;
            } else {
                // If no detail, error, or message is found, try to stringify the whole object
                try {
                    errorMessage = `Error: ${error.response.status} - ${JSON.stringify(errorData)}`;
                } catch (stringifyError) {
                    errorMessage = `Error: ${error.response.status} - Something went wrong.`;
                }
            }
        } else {
            errorMessage = `Error: ${error.response.status} - Server returned an error but no details were provided.`;
        }
    } else if (error.request) {
        errorMessage = "No response from the server. Please check your network connection.";
    } else { // Some other error occurred
        errorMessage = error.message || "An error occurred. Please try again later.";
    }
    setError(errorMessage); // ✅ Set error state
}


export function useGetItems(productId, setMainImage) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const url = productId ? `${baseUrl}/api/v1/items/${productId}` : `http://ciomaingifarm.website/api/v1/items/list`;
                const response = await axios.get(url);

                // Check if the response contains valid data
                if (response.data) {
                    setProduct(response.data);
                    if (productId) {
                        setMainImage(response.data.mainimage);
                    }
                } else {
                    setError("No data found in the response.");
                }
            } catch (error) {
                errorChecker(error, setError)
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);
    return {product, loading, error};
}


export function postPurchase() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const createPurchase = useCallback(async (payload) => { // useCallback is correct here
        setLoading(true);
        setError(null);
        setPurchaseSuccess(false);

        try {
            const response = await axios.post(`${baseUrl}/api/v1/purchases/create`,
                payload
            );
            if (response.status >= 200 && response.status < 300) { // Check for successful status codes (2xx)
                setPurchaseSuccess(true);
                return response.data;
            }
        } catch (error) {
            errorChecker(error, setError)
        } finally {
            setLoading(false);
        }
    }, []);

    return {createPurchase, loading, error, purchaseSuccess, setPurchaseSuccess};

}





export function useGetCategories() {
    const [categories, setCategories] = useState(null);
    const [categoryloading, setLoadingCategory] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const url = `${baseUrl}/api/v1/categories/list`
                const response = await axios.get(url);
                // Check if the response contains valid data
                if (response.data) {
                    setCategories(response.data);
                } else {
                    setError("No data found in the response.");
                }
            } catch (error) {
                errorChecker(error, setError)
            } finally {
                setLoadingCategory(false);
            }
        };
        fetchCategory();
    }, []);
    return {categories, categoryloading, error};
}