import { User } from "@/app/Interfaces";
import Image from "next/image";
export default function UserProfileMeessage({ user }: { user: User }) {
  return (
    <li className="flex items-center gap-2 mb-4 relative">
      <div className="rounded-full w-12 h-12 overflow-hidden">
        <Image
          src={user.picture}
          alt="User Avatar"
          width={50}
          height={50}
          className="object-cover w-full h-full"
        />
      </div>
      <span className="absolute flex h-3 w-3 top-0 left-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span>{user.name}</span>
    </li>
  );
}
