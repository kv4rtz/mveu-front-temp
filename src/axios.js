import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.itroom18.ru/mveu/temp/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
