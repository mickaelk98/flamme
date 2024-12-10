"use client";

import AllUsers from "@/app/components/ui/AllUsers";
import AllMessages from "@/app/components/ui/AllMessages";
import AllLikes from "@/app/components/ui/AllLikes";
import AllMatches from "@/app/components/ui/AllMatches";
import AsideMenu from "@/app/components/ui/AsideMenu";
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
      <section className="flex-[80%] bg-primary">{pages[page]}</section>
    </main>
  );
}
