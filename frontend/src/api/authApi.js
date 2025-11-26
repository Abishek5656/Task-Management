import axios from "axios";
import { BASE_URL } from "../config/index.js"

export const signupApi = async (data) => {
  return axios.post(`${BASE_URL}/auth/signup`, data);
};


export const signinApi = async (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};

