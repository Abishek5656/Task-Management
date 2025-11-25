import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const signupApi = async (data) => {
  return axios.post(`${API_URL}/signup`, data);
};


export const signinApi = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};
