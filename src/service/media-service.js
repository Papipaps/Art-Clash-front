import axios from "axios";
import { API_CONTEXT } from "../utils/Paths";
import authHeader from "./auth-header";

const API_URL = `${API_CONTEXT}/media/`;

const deleteMediaById = async (id) => {
  return await axios.get(API_URL + `delete/${id}`, {
    headers: authHeader(),
  });
};
const getMediaById = async (id) => {
  return await axios.get(API_URL + `downloadFromDB/${id}`, {
    headers: authHeader(),
  });
};
const getMetadataById = async (id) => {
  return await axios.get(API_URL + `downloadMetadata/${id}`, {
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
    url: API_URL + `uploadToDB`,
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
  getMetadataById
};
export default MediaService;
