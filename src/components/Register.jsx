import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";
import MultipleSelect from "./Multiselect";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../service/auth-service";
export const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#FF9C08",
      darker: "#F57106",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      gender: "unspecified",
      email: "",
      category: "Illustrator",
    },

    onSubmit: (values) => { 
      AuthService.register(values).then(()=>{
        navigate("/login"); 
      })
    },
  });

  return (
    <div className="register-form w-screen h-screen">
      <div className="register-right h-screen flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className=" bg-white rounded-3xl p-10 flex flex-col absolute right-80"
        >
          <h1 className="place-self-center font-bold mb-6 text-2xl">
            Bienvenue sur ArtClash !
          </h1>

          <div className="register-input">
            <TextField
              required
              className="register-input"
              id="username"
              label="Nom d'utilisateur"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="register-input">
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
          <div className="register-input bg-slate-100">
            <TextField
              required
              className="register-input"
              id="email"
              type="email"
              label="Adresse mail"
              onChange={formik.handleChange}
              value={formik.values.email}
              disabled
            />
          </div>
          <div className="register-input flex flex-col justify-center bg-slate-100">
            <InputLabel id="gender-selector">Genre</InputLabel>
            <Select
            disabled
              labelId="gender-selector"
              id="demo-simple-select"
              name="gender"
              value={formik.values.gender}
              label="Genre"
              onChange={formik.handleChange}
            >
              <MenuItem value="unspecified">Non spécifié</MenuItem>
              <MenuItem value="Femme">Femme</MenuItem>
              <MenuItem value="Homme">Homme</MenuItem>
            </Select>
          </div>
          <div className="register-input bg-slate-100">
            <InputLabel id="skill-selector">Catégorie</InputLabel>
            <Select
            disabled
              labelId="category-selector"
              id="demo-simple-select"
              name="category"
              value={formik.values.category}
              label="Categorie"
              onChange={formik.handleChange}
            >
              <MenuItem value="Illustrator">Illustrateur/trice</MenuItem>
              <MenuItem value="Photographer">Photographe</MenuItem>
              <MenuItem value="Painter">Peintre</MenuItem>
              <MenuItem value="Tattooist">Tattoueur/Tatoueuse</MenuItem>
              <MenuItem value="Graphic designer">Graphic designer</MenuItem>
              <MenuItem value="Textile artist">Couturier/Couturiere</MenuItem>
              <MenuItem value="Sculptors">Sculteur/Sculteuse</MenuItem>
              <MenuItem value="Craft artists">Artisan/Artisanne</MenuItem>
            </Select>
          </div>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              style={{ border: "1px solid" }}
              color="primary"
            >
              {" "}
              Submit
            </Button>
          </ThemeProvider>
          <div className="text-center pt-12 pb-12">
            <p>
              Vous avez déjà un compte ?{" "}
              <Link className="underline font-semibold" to="/login">
                Connectez-vous ici.
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
    </div>
  );
}
