import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL ; //"http://localhost:8000/api/";

const register = (username, email, password, c_password) => {

  return axios.post(API_URL + "register", {
    name: username,
    email,
    password,
    c_password,
  }).then((response) => {
    if (response.data.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  });
};

const reference = (category, author, source) => {
  return axios.post(API_URL + "preference", {
    category, author, source
  }).then((response) => {
    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  reference
};
