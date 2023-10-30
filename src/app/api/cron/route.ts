import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://webapp.engineeringlumalabs.com/api/v2/capture";
const authorization = `luma-api-key=${process.env.LUMA_API_KEY ?? ""}`;

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !==
    `Bearer ${process.env.CRON_SECRET ?? ""}`
  ) {
    return NextResponse.json({ status: 401 });
  }
  const postsInProgress = await prisma.post.findMany({
    where: { isCreateCompleted: false },
    select: {
      slug: true,
    },
  });

  postsInProgress.forEach(async (post) => {
    const res = await fetch(`${baseUrl}/${post.slug}`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await res.json();
    if (json.latestRun.artifacts.length === 0) {
      return;
    }
    const image = json.latestRun.artifacts.find(
      (artifact: { url: string; type: string }) => artifact.type === "thumb",
    );
    const model = json.latestRun.artifacts.find(
      (artifact: { url: string; type: string }) =>
        artifact.type === "textured_mesh_glb",
    );
    await prisma.post.update({
      where: {
        slug: post.slug,
      },
      data: {
        slug: json.slug,
        isCreateCompleted: true,
        imageUrl: image.url,
        threeDimensionalModelUrl: model.url,
      },
    });
  });
  return NextResponse.json({ status: 200 });
}
