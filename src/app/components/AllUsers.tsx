import UserCard from "./UserCard";
export default function AllUsers() {
  return (
    <div className="flex flex-col">
      <h1 className="ml-20 mb-20">Les utilisateurs</h1>
      <div className="w-full flex flex-wrap justify-center gap-10">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
