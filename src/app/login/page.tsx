import Header from "../components/ui/Header";
import LoginForm from "@/app/components/ui/LoginForm";

export default function Login() {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1600px] mx-auto text-white flex flex-col items-center mb-[100px]">
        <h1 className="text-5xl font-bold mb-5">Connexion</h1>
        <LoginForm />
      </main>
    </>
  );
}
