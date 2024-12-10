"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function Message({
  message,
  time,
  author,
}: {
  message: string;
  time: string;
  author: number;
}) {
  const { user } = useContext(AuthContext);
  console.log(user?.id);

  return (
    <li
      className={`p-2 max-w-[300px] text-xl rounded-md ${
        author === user?.id
          ? "self-start bg-secondary"
          : "self-end bg-secondaryText"
      }`}
    >
      <p>{message}</p>
      <span>{time}</span>
    </li>
  );
}
