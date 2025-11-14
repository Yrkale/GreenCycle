// ./services/PickupRequestService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/pickup-requests";

// 🔹 Create new pickup request
export const createPickupRequest = async (pickupData) => {
  return await axios.post(API_URL, pickupData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // attach JWT if required
    },
  });
};

// 🔹 Get all pickup requests
export const getAllPickupRequests = async () => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}; 

// 🔹 Get a pickup request by ID
export const getPickupRequestById = async (id) => {
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 🔹 Delete a pickup request
export const deletePickupRequest = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
