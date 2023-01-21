import axios from "axios";
import { API_CONTEXT } from "../utils/Paths";
import authHeader from "./auth-header";
import AuthService from "./auth-service";

const API_URL = `${API_CONTEXT}/profil/`;

const getPublicContent = async (username) => {
  return await axios.get(
    API_URL + `getPublicInformation?username=${username}`,
    {
      headers: authHeader(),
    }
  );
};
const getIProfileInformation = async (username) => {
  return await axios.get(
    API_URL + `getProfilInformation?username=${username}`,
    {
      headers: authHeader(),
    }
  );
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
