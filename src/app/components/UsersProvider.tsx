"use client";

import { useEffect, useState, useContext } from "react";
import { getAllUser } from "../services";
import { User } from "../Interfaces";
import { UsersContext } from "../context/UsersContext";
import { AuthContext } from "../context/AuthContext";
import { databases, ID } from "../appwrite";

function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(response);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  async function likeUser(user: User, liked: boolean) {
    try {
      await databases.createDocument(
        `${process.env.NEXT_PUBLIC_DATABASEID}`,
        `${process.env.NEXT_PUBLIC_DOCUMENTID}`,
        ID.unique(),
        {
          fromUserId: currentUser?.$id,
          toUserId: user?.$id,
          liked,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UsersContext.Provider value={{ users, likeUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UserProvider;
