import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendPhoneToken = (idToken) =>
  axios.post(`${API}/verify-phone`, { idToken });

export const createProfile = (data) =>
  axios.post(`${API}/create-profile`, data);
