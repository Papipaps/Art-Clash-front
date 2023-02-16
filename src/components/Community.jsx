import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import PostService from "../service/post-service";
import postDTO from "../data/dto/postDTO";
import Popup from "./Popup";
import {dateUtils} from "../utils/formatDate";
import { API_CONTEXT } from "../utils/Paths";
import LazyLoad from "react-lazy-load";

export default function Community(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPost, setTotalPosts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [submitedPost, setSubmitedPost] = useState(postDTO);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [postPreview, setPostPreview] = useState(postDTO);
  const [page, setPage] = useState(0); 
 
  useEffect(() => {
    loadMorePosts();
  }, [page]);  

  useEffect(() => {
    const listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = winScroll / height; 
        if (scrolled >= 1 && (page < totalPage-1 || page === 0)) {
            setPage(p=>p+1) 
      }
    }
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, [page])
  
  function loadMorePosts() { 
    PostService.getPostsByUser(props.profile.id, page).then(
      (response) => { 
        setPosts([...posts,...response.data.content]);
        setTotalPage(response.data.totalPages)
        setTotalPosts(response.data.totalElements);
        setIsLoading(false)
      }
    ); 
  }

  function handleContentChange(e) {
     setSubmitedPost({ ...submitedPost, content: e.currentTarget.value });
  }
  function handleTitleChange(e) {
     setSubmitedPost({ ...submitedPost, title: e.currentTarget.value });
  }

  function handlePostView(post) {
      setPopupOpen(true);
      setPostPreview(post);
  }

  function handleSubmitPost(e) {
    e.preventDefault();

    if (submitedPost.content.length === 0) {
      setErrorMsg("Le contenu ne peut pas être vide.");
    } else if (submitedPost.title.length === 0) {
      setErrorMsg("Le titre ne peut pas être vide.");
    } else {
      PostService.createPost({
        title: submitedPost.title,
        content: submitedPost.content,
        anonymous: false,
      }).then(() => {
          loadMorePosts();
      });
    }
  }

  return (
    !isLoading && (
      <div className="w-full p-2 py-10 flex flex-col items-center">
        <form onSubmit={handleSubmitPost} action="">
          <ul>
            {errorMsg && (
              <li className=" border border-red-600 bg-red-400 p-4 my-4 rounded-sm">
                <p className="text-red-900">{errorMsg}</p>
              </li>
            )}
          </ul>
          <TextField
            onChange={handleTitleChange}
            id="outlined-basic"
            label="Titre"
            variant="outlined"
          />
          <TextField
            onChange={handleContentChange}
            id="outlined-basic"
            label="Message"
            variant="outlined"
          />
          <button className="font-bold">POST</button>
        </form>

        {isPopupOpen && (
          <Popup onComponentExited={()=>{setPostPreview(null)}} setPopupOpen={setPopupOpen} isExitable={true}>
            <div className="flex justify-evenly gap-4 p-4">
              <p>
                {postPreview.ownerFullname}{"-"}<span className="italic font-extralight">{postPreview.createdDate}</span>
              </p><br/>
              <p>
                <span className="underline-offset-4">
                  {"   "}
                  {postPreview.title}
                  {"   "}
                </span>
              </p><br/>
              {postPreview.mediaId && 
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://unsplash.com/fr/photos/sNHtz720O-s";}} 
                    className="block w-auto max-h-full object-cover"
                    src={`${API_CONTEXT}/media/downloadFromDB/${postPreview.mediaId}`}/>
              }
              <p>{postPreview.content}</p>
            </div>
          </Popup>
        )}
        <h1>
          POSTS : <span className="font-bold">{totalPost}</span>
        </h1>

        <div className="w-[550px]  border border-black gap-4">
          {posts.map((post) => {
            const d = new Date(post.postedAt.year,
              post.postedAt.month - 1,
              post.postedAt.day,
              post.postedAt.hour,
              post.postedAt.minute,
              post.postedAt.second
            )
            var formattedDate = dateUtils(d)
             return (
              <div
                onClick={() => { handlePostView(post) }}
                className="relative hover:brightness-90 bg-slate-100 border shadow-sm drop-shadow-md rounded-md  px-6 py-4 mb-6"
                key={post.id}
              >
                <div className="opacity-0 hover:opacity-100 absolute top-0 left-0 w-full h-full">
                   <button className="absolute cursor-pointer top-1/2 right-1 p-4 bg-red-500" onClick={()=>PostService.deletePostById(post.id)}></button>
                </div>

                <div className="font-bold">
                  <p>{post.title}</p>
                  {post.mediaId && <img className="object-cover overflow-hidden h-full"
                  src={`${API_CONTEXT}/media/downloadFromDB/${post.mediaId}`} alt="image"/>}
                </div>
                <div className="italic">posté le  : <span className="font-bold italic">{formattedDate?formattedDate:""}</span></div>
              </div>
            );
          })}
        </div> 
      </div>
    )
  );
}
