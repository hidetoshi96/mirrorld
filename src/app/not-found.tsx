"use client";
import { redirect, usePathname } from "next/navigation";

export default function NotFound() {
  const pathName = usePathname();
  if (pathName === "/") {
    redirect("/mypage");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-gray-900 mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-6 text-base leading-7">
            お探しのページを見つけることができませんでした。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/mypage"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              マイページに戻る
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
