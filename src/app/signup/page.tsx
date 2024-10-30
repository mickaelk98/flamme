"use client";

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupUser } from "@/app/Interfaces";
import { signup } from "@/app/services";

export default function SignUp() {
  const router = useRouter();

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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignupUser) => {
    try {
      const { email, name, password } = data;
      await signup(email, password, name);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main className="w-full max-w-[1600px] mx-auto text-white flex flex-col items-center mb-[100px]">
        <h1 className="text-5xl font-bold mb-5">Inscription</h1>

        <form
          className="flex flex-col gap-4 w-[500px] text-black"
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

          <button className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl">
            S&apos;inscrire
          </button>
          <Link
            className="self-start underline text-xl font-bold"
            href="/login"
          >
            J&apos;ai deja un compte
          </Link>
        </form>
      </main>
    </>
  );
}
