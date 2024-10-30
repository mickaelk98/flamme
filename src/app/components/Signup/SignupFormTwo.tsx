import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SignupFormTwoData } from "@/app/Interfaces/singupFormTwoInterface";
import Props from "@/app/Interfaces/signupPropsInterface";

const schema = yup.object().shape({
  profilePicture: yup
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

const SignupFormTwo: React.FC<Props> = ({ setStep }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormTwoData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignupFormTwoData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-4 p-10 w-full text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="profilePicture"
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
              {errors.profilePicture && (
                <span className="text-red-500">
                  {errors.profilePicture.message}
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
      <button
        type="button" // Utilise type="button" pour éviter la soumission immédiate
        onClick={() => setStep(0)}
        className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl"
      >
        Précédent
      </button>
      <button className=" bg-rose-400 p-2 text-xl font-bold rounded-3xl text-center">
        S&apos;inscrire
      </button>
    </form>
  );
};

export default SignupFormTwo;
