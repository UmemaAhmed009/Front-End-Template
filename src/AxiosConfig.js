import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});