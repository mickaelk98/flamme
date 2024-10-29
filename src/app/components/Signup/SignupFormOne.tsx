import Props from "@/app/Interfaces/signupPropsInterface";
import React from "react";

const SignupFormOne: React.FC<Props> = ({ setStep }) => {
  return (
    <form className="flex flex-col gap-4 p-10 w-full text-black" action="#">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl">
          Votre nom ou pseudo
        </label>
        <input type="text" className="p-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xl">
          Votre email
        </label>
        <input type="text" className="p-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-xl">
          password
        </label>
        <input type="text" className="p-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-xl">
          Votre sexe
        </label>
        <select className="p-2" name="gender" id="gender">
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <button
        onClick={() => setStep(1)}
        className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl"
      >
        Suivant
      </button>
    </form>
  );
};

export default SignupFormOne;
