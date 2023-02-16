import axios from "axios";
import mockProfils from "../mock/mock-profils";
import { LOGIN_CONTEXT, SIGNUP_CONTEXT } from "../utils/Paths";

 
const register = async (values) => {
   localStorage.setItem("fake-login",JSON.stringify(values))
  const auth = JSON.parse(localStorage.getItem("fake-login")) 
};

const login = async (values) => {

  if (values.username == "admin" && values.password == "secret") {
    localStorage.setItem("mock-user",JSON.stringify(mockProfils[0]))
  }else{
    const auth =  JSON.parse(localStorage.getItem("fake-login"))
    if (values.username === auth.username && values.password === auth.password) {
      localStorage.setItem("mock-user",JSON.stringify(mockProfils[Math.floor(Math.random()*50)]))
    }else{
      throw new Error("User not registed")
    }
  }

};

const logout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return localStorage.getItem("access_token");
};

const getMockUser = () => { 
  return JSON.parse(localStorage.getItem("mock-user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getMockUser,
};

export default AuthService;
