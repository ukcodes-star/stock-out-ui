import axios from "axios";

const API_URL = "http://localhost:8080/api/stockout";

export const getAllStockOut = () => {
  return axios.get(API_URL);
};

export const saveStockOut = (data) => {
  return axios.post(API_URL, data);
};

export const deleteStockOut = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};