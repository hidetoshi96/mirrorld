import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  const { title, slug, latitude, longitude, tags } = await req.json();
  if (!(title && slug && latitude && longitude && tags)) {
    return NextResponse.json({ status: 400 });
  }
  const connectOrCreateTagsData = tags.map((tagName: string) => {
    return {
      where: { name: tagName },
      create: { name: tagName },
    };
  });
  const post = await prisma.post.create({
    data: {
      title: title,
      slug: slug,
      latitude: latitude,
      longitude: longitude,
      imageUrl: null,
      threeDimensionalModelUrl: null,
      author: {
        connect: {
          email: session.user?.email!,
        },
      },
      tags: {
        connectOrCreate: connectOrCreateTagsData,
      },
    },
  });

  return NextResponse.json(post);
}
