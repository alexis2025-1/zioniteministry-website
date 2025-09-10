import axios from "axios";

export const API_URL = "http://localhost:5000/api";

export const getEvents = () => axios.get(`${API_URL}/events`);
export const getMembers = () => axios.get(`${API_URL}/members`);
export const getMedia = () => axios.get(`${API_URL}/media`);
export const getFinancials = (token) =>
  axios.get(`${API_URL}/financials`, {
    headers: { Authorization: token },
  });
