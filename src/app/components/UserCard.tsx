import React, { useContext } from "react";
import Image from "next/image";
import { FaHeart, FaTimes } from "react-icons/fa";
import { User } from "../Interfaces";
import { AuthContext } from "../context/AuthContext";
import { databases, ID } from "../appwrite";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const { user: currentUser } = useContext(AuthContext);

  async function likeUser(liked: boolean) {
    console.log("valeur de liked : ", liked);
    try {
      const result = await databases.createDocument(
        `${process.env.NEXT_PUBLIC_DATABASEID}`,
        `${process.env.NEXT_PUBLIC_DOCUMENTID}`,
        ID.unique(),
        {
          fromUserId: currentUser?.$id,
          toUserId: user.$id,
          liked,
        }
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative w-72 h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200">
      {/* Image de fond */}
      <Image
        src={user.prefs.picture}
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
          <p className="text-lg">{user.prefs.age} ans</p>
        </div>

        {/* Boutons Like et Dislike */}
        <div className="absolute bottom-1 flex space-x-16 z-10">
          <button
            onClick={() => likeUser(false)}
            className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600"
          >
            <FaTimes size={20} />
          </button>
          <button
            onClick={() => likeUser(true)}
            className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600"
          >
            <FaHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
