import React from "react";
import BottomNav from "@/app/components/bottomNav";

export default function authorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">{children}</div>

      <BottomNav />
    </section>
  );
}
