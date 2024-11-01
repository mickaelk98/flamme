"use client";

import { User } from "../Interfaces";
import { getAllUser } from "../services";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div className="flex flex-col">
      <h1 className="ml-20 mb-20">Les utilisateurs</h1>
      <div className="w-full flex flex-wrap justify-center gap-10">
        {users.map((user) => (
          <UserCard key={user.$id} user={user} />
        ))}
      </div>
    </div>
  );
}
