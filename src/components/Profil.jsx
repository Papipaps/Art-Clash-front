import { useState, useEffect } from "react";
import defaultBackgroundImage from "../media/images/defaultbgimage.webp";
import Sidebar from "./Sidebar";
import "../styles/UserProfil.css";
import GalleryGrid from "./GalleryGrid";
import AuthService from "../service/auth-service";
import { getPublicContent } from "../service/profil.service";

let profil = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  createdDate: "",
  category: "",
  favColor: "#FFFFFF",
  private: false,
  country: "",
  gender: "",
  username: "",
  anonymous: false,
};

export default function Profil() {
  const [currentProfil, setCurrentProfil] = useState(profil);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loggedUser = getPublicContent();

    setCurrentProfil({ ...loggedUser });
  }, []);

  return (
    <>
      <Sidebar />
      <section
        className="profile-page   flex "
        style={{ backgroundColor: `${currentProfil.favColor}` }}
      >
        <div className="flex justify-center ml-16 w-full mb-4 ">
          <div className="container px-4 ">
            <div className="  flex flex-col min-w-0 break-words bg-white h-full w-full shadow-2xl  ">
              {/* BACKGROUND COVER IMAGE */}
              <div
                className="flex flex-wrap justify-center w-full "
                style={{
                  backgroundColor: `${currentProfil.favColor}`,
                }}
              >
                <img
                  className="h-[300px]  w-full object-cover overflow-hidden brightness-[65%]"
                  src={defaultBackgroundImage}
                  alt=""
                  srcset=""
                />
              </div>
              {/* PROFIL INFO CARD */}
              <div className={`profile-info py-4   text-center h-[200px] my-4`}>
                <div className="flex flex-wrap justify-center">
                  <div className="profil-primary w-full">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {currentProfil.anonymous
                        ? currentProfil.email
                        : currentProfil.first_name +
                          " " +
                          currentProfil.last_name}

                      <span className="italic text-gray-800 font-light">
                        {" - "} {currentProfil.category}
                      </span>
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      {currentProfil.country}
                    </div>
                  </div>
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {currentProfil.description
                        ? "Bio :" + currentProfil.description
                        : "Cet utilisateur n'a pas de bio.. 😅"}
                    </p>
                    {/* <Button
                      onClick={resetProfil}
                      style={{ border: "2px solid", width: "200px" }}
                      color="primary"
                    >
                      <p className="font-bold">Change Profil</p>
                    </Button> */}
                  </div>
                </div>
              </div>
              {/* PROFIL CONNECT */}
              <div className="profil-content-tab  relative flex justify-around">
                <div className="profil-content-tab-items">
                  <button> Gallerie</button>
                </div>
                <div className="profil-content-tab-items">
                  <button> Projets</button>
                </div>
                <div className="profil-content-tab-items">
                  <button> A propos</button>
                </div>
                <div className="profil-content-tab-items">
                  <button> Communauté</button>
                </div>
                <div className="profil-content-tab-items">
                  <button> Contact</button>
                </div>
              </div>
              {/* PROFIL CONTENT */}

              <GalleryGrid height={300} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
