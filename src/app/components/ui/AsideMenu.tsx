"use client";

import { FC, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/app/context/AuthContext";
import { FaUser, FaCoffee } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

interface AsideMenuProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

const AsideMenu: FC<AsideMenuProps> = ({ setPage, page }) => {
  const { user } = useContext(AuthContext);
  return (
    <aside className="flex-[20%] flex flex-col gap-5 p-5 bg-myWhite shadow-md shadow-secondaryText text-mainText">
      <div className="flex items-center justify-between mb-12 ursor-pointer">
        <div className="flex items-center gap-2 ">
          <div className="rounded-full w-12 h-12 overflow-hidden">
            {user && (
              <Image
                src={user.picture}
                alt="User Avatar"
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <p>{user?.name}</p>
        </div>
        <IoSettings className="cursor-pointer hover:animate-spin" />
      </div>
      <ul className="flex flex-col gap-10">
        <li
          onClick={() => setPage(0)}
          className={`flex items-center justify-start gap-2 ${
            page === 0 ? "text-primary" : ""
          }`}
        >
          <FaUser />
          <span className="cursor-pointer">utilisateurs</span>
        </li>
        <li
          onClick={() => setPage(1)}
          className={`flex items-center justify-start gap-2 ${
            page === 1 ? "text-primary" : ""
          }`}
        >
          <FaMessage />
          <span className="cursor-pointer">messages</span>
        </li>
        <li
          onClick={() => setPage(2)}
          className={`flex items-center justify-start gap-2 ${
            page === 2 ? "text-primary" : ""
          }`}
        >
          <AiFillLike />
          <span className="cursor-pointer">likes</span>
        </li>
        <li
          onClick={() => setPage(3)}
          className={`flex items-center justify-start gap-2 ${
            page === 3 ? "text-primary" : ""
          }`}
        >
          <FaCoffee />
          <span className="cursor-pointer">matches</span>
        </li>
      </ul>
    </aside>
  );
};

export default AsideMenu;
