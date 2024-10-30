import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Props from "@/app/Interfaces/signupPropsInterface";
import {
  SignupFormData,
  Gender,
} from "@/app/Interfaces/singupFomeOneInterface";

const SignupFormOne: React.FC<Props> = ({ setStep }) => {
  const schema = yup.object().shape({
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
    dateOfBirth: yup
      .date()
      .required("Ce champ est obligatoire")
      .max(new Date(), "La date doit être dans le passé"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    setStep(1);
  };

  return (
    <form
      className="flex flex-col gap-4 p-10 w-full text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl">
          Votre nom ou pseudo
        </label>
        <input type="text" className="p-2" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xl">
          Votre email
        </label>
        <input type="text" className="p-2" {...register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-xl">
          Mot de passe
        </label>
        <input type="password" className="p-2" {...register("password")} />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="gender" className="text-xl">
          Votre sexe
        </label>
        <select className="p-2" {...register("gender")} id="gender">
          <option value="">Sélectionnez...</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="dateOfBirth" className="text-xl">
          Date de naissance
        </label>
        <input type="date" className="p-2" {...register("dateOfBirth")} />
        {errors.dateOfBirth && (
          <span className="text-red-500">{errors.dateOfBirth.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl"
      >
        Suivant
      </button>
    </form>
  );
};

export default SignupFormOne;
