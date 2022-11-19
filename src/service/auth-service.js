import axios from "axios";
import mockProfils from "../mock/mock-profils";

const API_URL = "http://localhost:8080/api/auth/";

const register = async (values) => {
  const registerDTO = { ...values };
  return await axios.post(API_URL + "signup", registerDTO);
};

const login = async (username, password) => {
  return await axios({
    method: "post",
    url: API_URL + "signin",
    data: { username, password },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

const logout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return localStorage.getItem("access_token");
};
const getMockUser = () => {
  return localStorage.getItem("mock-user");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getMockUser,
};

export default AuthService;
