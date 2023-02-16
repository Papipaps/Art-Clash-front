import { useEffect, useCallback, useState } from "react";
import Popup from "./Popup";
import MediaService from "../service/media-service";
import PostService from "../service/post-service";
import CommentSection from "./CommentSection";
import { API_CONTEXT } from "../utils/Paths";
import postDTO from "../data/dto/postDTO";
import { CircularProgress } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  CustomFormButton,
  CustomFormContainer,
  CustomInputText,
  CustomTextAreaInput,
} from "./form/form-components";
import Dropzone from "react-dropzone";

export default function GalleryGrid({ profile, isCurrentUser }) {
  const [isUploadDialogOpen, setUploadDialog] = useState(false);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [fileName, setFileName] = useState("");
  const [uploadPending, setUploadPending] = useState(false);
  const [uploadedMediaId, setUploadedMediaId] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMorePosts();
  }, [page, profile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   const listenToScroll = () => {
  //     const winScroll =
  //       document.body.scrollTop || document.documentElement.scrollTop;
  //     const height =
  //       document.documentElement.scrollHeight -
  //       document.documentElement.clientHeight;
  //     const scrolled = winScroll / height;
  //     if (scrolled >= 1 && (page < totalPage - 1 || page === 0)) {
  //       setPage((p) => p + 1);
  //     }
  //   };
  //   window.addEventListener("scroll", listenToScroll);
  //   return () => {
  //     window.removeEventListener("scroll", listenToScroll);
  //   };
  // }, [page]);

  const openUploadDialog = () => {
    setUploadDialog((prev) => !prev);
  };

  function onSubmit(data) {
 alert("Ton upload n'a pas été prit en compte, mais t'inquiète j'y travaille 🤙")
  }

  function onFileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
  }

  function loadMorePosts() {
    PostService.getPostByOwner(profile.id).then((response) => {
      setPosts([...response]);
      setTotalPage((response.length%9)+1);
      setIsLoading(false);
    });
  }

  return (
    <div>
      {isCurrentUser && (
        <button
          onClick={openUploadDialog}
          className="fixed z-10 border bottom-0 right-0 m-16 bg-white p-6 rounded-full drop-shadow shadow-xl"
        >
          <HiPlus size={26} />
        </button>
      )}

      {isUploadDialogOpen && (
        <Popup
          width={"fit-content"}
          onComponentExited={() => {
            if (uploadPending) {
              MediaService.deleteMediaById(uploadedMediaId);
            }
          }}
          setPopupOpen={setUploadDialog}
          isExitable={true}
        >
          <section className="w-[450px]">
            <div className=" aspect-square bg-slate-400">
              <Dropzone
                onDrop={(acceptedFiles) => onFileUpload(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className="bg-slate-200 w-full h-full cursor-pointer"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {uploadPending ? (
                      <p>Image pret a l'envoie</p>
                    ) : (
                      <p>
                        Glissez une image ou cliquez ici pour en selectionner
                        une !
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
              <CustomFormButton
                register={register}
                label={"Upload"}
                color={"orange"}
                buttonType={"submit"}
              />
              <CustomInputText
                label={"Titre"}
                labelKey={"title"}
                register={register}
              />
              <CustomTextAreaInput
                label={"Description"}
                labelKey={"content"}
                register={register}
              />
            </form>
          </section>
        </Popup>
      )}

      {!isLoading ? (
        <div className="relative">
          <section
            style={{ gridTemplateColumns: "repeat(auto-fill,390px)" }}
            className="grid gap-1 sm:w-full justify-center mt-4"
          >
            {posts.map((post, i) => {
              return (
                <div
                  key={i}
                  className="mh-[390px] relative flex justify-center items-center cursor-pointer "
                >
                  <img
                    className="object-cover overflow-hidden h-full"
                    src={require(`../media/dessin/${post.imageUrl}`)}
                    alt="image"
                  />
                </div>
              );
            })}
          </section>
        </div>
      ) : (
        <div className="fixed top-1/2 left-1/2 bg-slate-500 bg-opacity-25">
          <CircularProgress />
        </div>
      )}
    </div>
    // </div>
  );
}
