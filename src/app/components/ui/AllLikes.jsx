import { useContext } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import UserCard from "@/app/components/ui/UserCard";

export default function AllLikes() {
  const { likedUser, dislikedUser } = useContext(UsersContext);

  return (
    <div className="flex flex-col w-full">
      <h1 className="ml-5 mb-10 text-mainText">Les likess</h1>
      <div className="flex flex-wrap justify-start gap-5 ml-5">
        {likedUser.length > 0 && (
          <div className="flex flex-col w-full">
            <h2 className="mb-5">Les personnes que vous avez likées</h2>
            <ul className="flex flex-wrap justify-start gap-5 ml-5">
              {likedUser.map((user) => (
                <li key={user.id}>
                  <UserCard user={user} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {dislikedUser.length > 0 && (
          <div className="flex flex-col w-full">
            <h2 className="mb-5">Les personnes que vous avez dislikées</h2>
            <ul className="flex flex-wrap justify-start gap-5 ml-5">
              {dislikedUser.map((user) => (
                <li key={user.id}>
                  <UserCard user={user} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
