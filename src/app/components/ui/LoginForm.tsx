"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import loginSchema from "@/lib/yup/schemas/login";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { LoginUser } from "@/app/Interfaces";

export default function LoginForm() {
  const router = useRouter();
  const [credentialError, setCredentialError] = useState(false);
  const [credentialErrorMessage, setCredentialErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginUser) => {
    const result = await login(data);
    if (result.message === "Connexion reussie") {
      router.push("/signup");
    } else {
      setCredentialError(true);
      setCredentialErrorMessage(result.message);
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
        {credentialError && (
          <span className="text-red-500 mt-2">{credentialErrorMessage}</span>
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
