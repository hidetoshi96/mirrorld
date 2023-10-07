import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
      select: {
        posts: {
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            createdTime: true,
            wonderfulUsers: true,
            niceChallengeUsers: true,
            _count: {
              select: {
                wonderfulUsers: true,
                niceChallengeUsers: true,
              },
            },
          },
        },
      },
    });

    const res = user?.posts.map((post) => {
      const wonderfulClicked =
        post.wonderfulUsers.find(
          (user) => user.email == session.user?.email,
        ) !== undefined;
      const niceChallengeClicked =
        post.niceChallengeUsers.find(
          (user) => user.email == session.user?.email,
        ) !== undefined;
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        imageUrl: post.imageUrl,
        createdTime: post.createdTime,
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
    return NextResponse.json(res);
  }
  return NextResponse.json({ status: 401 });
}
