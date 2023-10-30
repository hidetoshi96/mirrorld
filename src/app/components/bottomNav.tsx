"use client";

import { IconCubePlus, IconMap2, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <div className={`z-30 w-full border-t border-gray bg-white`}>
      <div className="flex h-full flex-row py-1.5">
        <Link
          href="/map"
          className={`flex w-full flex-col items-center justify-center ${
            pathname.match("/map")
              ? "fill-primary text-primary"
              : "fill-gray text-gray"
          }`}
        >
          <IconMap2 width={"30"} height={"30"} strokeWidth={"1"} />
          <span className="text-xxs">地図</span>
        </Link>
        <Link
          href="/create"
          className={`flex w-full flex-col items-center justify-center ${
            pathname == "/create"
              ? "fill-primary text-primary"
              : "fill-gray text-gray"
          }`}
        >
          <IconCubePlus width={"30"} height={"30"} strokeWidth={"1"} />
          <span className="text-xxs">作成</span>
        </Link>
        <Link
          href="/mypage"
          className={`flex w-full flex-col items-center justify-center ${
            pathname == "/mypage"
              ? "fill-primary text-primary"
              : "fill-gray text-gray"
          }`}
        >
          <IconUserCircle width={"30"} height={"30"} strokeWidth={"1"} />
          <span className="text-xxs">マイページ</span>
        </Link>
      </div>
    </div>
  );
}
