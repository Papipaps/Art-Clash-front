import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import PostService from "../service/post-service";
import postDTO from "../data/dto/postDTO";
import Popup from "./Popup";
import dateUtils from "../utils/formatDate";
import { API_CONTEXT } from "../utils/Paths";

export default function Community(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPost, setTotalPosts] = useState(0);
  const [submitedPost, setSubmitedPost] = useState(postDTO);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [postPreview, setPostPreview] = useState(postDTO);
  const [page, setPage] = useState(0);
  

  useEffect(() => {
     loadMorePosts();
  }, [page]);

  // const loadMorePosts=useCallback(()=>{
  //   PostService.getPostsByUser(props.profile.id, page).then(
  //     (response) => {
  //       console.log(response.data)

  //       setPosts(posts=>[...posts,...response.data.content]);
  //       setTotalPosts(response.data.totalElements);
  //       setIsLoading(false);
  //     }
  //   );
  // }, [page])

  function loadMorePosts() {
    PostService.getPostsByUser(props.profile.id, page).then(
      (response) => {
        setPosts([...posts,...response.data.content]);
        setTotalPosts(response.data.totalElements);
        setIsLoading(false)
        console.log("loaded")
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
    console.log(post)
      setPopupOpen(true);
      setPostPreview(post);
  }

  function handleSubmitPost(e) {
    e.preventDefault();

    if (submitedPost.content.length === 0) {
      setErrorMsg("Le contenu ne peut pas être vide.");
    } else if (submitedPost.title.length === 0) {
      setErrorMsg("Le titre ne peut pas être vide.");
    }

    if (submitedPost.content.length > 0 && submitedPost.title.length > 0) {
      PostService.createPost({
        title: submitedPost.title,
        content: submitedPost.content,
        anonymous: false,
      }).then((res) => {
          loadMorePosts();
      });
    }
  }

  return (
    !isLoading && (
      <div className="w-full p-2 flex flex-col items-center">
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
              {postPreview.media?.content && <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://unsplash.com/fr/photos/sNHtz720O-s";
                }} 
                className="block w-auto max-h-full object-cover"
                src={`${API_CONTEXT}media/downloadFromDB/${postPreview.media.id}`}
              />}
              <p>{postPreview.content}</p>
            </div>
          </Popup>
        )}
        <h1>
          POSTS : <span className="font-bold">{totalPost}</span>
        </h1>

        <div className="w-fit grid grid-cols-3 gap-4">
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
                className=" cursor-pointer hover:opacity-50 bg-slate-100 border shadow-sm drop-shadow-md rounded-md w-fit px-6 py-2"
                key={post.id}
              >
                <div className="font-bold">{post.title}</div>
                <div className="italic">posté le  : <span className="font-bold italic">{formattedDate?formattedDate:""}</span></div>
              </div>
            );
          })}
        </div>

        {posts.length < totalPost && (
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Charger de nouveaux posts
          </button>
        )}
      </div>
    )
  );
}
