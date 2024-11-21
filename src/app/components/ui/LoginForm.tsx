"use client";

import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { AppwriteException } from "appwrite";
import { LoginUser } from "@/app/Interfaces";

export default function LoginForm() {
  const router = useRouter();
  const { user, loginUser } = useContext(AuthContext);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Votre saisie ne correspond pas à une adresse email")
      .required("Ce champ est obligatoire"),
    password: yup
      .string()
      .required("Ce champ est obligatoire")
      .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      router.push("/userpage");
    }
  }, [user, router]);

  const onSubmit = async (data: LoginUser) => {
    try {
      const { email, password } = data;
      loginUser(email, password);

      router.push("/userpage");
    } catch (error) {
      console.log(error);
      if (error instanceof AppwriteException) {
        if (error.code === 401) {
          setError("password", {
            type: "password",
            message: "Identifiant ou mot de passe incorrect",
          });
        } else {
          console.error(`Erreur: ${error.message}`);
        }
      } else {
        console.error(
          "Une erreur inconnue s'est produite, veuillez réessayer plus tard."
        );
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-[500px] text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <button className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl">
        Se connecter
      </button>
      <Link className="self-start underline text-xl font-bold" href="/signup">
        Je n&apos;ai pas de compte
      </Link>
    </form>
  );
}
