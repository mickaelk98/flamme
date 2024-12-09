"use client";

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import loginSchema from "@/lib/yup/schemas/login";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/app/Interfaces";
import { AuthContext } from "@/app/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const [credentialError, setCredentialError] = useState(false);
  const [credentialErrorMessage, setCredentialErrorMessage] = useState("");
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginUser) => {
    const result = await loginUser(data);
    if (result.type === "success") {
      router.push("/userpage");
    } else {
      setCredentialError(true);
      setCredentialErrorMessage(result.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-[500px] text-mainText bg-myWhite shadow-md rounded-lg p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-lg font-semibold text-mainText">
          Votre email
        </label>
        <input
          type="text"
          className="p-3 border border-secondaryTextt rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-myRed text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label
          htmlFor="password"
          className="text-lg font-semibold text-mainText"
        >
          Mot de passe
        </label>
        <input
          type="password"
          className="p-3 border border-secondaryText rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-myRed text-sm">{errors.password.message}</span>
        )}
        {credentialError && (
          <span className="text-myRed text-sm mt-1">
            {credentialErrorMessage}
          </span>
        )}
      </div>

      <button className="self-end bg-primary text-myWhite py-3 px-6 rounded-full text-lg font-bold hover:bg-myRed transition-all">
        Se connecter
      </button>
      <Link
        className="self-start text-mainText underline text-lg font-semibold transition-all"
        href="/signup"
      >
        Je n&apos;ai pas de compte
      </Link>
    </form>
  );
}
