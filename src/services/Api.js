import Axios from "axios";
import { BASE_URL } from "../globals";

const Client = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});


Client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default Client;
