import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
      className="flex flex-col gap-6 w-[500px] text-mainText bg-myWhite shadow-lg rounded-lg p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {step === 0 && (
        <>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="name"
              className="text-lg font-semibold text-mainText"
            >
              Votre nom ou pseudo
            </label>
            <input
              type="text"
              className="p-3 border border-secondaryText rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-myRed text-sm">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="text-lg font-semibold text-mainText"
            >
              Votre email
            </label>
            <input
              type="text"
              className="p-3 border border-secondaryText rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-myRed text-sm">{errors.email.message}</span>
            )}
          </div>
        </>
      )}

      {step === 1 && (
        <>
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
              <span className="text-myRed text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="gender"
              className="text-lg font-semibold text-mainText"
            >
              Votre sexe
            </label>
            <select
              className="p-3 border border-secondaryText rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("gender")}
              id="gender"
            >
              <option value="">Sélectionnez...</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
            {errors.gender && (
              <span className="text-myRed text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="birthdate"
              className="text-lg font-semibold text-mainText"
            >
              Date de naissance
            </label>
            <input
              type="date"
              className="p-3 border border-secondaryText rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("birthDate")}
            />
            {errors.birthDate && (
              <span className="text-myRed text-sm">
                {errors.birthDate.message}
              </span>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col gap-3">
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
                        field.onChange(e.target.files[0]);
                      } else {
                        field.onChange(null);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-3 bg-primary text-myWhite font-semibold rounded-lg cursor-pointer flex justify-between items-center hover:bg-myRed transition-all"
                  >
                    Choisissez votre photo de profil
                    <FaCloudUploadAlt />
                  </label>
                  <span className="ml-4 text-secondaryText">
                    {field.value?.name || "Aucun fichier choisi"}
                  </span>
                  {errors.picture && (
                    <span className="text-myRed text-sm">
                      {errors.picture.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="bio"
              className="text-lg font-semibold text-mainText"
            >
              Votre biographie
            </label>
            <textarea
              {...register("bio")}
              className="p-3 border border-secondaryText h-52 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            {errors.bio && (
              <span className="text-myRed text-sm">{errors.bio.message}</span>
            )}
          </div>
        </>
      )}

      <div className="flex justify-between">
        {step > 0 && (
          <button
            type="button"
            className="bg-myWhite text-primary py-2 px-4 text-lg font-bold rounded-full border border-primary hover:bg-primary hover:text-myWhite transition-all"
            onClick={() => setStep(step - 1)}
          >
            Précédent
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            className="bg-primary py-2 px-4 text-lg font-bold text-myWhite rounded-full hover:bg-myRed transition-all"
            onClick={() => setStep(step + 1)}
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary py-2 px-4 text-lg font-bold text-myWhite rounded-full hover:bg-myRed transition-all"
          >
            S&apos;inscrire
          </button>
        )}
      </div>
      <Link
        className="self-start underline text-lg font-semibold text-mainText transition-all"
        href="/login"
      >
        J&apos;ai déjà un compte
      </Link>
    </form>
  );
}
