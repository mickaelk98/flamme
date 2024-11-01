import React from "react";
import Image from "next/image";
import { FaHeart, FaTimes } from "react-icons/fa";
import { User } from "../Interfaces";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="relative w-72 h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200">
      {/* Image de fond */}
      <Image
        src="https://cloud.appwrite.io/v1/storage/buckets/6720cb6300320c082790/files/6721f2b1000f121db4d7/view?project=6720cb000037a070ab4a&project=6720cb000037a070ab4a&mode=admin"
        alt="User Image"
        fill={true}
        className="w-full h-full object-cover"
      />

      {/* Overlay pour l'ombre en bas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Nom et âge de l'utilisateur */}
        <div className="absolute bottom-14 text-center text-white z-10">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-lg">30 ans</p>
        </div>

        {/* Boutons Like et Dislike */}
        <div className="absolute bottom-1 flex space-x-16 z-10">
          <button className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600">
            <FaTimes size={20} />
          </button>
          <button className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600">
            <FaHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
