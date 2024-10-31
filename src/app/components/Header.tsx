import { FaInstagram, FaFacebook, FaHeart } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Header() {
  return (
    <header className="w-full px-5 max-w-[1600px] mx-auto flex items-center justify-between mb-[100px]">
      <div className="flex items-center gap-4 text-4xl text-white font-bold py-5">
        <FaHeart />
        <h1 className="text-4xl text-white font-bold">Flamme</h1>
      </div>
      <nav className="flex items-center gap-10">
        <ul className="flex items-center gap-4 text-4xl text-white">
          <li className="cursor-pointer">
            <FaInstagram />
          </li>
          <li className="cursor-pointer">
            <BsTwitterX />
          </li>
          <li className="cursor-pointer">
            <FaFacebook />
          </li>
        </ul>
      </nav>
    </header>
  );
}
