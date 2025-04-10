import { DEV_API, PROD_API } from "./config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosApi = axios.create({
  baseURL: DEV_API,
  // baseURL: PROD_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-GB,en",
  },
});

axiosApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token:");
    if (token) {
      const tok = JSON.parse(token);
      config.headers.Authorization = `Bearer ${tok}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return error;
  }
);
