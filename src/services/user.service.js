import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "preference-articles",{ headers: authHeader() });
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
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

 return  axios.request({
    method: 'post',
    maxBodyLength: Infinity,
    url: API_URL + 'preference',
    headers: authHeader(),
    data : JSON.stringify(data)
  })

};



export default {
  getPublicContent,
  getUserBoard,
  getUserPreference,
  getCategories,
  getSources,
  getAuthors,
  savePreference,
};