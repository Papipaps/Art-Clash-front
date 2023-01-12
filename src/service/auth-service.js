import axios from "axios";
import mockProfils from "../mock/mock-profils";
import { LOGIN_CONTEXT, SIGNUP_CONTEXT } from "../utils/Paths";


const register = async (values) => {
  const registerDTO = { ...values };
  return await axios.post(SIGNUP_CONTEXT, registerDTO);
};

const login = async (username, password) => {
  return await axios({
    method: "post",
    url: LOGIN_CONTEXT,
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
