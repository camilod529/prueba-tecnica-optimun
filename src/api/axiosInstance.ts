import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ucsazjrbe0.execute-api.us-east-1.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
