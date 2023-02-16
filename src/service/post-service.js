import mockPost from "../mock/mock-post";
import {paginate} from '../utils/formatDate'

const getPostById = async (id) => {
  return mockPost.filter((post) => post.id === id);
};

const getAllPosts = async (page) => {
  console.log('fetching feed')
  let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(paginate(mockPost,9,page))
    },500)
  })

  let result = await promise;
  return result
};

const getPostByOwner = async (ownerId) => {
  if (ownerId === "uuid-admin") {
     return mockPost.filter((post) => post.ownerId === "uuid-admin");
  } else {
     return mockPost
      .filter((post) => post.ownerId === "")
      .sort(() => Math.random() - 0.5).slice(0,6);
  }
};

const PostService = {
  getPostById,
  getPostByOwner,
  getAllPosts
};
export default PostService;
