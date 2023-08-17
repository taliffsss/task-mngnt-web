import axios from "axios";
import { loadAuthToken } from '../redux/store';

const createAxiosInstance = async () => {
  try {
    // Get the authentication token from your Redux store or wherever you store it
    const authToken = await loadAuthToken();

    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If authToken is available, set it in the Authorization header
    if (authToken) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }

    return axiosInstance;
  } catch (error) {
    console.error('Error while creating axios instance:', error);
    throw error;
  }
};

export default createAxiosInstance;
