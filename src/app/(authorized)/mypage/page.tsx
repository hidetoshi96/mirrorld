import MyPageContainer from "@/app/components/pageContainers/myPageContainer";
import { cookies } from "next/headers";

export default async function MyPage() {
  const cookieStore = cookies();
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/mypage`, {
    method: "GET",
    headers: {
      cookie,
    },
  });
  const data = await res.json();
  return <MyPageContainer initialPosts={data} />;
}
