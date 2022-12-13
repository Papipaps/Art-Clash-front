import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/media/";

const deleteMediaById = async (id) => {
  return await axios.get(API_URL + `delete/${id}`, {
    headers: authHeader(),
  });
};
const getMediaById = async (id) => {
  return await axios.get(API_URL + `download/${id}`, {
    headers: authHeader(),
  });
};
const getThumbnail = async (id) => {
  return await axios.get(API_URL + `getThumbnail/${id}`, {
    headers: authHeader(),
  });
};
const getMediaByOwner = async (id) => {
  return await axios.get(API_URL + `downloadAllByOwner/${id}`, {
    headers: authHeader(),
  });
};
const uploadMedia = async (formData) => {
  return await axios({
    method: "post",
    url: API_URL + `upload`,
    data: formData,
    headers: authHeader(),
  }).then(function (response) {
    console.log(response.data);
  });
};
const MediaService = {
  getMediaById,
  getThumbnail,
  getMediaByOwner,
  uploadMedia,
  deleteMediaById,
};
export default MediaService;
