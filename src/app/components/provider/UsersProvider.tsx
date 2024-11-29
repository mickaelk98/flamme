"use client";

import { useEffect, useState } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import { User } from "@/app/Interfaces";
import { getAllUsers } from "@/actions/user";

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  console.log("tout les user depuis le provider users : ", users);

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
}

export default UsersProvider;
