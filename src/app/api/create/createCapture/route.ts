import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://webapp.engineeringlumalabs.com/api/v2/capture";
const authorization = `luma-api-key=${process.env.LUMA_API_KEY ?? ""}`;

export async function POST(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ status: 401 });
  // }
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ status: 400 });
  }
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify({ title: title }),
  });
  return NextResponse.json(res);
}
