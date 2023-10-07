import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        latitude: true,
        longitude: true,
        imageUrl: true,
        author: true,
        createdTime: true,
        wonderfulUsers: true,
        niceChallengeUsers: true,
        tags: true,
        _count: {
          select: {
            wonderfulUsers: true,
            niceChallengeUsers: true,
          },
        },
      },
    });
    const tags = [
      ...new Set(res.flatMap((post) => post.tags.map((tag) => tag.name))),
    ];
    const posts = res.map((post) => {
      const wonderfulClicked =
        post.wonderfulUsers.find(
          (user) => user.email === session.user?.email,
        ) !== undefined;
      const niceChallengeClicked =
        post.niceChallengeUsers.find(
          (user) => user.email === session.user?.email,
        ) !== undefined;
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        imageUrl: post.imageUrl,
        createdTime: post.createdTime,
        isMyPost: post.author.email === session.user?.email,
        location: {
          latitude: post.latitude,
          longitude: post.longitude,
        },
        tags: post.tags.map((tag) => tag.name),
        stamps: {
          wonderfulStamp: {
            clicked: wonderfulClicked,
            count: post.wonderfulUsers.length,
          },
          niceChallengeStamp: {
            clicked: niceChallengeClicked,
            count: post.niceChallengeUsers.length,
          },
        },
      };
    });

    return NextResponse.json({ posts: posts, tags: tags });
  }
}
