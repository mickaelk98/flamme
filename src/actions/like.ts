"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function likeUser(
  fromUserId: number,
  toUserId: number,
  liked: boolean
) {
  const targetUser = await prisma.user.findUnique({
    where: { id: toUserId },
  });

  if (!targetUser) {
    return { message: "La persone n'existe pas" };
  }
  if (fromUserId === toUserId) {
    return { message: "vous ne pouvez pas liker vous-meme" };
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      fromUserId,
      toUserId,
    },
  });

  if (existingLike) {
    return {
      message: liked
        ? "Vous avez deja liké cette personne"
        : "Vous avez deja disliké cette personne",
    };
  } else {
    await prisma.like.create({
      data: {
        fromUserId,
        toUserId,
        liked,
      },
    });
  }

  if (liked) {
    const mutualLike = await prisma.like.findFirst({
      where: {
        fromUserId: toUserId,
        toUserId: fromUserId,
        liked: true,
      },
    });

    if (mutualLike) {
      // Create a match if mutual like exists
      await prisma.match.create({
        data: {
          user1Id: Math.min(fromUserId, toUserId), // Ensure consistent ordering
          user2Id: Math.max(fromUserId, toUserId),
        },
      });
    }
  }
  revalidatePath("/userpage");
  return {
    message: liked ? "Vous avez liker" : "Vous avez dislike",
  };
}
