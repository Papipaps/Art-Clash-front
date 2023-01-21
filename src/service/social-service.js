import axios from "axios";
import { SOCIAL_URL_FOLLOW, SOCIAL_URL_FOLLOWERS, SOCIAL_URL_UNFOLLOW } from "../utils/Paths";
import authHeader from "./auth-header";


const followUser = async (id) => {
  return await axios.post(SOCIAL_URL_FOLLOW`?userId=${id}`, {
    headers: authHeader(),
  });
}; 
const unfollowUser = async (id) => {
  return await axios.patch(SOCIAL_URL_UNFOLLOW`?userId=${id}`, {
    headers: authHeader(),
  });
}; 
const getFollowers = async (id, page,size) => {
  return await axios.get(SOCIAL_URL_FOLLOWERS`?userId=${id}&page=${page}&size=${size}`, {
    headers: authHeader(),
  });
}; 
const SocialService = {
  followUser,unfollowUser,getFollowers
};
export default SocialService;
