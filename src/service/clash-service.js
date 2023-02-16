import axios from "axios";
import { formatDate, paginate } from "../utils/formatDate";
import authHeader from "./auth-header";
import clashMock from "../mock/clash-mock";

const createClash = async (data) => {};
const closeClash = async (id) => {};
const getClashById = async (id) => {
  return clashMock.filter((clash) => clash.id === id)[0];
};
const joinClashById = async (id) => {};
const exitClashById = async (id) => {};
const nextRound = async (id) => {};
const generateDummyContestants = async (id) => {};

const getPaginatedClashs = async (page, size) => {
  console.log("fetching clash");
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(paginate(clashMock, 9, page));
    }, 150);
  });

  let result = await promise;
  console.log("data : ", clashMock, "- result : ", result);
  return result;
};

const deleteClashById = async (id) => {};

const getCommentsByClashId = async (id) => {};

const getClashsByUser = async (id, page, size) => {};

const createComment = async (data) => {};

const updateClash = async (data) => {};

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
  generateDummyContestants,
};
export default ClashService;
