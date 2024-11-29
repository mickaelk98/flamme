"use client";

import { useEffect, useState } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import { User } from "@/app/Interfaces";
import { getAllUsers } from "@/actions/user";
import { likeUser } from "@/actions/like";

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  const like = async (from: number, to: number, liked: boolean) => {
    const response = await likeUser(from, to, liked);
    console.log(response);
  };

  return (
    <UsersContext.Provider value={{ users, like }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
