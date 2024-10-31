import AllUsers from "../components/AllUsers";
import AsideMenu from "../components/AsideMenu";

export default function UserPage() {
  return (
    <main className="flex min-h-screen text-3xl">
      <AsideMenu />
      <section className="flex-[80%] bg-slate-100 p-10">
        <AllUsers />
      </section>
    </main>
  );
}
