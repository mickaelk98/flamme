"use client";

import { useContext } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import UserCard from "@/app/components/ui/UserCard";

export default function AllMatches() {
  const { matches } = useContext(UsersContext);
  return (
    <div className="flex flex-col w-full">
      <h1 className="ml-5 mb-10 text-mainText">Les matches</h1>
      <div className="flex flex-wrap justify-start gap-5 ml-5">
        {matches.length > 0 ? (
          <ul className="flex flex-wrap justify-start gap-5 ml-5">
            {matches.map((user) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Vous n&apos;avez aucun matches</p>
        )}
      </div>
    </div>
  );
}
