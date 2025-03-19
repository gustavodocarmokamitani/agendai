import axios from "axios";

const api = axios.create({

  baseURL: "backendfoundation.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
