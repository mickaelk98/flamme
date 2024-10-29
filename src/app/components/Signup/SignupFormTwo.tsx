import Props from "@/app/Interfaces/signupPropsInterface";
import { FaCloudUploadAlt } from "react-icons/fa";

const SignupFormTwo: React.FC<Props> = ({ setStep }) => {
  return (
    <form className="flex flex-col gap-4 p-10 w-full text-black" action="#">
      <div className="flex flex-col gap-2">
        <input id="file-upload" type="file" className="hidden" />

        <label
          htmlFor="file-upload"
          className="px-6 py-3 bg-rose-400 text-white font-semibold rounded-lg cursor-pointer  focus:outline-none flex justify-between items-center"
        >
          Choisissez votre photo de profil
          <FaCloudUploadAlt />
        </label>

        <span id="file-name" className="ml-4 text-gray-700"></span>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xl">
          Votre biographie
        </label>
        <textarea
          name="bio"
          id=""
          className="p-2 h-52 resize-none rounded-lg outline-none"
        ></textarea>
      </div>
      <button
        onClick={() => setStep(0)}
        className="self-end bg-rose-400 p-2 text-xl font-bold rounded-3xl"
      >
        Precédent
      </button>
    </form>
  );
};

export default SignupFormTwo;
