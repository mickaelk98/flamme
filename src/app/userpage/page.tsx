import AllUsers from "../components/ui/AllUsers";
import AsideMenu from "../components/ui/AsideMenu";

export default function UserPage() {
  return (
    <main className="flex min-h-screen text-3xl">
      <AsideMenu />
      <section className="flex-[80%] bg-primary py-5 px-2">
        <AllUsers />
      </section>
    </main>
  );
}
