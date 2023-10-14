import MapPageContainer from "@/app/components/pageContainers/mapPageContainer";
import { cookies } from "next/headers";

export default async function mapPage() {
  const cookieStore = cookies();
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/map`, {
    method: "GET",
    headers: {
      cookie,
    },
  });
  const data = await res.json();
  return <MapPageContainer initialPosts={data.posts} initialTags={data.tags} />;
}
