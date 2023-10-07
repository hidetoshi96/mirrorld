import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://webapp.engineeringlumalabs.com/api/v2/capture";
const authorization = `luma-api-key=${process.env.LUMA_API_KEY ?? ""}`;

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ status: 400 });
  }
  const res = await fetch(`${baseUrl}/${slug}`, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
  });
  return NextResponse.json(res);
}
