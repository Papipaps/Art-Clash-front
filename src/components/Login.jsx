import { useFormik } from "formik";
import { Link, redirect, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Register";
import image from "../media/dessin/landing.png";
import AuthService from "../service/auth-service";
import mockProfils from "../mock/mock-profils";
import Sidebar from "./SidebarCopy";
import ProfileService from "../service/profil.service";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

export default function Login() {
 
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values) => { 
        AuthService.login(values).then(()=>{
          navigate("/home");
        })
      
    }, 
  });
  return ( 
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col shadow-xl z-10">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <Link to="/" className="bg-black text-white font-bold text-xl p-4">
            A/C
          </Link>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl font-semibold">
            Bienvenue sur ArtClash !
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="  flex flex-col pt-3 md:pt-8 px-6"
          >
            <div className="flex flex-col pt-4">
              <TextField
                required
                className="register-input"
                id="username"
                label="Nom d'utilisateur"
                onChange={formik.handleChange}
                value={formik.values.username}
              />{" "}
            </div>
            <div className="flex flex-col pt-4 mb-4">
              <TextField
                required
                className="register-input"
                id="password"
                type="password"
                label="Mot de passe"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <div className="flex justify-center">
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  style={{ border: "2px solid", width: "200px" }}
                  color="primary"
                >
                  <p className="font-bold">Submit</p>
                </Button>
              </ThemeProvider>{" "}
            </div>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Pas encore inscrit ?{" "}
              <Link className="underline font-semibold" to="/register">
                Cliquez ici !
              </Link>
            </p>
            ou
            <p>
              Accédez aux mini-jeux en{" "}
              <Link className="underline font-semibold" to="/minigame">
                cliquant là !
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 ">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src={image}
        />
      </div>
    </div>
  );
}
