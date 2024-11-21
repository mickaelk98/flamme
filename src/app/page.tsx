"use client";

import { useRouter } from "next/navigation";
import Header from "./components/ui/Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
export default function Home() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.push("/userpage");
    }
  }, [user, router]);

  return (
    <>
      <Header />
      <main className="w-full px-5 max-w-[1600px] mx-auto text-white">
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
              <button
                onClick={() => router.push("/signup")}
                className="bg-white text-rose-400 p-2 text-xl font-bold rounded-3xl"
              >
                Inscription
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/login")}
                className="bg-rose-400 text-wite p-2 text-xl font-bold rounded-3xl"
              >
                Connexion
              </button>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
