import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL; // "http://localhost:8000/api/";

const getPublicContent = (isLoggedIn, keyword) => {
  return axios.get(API_URL + (isLoggedIn ? "preference-articles/" : "articles-with-key/")+keyword, {
    headers: authHeader(),
    keyword :{keyword}
  });
};
// const getPublicContent = (isLoggedIn, keyword) => {
//   console.log("before",keyword)
//   console.log("before",JSON.stringify(keyword))
//   let data = JSON.stringify({
//     "keyword": "Police"
//   });
//   console.log(data);
//   let config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'http://127.0.0.1:8000/api/articles-with-key/pliiee',
//     headers: { 
//       'Content-Type': 'application/json'
//     },
//     data : data
//   };
  
//   return axios.request(config);
//   // return axios.request({
//   //   method: "get",
//   //   maxBodyLength: Infinity,
//   //   url: API_URL + (isLoggedIn ? "preference-articles" : "articles"),
//   //   headers: authHeader(),
//   //   data: JSON.stringify(keyword),
//   // });
// };

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
  getUserBoard,
  getUserPreference,
  getCategories,
  getSources,
  getAuthors,
  savePreference,
};
