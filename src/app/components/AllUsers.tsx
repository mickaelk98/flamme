"use client";

import UserCard from "./UserCard";
import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export default function AllUsers() {
  const { users } = useContext(UsersContext);
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
