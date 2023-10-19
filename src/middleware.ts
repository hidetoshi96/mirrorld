export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!login|manifest.json|icons|screenshots|api/cron).*)"],
};
