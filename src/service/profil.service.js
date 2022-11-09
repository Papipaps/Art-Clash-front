import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/profil/";

const getPublicContent = async () => {
  return await axios.get(API_URL + "getPublicInformation", {
    headers: authHeader(),
    withCredentials: true,
  });
};
const ProfileService = {
  getPublicContent,
};
export default ProfileService;
