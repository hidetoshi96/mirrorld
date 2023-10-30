import { ReactNode } from "react";
import BottomNav from "@/app/components/bottomNav";

export default function authorizedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="flex h-screen flex-col">
      <div className="flex-grow overflow-y-auto">{children}</div>
      <BottomNav />
    </section>
  );
}
