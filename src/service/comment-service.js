import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/comment/";

const getCommentByPostId = async (id) => {
  return await axios.get(API_URL + `getByPost/${id}`, {
    headers: authHeader(),
  });
};
const CommentService = {
  getCommentByPostId,
};
export default CommentService;
