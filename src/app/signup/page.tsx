"use client";

import Header from "../components/ui/Header";
import SignupForm from "../components/ui/SignupForm";

export default function SignUp() {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1600px] mx-auto text-white flex flex-col items-center mb-[100px]">
        <h1 className="text-5xl font-bold mb-5">Inscription</h1>
        <SignupForm />
      </main>
    </>
  );
}
