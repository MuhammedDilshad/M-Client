import axios from "axios";

const API = axios.create({ baseURL: "https://m-backend-mzrt.onrender.com" });
// const API = axios.create({ baseURL: "http://localhost:4000" });

export const uploadPost = (data) => API.post("/post", data);
export const uploadImage = (data) => API.post("/upload", data);

export const getPosts = (id) => {
  return API.get(`/post/${id}`);
};
export const GetPostFromCart = (id) => {
  return API.get(`/cart/${id}`);
};
export const deletePost = (id) => API.delete(`/cart/${id}`);
export const clearPost = (id) => API.delete(`/clearcart/${id}`);
export const addToCart = (id) => API.post(`/cart/${id}`);
