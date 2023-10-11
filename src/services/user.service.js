import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL; 

const getPublicContent = (isLoggedIn, keyword) => {
  return axios.get(API_URL + (isLoggedIn ? "preference-articles/" : "articles-with-key/")+keyword, {
    headers: authHeader(),
    keyword :{keyword}
  });
};

const getUserPreference = () => {
  return axios.get(API_URL + "preferences", { headers: authHeader() });
};
const getCategories = () => {
  return axios.get(API_URL + "categories", { headers: authHeader() });
};
const getSources = () => {
  return axios.get(API_URL + "sources", { headers: authHeader() });
};
const getAuthors = () => {
  return axios.get(API_URL + "authors");
};

const savePreference = (data) => {
  return axios.request({
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "preference",
    headers: authHeader(),
    data: JSON.stringify(data),
  });
};

export default {
  getPublicContent,
  getUserPreference,
  getCategories,
  getSources,
  getAuthors,
  savePreference,
};
