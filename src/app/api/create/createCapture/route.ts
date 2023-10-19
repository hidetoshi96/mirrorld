import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://webapp.engineeringlumalabs.com/api/v2/capture";
const authorization = `luma-api-key=${process.env.LUMA_API_KEY ?? ""}`;

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ status: 400 });
  }
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
