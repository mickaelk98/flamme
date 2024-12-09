// components/BodyClassUpdater.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyClassUpdater() {
  const pathname = usePathname();
  const homeClass: Array<string> = [
    "h-screen",
    "bg-cover",
    "bg-center",
    "bg-no-repeat",
    "flex",
    "flex-col",
  ];
  const authFormClass: Array<string> = ["bg-primary"];

  useEffect(() => {
    document.body.classList.remove("bg-home", "bg-login", "bg-signup");
    document.body.style.backgroundImage = "none";

    if (pathname === "/") {
      document.body.classList.add(...homeClass);
      document.body.style.backgroundImage = 'url("/landing.jpg")';
    } else if (pathname === "/login" || pathname === "/signup") {
      document.body.classList.add(...authFormClass);
    }
  }, [pathname]);

  return null;
}
