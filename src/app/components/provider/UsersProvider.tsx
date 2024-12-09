"use client";

import { useEffect, useState, useContext } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import { AuthContext } from "@/app/context/AuthContext";
import { User } from "@/app/Interfaces";
import { getAllUsers } from "@/actions/user";
import { likeUser } from "@/actions/like";

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[] | []>([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = async () => {
    if (user) {
      const response = await getAllUsers(user.id);
      setUsers(response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const like = async (from: number, to: number, liked: boolean) => {
    await likeUser(from, to, liked);
    fetchUsers();
  };

  return (
    <UsersContext.Provider value={{ users, like }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
