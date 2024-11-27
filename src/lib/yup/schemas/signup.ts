import * as yup from "yup";
import { Gender } from "@/app/Interfaces";

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(3, "Votre nom est trop court"),
  email: yup
    .string()
    .email("Votre saisie ne correspond pas à une adresse email")
    .required("Ce champ est obligatoire"),
  password: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), "Veuillez sélectionner votre sexe")
    .required("Veuillez sélectionner votre sexe"),
  birthDate: yup
    .string()
    .required("Ce champ est obligatoire")
    .test("isValidDate", "La date doit être valide", (value) => {
      if (!value) return false; // Assurez-vous que la valeur existe
      const date = new Date(value);
      return !isNaN(date.getTime()); // Vérifie que c'est une date valide
    })
    .test("isPastDate", "La date doit être dans le passé", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return date < new Date(); // Vérifie que la date est antérieure à aujourd'hui
    }),
  picture: yup
    .mixed<File>()
    .test("fileType", "Le fichier doit être une image", (value) => {
      return (
        !value || (value instanceof File && value.type.startsWith("image/"))
      );
    }),
  bio: yup
    .string()
    .required("Veuillez entrer votre biographie")
    .max(500, "La biographie ne doit pas dépasser 500 caractères"),
});

export default signupSchema;
