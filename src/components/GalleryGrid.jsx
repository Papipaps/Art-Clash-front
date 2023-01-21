import { useEffect } from "react";
import { useState } from "react";
import Popup from "./Popup";
import MediaDTO from "../data/dto/mediaDTO";
import MediaService from "../service/media-service";
import CommentSection from "./CommentSection";
import axios from "axios";
import { API_CONTEXT } from "../utils/Paths";

export default function GalleryGrid({ profil, reload }) {
  const [mediaIds, setMediaIds] = useState([]);
  const [imageData, setImageData] = useState("");
  const [isPopupLoading, setPopupLoading] = useState(false);
  const [popupInfo, setPopUpInfo] = useState(MediaDTO);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (profil) {
      MediaService.getMediaByOwner(profil).then((res) => {
        setMediaIds(res.data);
      });
    }
  }, [profil, reload]);

  function fullScreenImage(id) {
    MediaService.getMetadataById(id).then((response) => {
      setPopUpInfo(response.data);
      setPopupOpen(true);
      setPopupLoading(false); 
    }); 
  }
  return (
    <div> 
          {isPopupOpen && <Popup
            className="transition-all duration-300 ease-in-out"
            setPopupOpen={setPopupOpen}
            height={"95%"}
            width={"auto"}
            isExitable={true}
          >
            <div className="flex items-center justify-center bg-white w-2/3 ">
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://unsplash.com/fr/photos/sNHtz720O-s";
                }} 
                className="block w-auto max-h-full object-cover"
                src={`${API_CONTEXT}/media/downloadFromDB/${popupInfo.id}`}
              />
            </div>
            <div className="popup-side bg-white w-1/3">
              <div className="h-1/6 overflow-hidden p-4">
                <h3>{popupInfo.title}</h3>
                <p>{popupInfo.description}</p>
              </div>
              <div className="h-5/6  overflow-auto">
                <CommentSection postId={popupInfo.id}></CommentSection>
              </div>
            </div>
          </Popup> }
    <section
      style={{ gridTemplateColumns: "repeat(auto-fill,350px)" }}
      className="grid w-full my-4 gap-1   justify-center   "
      >
      {mediaIds.map((mediaId,i) => {
        // axios.get(`http://localhost:8080/api/media/downloadFromDB/${mediaId}`).then((response)=>{
        //   console.log(response.data)
        //   setImageData(imageData);
        // })
        return (
          <div
          key={i}
          className="relative flex justify-center items-center border w-[350px] h-[400px] "
          onClick={()=>fullScreenImage(mediaId)}
          >
            <img
              className="object-cover overflow-hidden h-full"
              src={`${API_CONTEXT}/api/media/downloadFromDB/${mediaId}`} alt="image"/>
          </div>
        );
      })}
    </section>
      </div>
    // </div>
  );
}
