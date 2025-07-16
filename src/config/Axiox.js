import { DEV_API, PROD_API } from "./config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../Navigation/NavigationService";
import { Alert } from "react-native";

export const axiosApi = axios.create({
  baseURL: DEV_API,
  // baseURL: PROD_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-GB,en",
  },
});

// Add token in request
axiosApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token:");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors (refresh / logout)
axiosApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const userId = await AsyncStorage.getItem("@auth_id");
        const refreshed = await axiosApi.get(`/user/getRefershToken/${userId}`);

        // Optionally store new token
        if (refreshed.data?.token) {
          await AsyncStorage.setItem(
            "@token:",
            JSON.stringify(refreshed.data.token)
          );
          originalRequest.headers.Authorization = `Bearer ${refreshed.data.token}`;
          return axiosApi(originalRequest);
        }
      } catch (err) {
        Alert.alert("Session Expired", "Please login again");
        await AsyncStorage.clear();
        // If you're using React Navigation:
        // navigationRef.current?.reset({ index: 0, routes: [{ name: 'Login' }] });
        // if (navigationRef.isReady()) {
        //   navigationRef.reset({ index: 0, routes: [{ name: "Login" }] });
        // }
      }
    }

    // If 403 - no permission
    if (error.response?.status === 403) {
      Alert.alert("Access Denied", "You don’t have permission to access this.");
      await AsyncStorage.clear();
      // if (navigationRef.isReady()) {
      //   navigationRef.reset({ index: 0, routes: [{ name: "Login" }] });
      // }
    }

    return Promise.reject(error);
  }
);
