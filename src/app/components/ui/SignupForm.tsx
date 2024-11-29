import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupUser } from "@/app/Interfaces";
import { FaCloudUploadAlt } from "react-icons/fa";
import signupSchema from "@/lib/yup/schemas/signup";
import { AuthContext } from "@/app/context/AuthContext";

export default function SignupForm() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { signupUser } = useContext(AuthContext);

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupUser) => {
    const result = await signupUser(data);

    if (result.type === "error") {
      if (result.name === "email") {
        setError("email", {
          message: result.message,
        });
      }
      if (result.name === "age") {
        setError("birthDate", {
          message: result.message,
        });
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-[500px] text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      {step === 0 ? (
        <>
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
            <label htmlFor="birthdate" className="text-xl">
              Date de naissance
            </label>
            <input type="date" className="p-2" {...register("birthDate")} />
            {errors.birthDate && (
              <span className="text-red-500">{errors.birthDate.message}</span>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <Controller
              name="picture"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        field.onChange(e.target.files[0]); // Prend le premier fichier
                      } else {
                        field.onChange(null); // Si aucun fichier, remet à null
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-3 bg-rose-400 text-white font-semibold rounded-lg cursor-pointer focus:outline-none flex justify-between items-center"
                  >
                    Choisissez votre photo de profil
                    <FaCloudUploadAlt />
                  </label>
                  <span className="ml-4 text-gray-700">
                    {field.value?.name || "Aucun fichier choisi"}
                  </span>
                  {errors.picture && (
                    <span className="text-red-500">
                      {errors.picture.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-xl">
              Votre biographie
            </label>
            <textarea
              {...register("bio")}
              className="p-2 h-52 resize-none rounded-lg outline-none"
            ></textarea>
            {errors.bio && (
              <span className="text-red-500">{errors.bio.message}</span>
            )}
          </div>
        </>
      )}
      <button
        onClick={() => setStep(step === 0 ? 1 : 0)}
        type="button"
        className="self-start bg-white text-rose-400 p-2 text-xl font-bold rounded-3xl"
      >
        {step === 0 ? "Suivant" : "Précédent"}
      </button>
      <button className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl">
        S&apos;inscrire
      </button>
      <Link className="self-start underline text-xl font-bold" href="/login">
        J&apos;ai deja un compte
      </Link>
    </form>
  );
}
