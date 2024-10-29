import { FaInstagram, FaFacebook, FaHeart } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <header className="w-full max-w-[1600px] mx-auto flex items-center justify-between mb-[100px]">
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
      <main className="w-full max-w-[1600px] mx-auto text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-black-900 mb-10">Flamme</h1>
          <p className="mb-10 text-xl">
            Bienvenue sur Flamme, la plateforme de rencontre moderne qui réunit
            les célibataires en quête de leur moitié. Avec Flamme, chaque swipe
            est une chance de découvrir une personne qui partage vos passions et
            vos envies. Que vous soyez en quête d&apos;une relation sérieuse ou
            que vous souhaitiez simplement faire de nouvelles rencontres, notre
            approche simplifiée et authentique rend chaque interaction naturelle
            et engageante.
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <button className="bg-white text-rose-400 p-2 text-xl font-bold rounded-3xl">
                Inscription
              </button>
            </li>
            <li>
              <button className="bg-rose-400 text-wite p-2 text-xl font-bold rounded-3xl">
                Connexion
              </button>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
