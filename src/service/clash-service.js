import axios from "axios";
import {
  CLASH_URL_CREATE,
  CLASH_URL_CREATE_COMMENT,
  CLASH_URL_DELETE,
  CLASH_URL_GET,
  CLASH_URL_GET_BY_USER,
  CLASH_URL_GET_COMMENTS, 
  CLASH_URL_UPDATE,
  CLASH_URL_GET_LIST,
  CLASH_URL_NEXTROUND,
  CLASH_URL_JOIN,
  CLASH_URL_EXIT,
  CLASH_URL_CLOSE,
  CLASH_URL_DUMMY_FILL_CLASH,
  CLASH_URL_UPLOAD_MEDIA

} from "../utils/Paths";
import authHeader from "./auth-header";

const createClash = async (data) => {
  return await axios.post(CLASH_URL_CREATE, data, {
    headers: authHeader(),
  });
};
const closeClash = async (id) => {
  return await axios.get(CLASH_URL_CLOSE + "/" + id, {
    headers: authHeader(),
  });
};
const getClashById = async (id) => {
  return await axios.get(CLASH_URL_GET + "/" + id, {
    headers: authHeader(),
  });
};
const joinClashById = async (id) => {
  return await axios.post(CLASH_URL_JOIN + "/" + id, {
    headers: authHeader(),
  });
};
const exitClashById = async (id) => {
  return await axios.get(CLASH_URL_EXIT + "/" + id, {
    headers: authHeader(),
  });
};
const nextRound = async (id) => {
  return await axios.post(CLASH_URL_NEXTROUND + "/" + id, {
    headers: authHeader(),
  });
};
const generateDummyContestants = async (id) => {
  return await axios.get(CLASH_URL_DUMMY_FILL_CLASH + "/" + id, {
    headers: authHeader(),
  });
};

const getPaginatedClashs = async (id, status, page, size) => {
  return await axios.get(
    CLASH_URL_GET_LIST +
      `?page=${page}&size=${size}&isPublic=${
        status ? status : true
      }&ownerId=${id ? id : ""}`,
    {
      headers: authHeader(),
    }
  );
};

const deleteClashById = async (id) => {
  return await axios.delete(CLASH_URL_DELETE + "/" + id, {
    headers: authHeader(),
  });
};

const getCommentsByClashId = async (id) => {
  return await axios.get(CLASH_URL_GET_COMMENTS + "/" + id, {
    headers: authHeader(),
  });
};

const getClashsByUser = async (id, page, size) => {
  return await axios.get(
    CLASH_URL_GET_BY_USER +
      `/${id}${page ? `?page=${page}` : ""}${
        size && page ? `?size=${size}` : ""
      }`,
    {
      headers: authHeader(),
    }
  );
};

const createComment = async (data) => {
  return await axios.post(CLASH_URL_CREATE_COMMENT, data, {
    headers: authHeader(),
  });
};

const updateClash = async (data) => {
  return await axios.patch(CLASH_URL_UPDATE, data, {
    headers: authHeader(),
  });
};

const ClashService = {
  getCommentsByClashId,
  getClashById,
  deleteClashById,
  createClash,
  createComment,
  updateClash,
  getClashsByUser,
  getPaginatedClashs,
  closeClash,
  nextRound,
  exitClashById,
  joinClashById,
  generateDummyContestants
};
export default ClashService;
