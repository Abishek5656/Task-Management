import axios from "axios";
import {  BASE_URL } from "../config/index.js"

export const requestApi = {
  // ---------------- GET BY ID ----------------
  getById: (id) => {
    const token = localStorage.getItem("token");
    return axios.get(`${BASE_URL}/requests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ---------------- APPROVE REQUEST ----------------
  approve: (id, comment) => {
    const token = localStorage.getItem("token");
    return axios.patch(
      `${BASE_URL}/requests/${id}/approve`,
      { managerComment: comment },    // ⭐ FIXED
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // ---------------- REJECT REQUEST ----------------
  reject: (id, comment) => {
    const token = localStorage.getItem("token");
    return axios.patch(
      `${BASE_URL}/requests/${id}/reject`,
      { managerComment: comment },    // ⭐ FIXED
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
