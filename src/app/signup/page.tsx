"use client";

import SignupForm from "../components/ui/SignupForm";

export default function SignUp() {
  return (
    <>
      <main className="w-full h-screen max-w-[1600px] mx-auto text-mainText flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold mb-10">Inscription</h1>
        <SignupForm />
      </main>
    </>
  );
}
