import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";
import MultipleSelect from "./Multiselect";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../service/auth-service";
import ProfileService from "../service/profil.service";
import profilDTO from "../data/dto/profilDTO";
import { useEffect } from "react";
import { useState } from "react";

export default function ProfilEdit() {
  const navigate = useNavigate();
  const [currentProfil, setCurrentProfil] = useState(profilDTO);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    ProfileService.getIProfileInformation().then((response) => {
      if (response.status === 200) {
        setCurrentProfil(response.data);
        setIsLoaded(true);
      }
    });
  }, []);

  const validate = (values) => {
    const errors = {};
    if (values.username.length < 4 || values.username.length > 16) {
      errors.username = "Le pseudo doit etre compris entre 4 et 16 caractères.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      ...currentProfil,
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      const promise = ProfileService.updateProfile(values);
      promise.then((response) => {
        if (response.status === 200) {
          navigate("/profil");
        }
      });
    },
  });

  return (
    <div className=" w-screen h-screen">
      <div className="h-full flex justify-center items-center">
        {isLoaded && (
          <form
            onSubmit={formik.handleSubmit}
            className=" bg-white rounded-3xl p-10 flex flex-col absolute right-80"
          >
            <div className="register-input">
              <TextField
                required
                className="register-input"
                id="firstname"
                label="Prénom"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                placeholder="Prenom"
              />
            </div>
            <div className="register-input">
              <TextField
                required
                className="register-input"
                id="lastname"
                label="Nom"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                placeholder="nom"
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.anonymous}
                  onChange={formik.handleChange}
                  name="anonyme"
                />
              }
              label="Anonyme ?"
            />

            <div className="register-input">
              <TextField
                required
                className="register-input"
                id="description"
                label="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Ajouter une biographie à votre profile !"
              />
            </div>

            <div className="register-input flex flex-col justify-center">
              <InputLabel id="gender-selector">Genre</InputLabel>
              <Select
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
            <div className="register-input">
              <InputLabel id="skill-selector">Catégorie</InputLabel>
              <Select
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
            <Button
              type="submit"
              style={{ border: "1px solid" }}
              color="primary"
            >
              {" "}
              MODIFIER
            </Button>
          </form>
        )}
      </div>{" "}
    </div>
  );
}
