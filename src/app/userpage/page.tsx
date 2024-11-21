"use client";

import { useContext, useEffect } from "react";
import AllUsers from "../components/ui/AllUsers";
import AsideMenu from "../components/ui/AsideMenu";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <main className="flex min-h-screen text-3xl">
      <AsideMenu />
      <section className="flex-[80%] bg-slate-100 p-10">
        <AllUsers />
      </section>
    </main>
  );
}
