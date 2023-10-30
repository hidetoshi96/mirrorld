import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

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
            latitude: true,
            longitude: true,
            imageUrl: true,
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
        },
        wonderfulPosts: {
          select: {
            id: true,
            title: true,
            slug: true,
            latitude: true,
            longitude: true,
            imageUrl: true,
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
        },
        niceChallengePosts: {
          select: {
            id: true,
            title: true,
            slug: true,
            latitude: true,
            longitude: true,
            imageUrl: true,
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
        },
      },
    });

    const response: { [key: string]: object } = {};
    if (user === null) {
      return NextResponse.json(res);
    }

    for (const [key, value] of Object.entries(user)) {
      response[key] = value.map((post) => {
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
    }
    return NextResponse.json(response);
  }
  return NextResponse.json({ status: 401 });
}
