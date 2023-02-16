import "../styles/Register.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import clashDTO from "../data/dto/clashDTO";
import { useEffect } from "react";
import ClashService from "../service/clash-service";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  CustomFormButton,
  CustomFormContainer,
  CustomInputText,
  CustomTextAreaInput,
} from "./form/form-components";
import { CircularProgress } from "@mui/material";

export default function ClashEdit() {
  const { state } = useLocation();
  const { clashId } = state;
  const navigate = useNavigate();
  const [clash, setClash] = useState(clashDTO);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      theme: "",
      finished:false,
    },
  });

  useEffect(() => {
    if (state == null || clashId == null) {
      navigate(-1);
    } else {
      ClashService.getClashById(clashId).then((response) => {
        setClash(response.data);
        setIsLoading(false);
      });
    }
  }, []);
  
  function onSubmit(data) {
    const newData = {
      ...clash,
      ...data,
    }; 
    if (newData) {
      ClashService.updateClash(newData).then((response) => {
        navigate(-1);
      });
    }
  }
  
  return isLoading ? (
    <div className="absolute top-1/2 left-1/2">
      <CircularProgress />
    </div>
  ) : (
    <div className="wrapper h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomFormContainer width={"550px"}>
          <CustomInputText
            register={register}
            label={"Nouveau titre du clash : "}
            labelKey={"title"}
            defaultValue={clash.title}
          />
          <CustomTextAreaInput
            register={register}
            label={"Définissez les conditions et les attentes du défi !"}
            labelKey={"description"}
            defaultValue={clash.description}
          />
          <CustomInputText
            label={"Quel est le thème général ?"}
            register={register}
            labelKey={"theme"}
            defaultValue={clash.theme}
          />
          <CustomFormButton
            register={register}
            label={"Envoyer"}
            buttonType="submit"
          />
          <CustomFormButton
            register={register}
            label={"Retour"}
            color={"#66CCFF"}
            onClick={() => {
              navigate(-1);
            }}
          />
        </CustomFormContainer>
      </form>
    </div>
  );
}
