import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";
import MultipleSelect from "./Multiselect";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
      hobby: [],
    },

    onSubmit: (values) => {
      if (values.hobby.length > 3) {
        alert("Error");
      } else {
        navigate("/home");
        alert(JSON.stringify(values, null, 2));
      }
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
          <div className="register-input">
            <TextField
              required
              className="register-input"
              id="email"
              type="email"
              label="Adresse mail"
              onChange={formik.handleChange}
              value={formik.values.email}
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
            <InputLabel id="skill-selector">Compétence</InputLabel>
            <MultipleSelect
              formik={formik}
              names={[
                "Illustrators",
                "Photographers",
                "Painters",
                "Tattooists",
                "Graphic designers",
                "Textile artists",
                "Cinematographers",
                "Sculptors",
                "Craft artists",
              ]}
            />
          </div>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              style={{ border: "1px solid" }}
              color="primary"
            >
              <button>Submit</button>
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
