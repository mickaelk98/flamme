import { useContext } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import Message from "@/app/components/ui/Message";
import Image from "next/image";

export default function AllMessages() {
  const { matches } = useContext(UsersContext);
  return (
    <div className="flex w-full h-full">
      <ul className="w-[220px] flex flex-col bg-secondary py-2 pl-2">
        {matches.length > 0 ? (
          <>
            {matches.map((user) => (
              <li key={user.id} className="flex items-center gap-2 mb-4">
                <div className="rounded-full w-12 h-12 overflow-hidden">
                  {user && (
                    <Image
                      src={user.picture}
                      alt="User Avatar"
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <span>{user.name}</span>
              </li>
            ))}
          </>
        ) : (
          <p>Aucun matche</p>
        )}
      </ul>
      <div className="flex-1 flex flex-col items-center justify-start">
        <h1 className="ml-5 mb-10 text-mainText text-center my-5">Louis</h1>
        <div className="bg-myWhite h-full w-full flex flex-col justify-between">
          <ul className="flex flex-col gap-2 m-2">
            <Message message="salut" time="12:05" author={1} />
            <Message
              message="comment ca va ? un message random"
              time="12:08"
              author={2}
            />
            <Message message="hello world" time="12:05" author={1} />
          </ul>
          <form
            action=""
            className="self-end flex items-center gap-2 w-full px-2 mb-2"
          >
            <input
              className="border-2 border-secondary rounded-md p-2 flex-1"
              type="text"
              name=""
              id=""
            />
            <button className="bg-primary text-myWhite rounded-md p-2">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
