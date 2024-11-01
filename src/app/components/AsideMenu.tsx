import { FaHeart, FaUser, FaCoffee } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

export default function AsideMenu() {
  return (
    <aside className="flex-[20%] flex flex-col gap-5 p-5 bg-blue-300">
      <div className="flex items-center gap-5 text-4xl my-5">
        <FaHeart />
        <h1 className="font-bold">Flamme</h1>
      </div>
      <div className="flex items-center justify-between mb-12 ursor-pointer">
        <div className="flex items-center gap-2 ">
          <FaUser />
          <p>John Doe</p>
        </div>
        <IoSettings className="cursor-pointer hover:animate-spin" />
      </div>
      <ul className="flex flex-col gap-10">
        <li className="flex items-center justify-start gap-2">
          <FaUser />
          <span className="cursor-pointer">utilisateurs</span>
        </li>
        <li className="flex items-center justify-start gap-2">
          <FaMessage />
          <span className="cursor-pointer">messages</span>
        </li>
        <li className="flex items-center justify-start gap-2">
          <AiFillLike />
          <span className="cursor-pointer">likes</span>
        </li>
        <li className="flex items-center justify-start gap-2">
          <FaCoffee />
          <span className="cursor-pointer">matches</span>
        </li>
      </ul>
    </aside>
  );
}
