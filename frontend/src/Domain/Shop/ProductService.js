import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Get all products
export const getProducts = async () => {
  return await axios.get(API_URL);
};

// Get product by ID
export const getProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create a new product (admin use)
export const createProduct = async (productData) => {
  return await axios.post(API_URL, productData);
};
