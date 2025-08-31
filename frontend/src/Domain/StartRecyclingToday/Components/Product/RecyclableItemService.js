import axios from "axios";

const API_URL = "http://localhost:8080/api/recyclable-items";

export const getRecyclableItems = () => {
  return axios.get(API_URL);
};
