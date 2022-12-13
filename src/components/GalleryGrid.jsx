import { useEffect } from "react";
import { useState } from "react";
import data from "../mock/data";
import MediaService from "../service/media-service";
import ProfileService from "../service/profil.service";
// const tab = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export default function GalleryGrid({ profil, reload }) {
  const [mediaIds, setMediaIds] = useState([]);

  const classText = "";
  useEffect(() => {
    if (profil) {
      MediaService.getMediaByOwner(profil).then((res) => {
        setMediaIds(res.data);
      });
    }
  }, [profil, reload]);
  return (
    <section
      style={{ gridTemplateColumns: "repeat(auto-fill,350px)" }}
      className="grid w-full my-4 gap-1   justify-center   "
    >
      {mediaIds.map((item) => {
        return (
          <div
            key={item}
            className="relative flex justify-center items-center border w-[350px] h-[400px] "
          >
            <img
              className="object-cover overflow-hidden h-full"
              src={`http://localhost:8080/api/media/getThumbnail/${item}`}
            />
          </div>
        );
      })}
    </section>
    // </div>
  );
}
