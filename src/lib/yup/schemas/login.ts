import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Votre saisie ne correspond pas à une adresse email")
    .required("Ce champ est obligatoire"),
  password: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export default loginSchema;
