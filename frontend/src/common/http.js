import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    "Content-type": "application/json",
  },
});
