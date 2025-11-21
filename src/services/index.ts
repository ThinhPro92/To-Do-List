import axios from "axios";

const api = axios.create({
  baseURL: "https://api-class-o1lo.onrender.com/api/thinh",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
