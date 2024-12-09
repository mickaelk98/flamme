"use client";
import { useContext } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import UserCard from "./UserCard";

export default function AllUsers({}) {
  const { users } = useContext(UsersContext);
  return (
    <div className="flex flex-col w-full">
      <h1 className="ml-5 mb-10 text-mainText">Les utilisateurs</h1>
      <div className="flex flex-wrap justify-start gap-5 ml-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
