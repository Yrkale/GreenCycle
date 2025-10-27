import axios from "axios";

const API_URL = "http://localhost:8080/api/shops";

// Get all shop items
export const getShops = async () => {
  return await axios.get(API_URL);
};

// Get single shop item by ID
export const getShopById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create new shop item (admin use)
export const createShop = async (shopData) => {
  return await axios.post(API_URL, shopData);
};
