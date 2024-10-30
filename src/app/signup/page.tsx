"use client";

import Header from "../components/Header";
import Link from "next/link";
import SignupFormOne from "../components/Signup/SignupFormOne";
import { useState } from "react";
import SignupFormTwo from "../components/Signup/SignupFormTwo";

export default function SignUp() {
  const [step, setStep] = useState(0);
  const formList = [
    <SignupFormOne key={1} setStep={setStep} />,
    <SignupFormTwo key={2} setStep={setStep} />,
  ];

  return (
    <>
      <Header />
      <main className="w-full max-w-[1600px] mx-auto text-white flex flex-col items-center mb-[100px]">
        <h1 className="text-5xl font-bold mb-5">Inscription</h1>
        <div className="flex flex-col gap-4 w-[500px] text-black">
          {formList[step]}
          <Link className="self-start" href="/login">
            J&apos;ai deja un compte
          </Link>
          {/* {step === 1 ? (
            <button className=" bg-rose-400 p-2 text-xl font-bold rounded-3xl text-center">
              S&apos;inscrire
            </button>
          ) : (
            <></>
          )} */}
        </div>
      </main>
    </>
  );
}
