import axios from "axios";

export const axiosIns = axios.create({
  baseURL: "https://fakestoreapi.com",
});
