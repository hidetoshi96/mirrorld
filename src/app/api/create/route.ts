import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  const { title, slug, location, tags } = await req.json();
  if (!(title && slug && location.longitude && location.latitude && tags)) {
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
      latitude: location.latitude,
      longitude: location.longitude,
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
