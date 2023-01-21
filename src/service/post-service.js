import axios from "axios";
import { POST_URL_CREATE, POST_URL_CREATE_COMMENT, POST_URL_DELETE, POST_URL_GET, POST_URL_GET_BY_USER, POST_URL_GET_COMMENTS } from "../utils/Paths";
import authHeader from "./auth-header"; 

const getCommentsByPostId = async (id) => {
  return await axios.get(POST_URL_GET_COMMENTS+id, {
    headers: authHeader(),
  });
};

const getPostById = async (id) => {
  return await axios.get(POST_URL_GET+id, {
    headers: authHeader(),
  });
};
const getPostsByUser = async (id,page,size) => {
  return await axios.get(POST_URL_GET_BY_USER+id+`${page?`?page=${page}`:""}`, {
    headers: authHeader(),
  });
};

const deletePostById = async (id) => {
  return await axios.delete(POST_URL_DELETE+id, {
    headers: authHeader(),
  });
};

const createPost = async (data) => {
  return await axios.post(POST_URL_CREATE,data, {
    headers: authHeader(),
  });
};

const createComment = async (data) => {
  return await axios.post(POST_URL_CREATE_COMMENT,data, {
    headers: authHeader(),
  });
};

const PostService = {
  getCommentsByPostId,
  getPostById,
  deletePostById,
  createPost,
  createComment,
  getPostsByUser
};
export default PostService;
