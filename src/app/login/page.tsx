import LoginForm from "@/app/components/ui/LoginForm";

export default function Login() {
  return (
    <>
      <main className="w-full max-w-[1600px] h-screen mx-auto text-mainText flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold mb-10">Connexion</h1>
        <LoginForm />
      </main>
    </>
  );
}
