import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/profil/";

const getPublicContent = async () => {
  return await axios.get(API_URL + "getPublicInformation", {
    headers: authHeader(),
  });
};
const getIProfileInformation = async () => {
  return await axios.get(API_URL + "getProfilInformation", {
    headers: authHeader(),
  });
};
const updateProfile = async (profilDTO) => {
  return await axios.put(API_URL + "update", profilDTO, {
    headers: authHeader(),
  });
};
const ProfileService = {
  getPublicContent,
  getIProfileInformation,
  updateProfile,
};
export default ProfileService;
