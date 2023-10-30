import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const postId = Number(params.id);
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        niceChallengeUsers: {
          select: {
            email: true,
          },
        },
      },
    });

    if (
      post?.niceChallengeUsers.find((user) => user.email == session.user?.email)
    ) {
      console.log("disconnect");
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          niceChallengeUsers: {
            disconnect: {
              email: session.user?.email!,
            },
          },
        },
      });
    } else {
      console.log("connect");
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          niceChallengeUsers: {
            connect: {
              email: session.user?.email!,
            },
          },
        },
      });
    }

    return NextResponse.json({ status: 200 });
  }
  return NextResponse.json({ status: 401 });
}
