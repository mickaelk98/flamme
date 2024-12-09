"use server";

import prisma from "@/lib/prisma";

export async function getAllUsers(userId: number) {
  // Récupérer les utilisateurs que l'utilisateur actuel a likés ou dislikés (en tant que "fromUser")
  const likedOrDislikedUsers = await prisma.like.findMany({
    where: {
      fromUserId: userId, // Seulement les utilisateurs que vous avez likés ou dislikés
    },
    select: {
      toUserId: true, // Utilisateurs que vous avez likés ou dislikés
    },
  });

  // Créer un tableau des utilisateurs à exclure (ceux que vous avez likés ou dislikés)
  const excludedUserIds = likedOrDislikedUsers.map((like) => like.toUserId);

  // Ajouter l'exclusion de l'utilisateur actuel + les utilisateurs que vous avez likés ou dislikés
  const users = await prisma.user.findMany({
    where: {
      NOT: [
        { id: userId }, // Exclure l'utilisateur courant
        { id: { in: excludedUserIds } }, // Exclure les utilisateurs que vous avez likés ou dislikés
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      age: true,
      gender: true,
      bio: true,
      picture: true,
      createdAt: true,
    },
  });
  return users;
}

export async function getUsersLiked(userId: number) {
  const likedUsers = await prisma.like.findMany({
    where: {
      fromUserId: userId,
      liked: true,
    },
    select: {
      toUserId: true,
    },
  });

  const likedUserIds = likedUsers.map((like) => like.toUserId);

  const users = await prisma.user.findMany({
    where: {
      id: { in: likedUserIds },
    },
    select: {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      age: true,
      gender: true,
      bio: true,
      picture: true,
      createdAt: true,
    },
  });

  return users;
}

export async function getUsersDisliked(userId: number) {
  const dislikedUsers = await prisma.like.findMany({
    where: {
      fromUserId: userId,
      liked: false,
    },
    select: {
      toUserId: true,
    },
  });

  const dislikedUserIds = dislikedUsers.map((like) => like.toUserId);

  const users = await prisma.user.findMany({
    where: {
      id: { in: dislikedUserIds },
    },
    select: {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      age: true,
      gender: true,
      bio: true,
      picture: true,
      createdAt: true,
    },
  });

  return users;
}

export async function allMatches(userId: number) {
  const matches = await prisma.match.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
    },
    include: {
      user1: true,
      user2: true,
    },
  });

  const users = matches.flatMap((match) =>
    match.user1Id === userId ? [match.user2] : [match.user1]
  );

  return users;
}
