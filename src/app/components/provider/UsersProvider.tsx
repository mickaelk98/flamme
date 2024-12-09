"use client";

import { useEffect, useState, useContext } from "react";
import { UsersContext } from "@/app/context/UsersContext";
import { AuthContext } from "@/app/context/AuthContext";
import { User } from "@/app/Interfaces";
import { getAllUsers, getUsersLiked, getUsersDisliked } from "@/actions/user";
import { likeUser } from "@/actions/like";

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[] | []>([]);
  const [likedUser, setLikedUser] = useState<User[] | []>([]);
  const [dislikedUser, setDislikedUser] = useState<User[] | []>([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = async () => {
    if (user) {
      const response = await getAllUsers(user.id);
      setUsers(response);
    }
  };

  const fetchusersliked = async () => {
    if (user) {
      const response = await getUsersLiked(user.id);
      setLikedUser(response);
    }
  };

  const fetchusersdisliked = async () => {
    if (user) {
      const response = await getUsersDisliked(user.id);
      setDislikedUser(response);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchusersliked();
    fetchusersdisliked();
  }, [user]);

  const like = async (from: number, to: number, liked: boolean) => {
    await likeUser(from, to, liked);
    fetchUsers();
    fetchusersliked();
    fetchusersdisliked();
  };

  return (
    <UsersContext.Provider value={{ users, like, likedUser, dislikedUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
