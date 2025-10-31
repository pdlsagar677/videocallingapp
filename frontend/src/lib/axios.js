import axios from "axios";

// Detect environment and set appropriate base URL
const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    // Use current hostname for development - this will work for mobile
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return "http://localhost:5001/api";
    } else {
      // For mobile access, use your PC's IP address
      return "http://192.168.1.74:5001/api"; // Replace with your actual PC IP
    }
  }
  return "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});