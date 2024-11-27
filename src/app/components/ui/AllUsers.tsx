"use client";

import UserCard from "./UserCard";

export default function AllUsers() {
  const users = [
    {
      id: "1",
      name: "John Doe",
      age: 25,
      gender: "male",
      picture: "https://via.placeholder.com/150",
      email: "test@mail.com",
      password: "test",
      birthDate: "2000-01-01",
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="ml-20 mb-20">Les utilisateurs</h1>
      <div className="w-full flex flex-wrap justify-center gap-10">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
