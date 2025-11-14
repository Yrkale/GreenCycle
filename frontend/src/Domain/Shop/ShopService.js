import axios from "axios";

const SHOP_API = "http://localhost:8080/api/shops";
const REDEMPTION_API = "http://localhost:8080/api/redemption";

// ✅ Get all shop items
export const getShops = async () => {
  return await axios.get(SHOP_API);
};

// ✅ Redeem a shop item
export const redeemItem = async (shopId, token) => {
  return await axios.post(`${REDEMPTION_API}/redeem/${shopId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all redeemed items for logged-in user
export const getUserRedemptions = async (token) => {
  return await axios.get(`${REDEMPTION_API}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
