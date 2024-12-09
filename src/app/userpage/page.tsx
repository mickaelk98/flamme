"use client";

import AllUsers from "../components/ui/AllUsers";
import AllMessages from "../components/ui/AllMessages";
import AllLikes from "../components/ui/AllLikes";
import AllMatches from "../components/ui/AllMatches";
import AsideMenu from "../components/ui/AsideMenu";
import { useState } from "react";

export default function UserPage() {
  const [page, setPage] = useState(0);
  const pages = [
    <AllUsers key={0} />,
    <AllMessages key={1} />,
    <AllLikes key={2} />,
    <AllMatches key={3} />,
  ];
  return (
    <main className="flex min-h-screen text-3xl">
      <AsideMenu setPage={setPage} page={page} />
      <section className="flex-[80%] bg-primary py-5 px-2">
        {pages[page]}
      </section>
    </main>
  );
}
