"use client";
import SpotifyLoginButton from "@/app/components/spotifyLoginButton";
import { signIn } from "next-auth/react";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

export default function loginPage() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <form className="max-w-sm space-y-4">
          <h1 className="text-center text-2xl font-bold  tracking-tight text-primary">
            Welcome to Mirrorld
          </h1>
          <p className="mt-10 text-center text-base font-normal tracking-tight text-black">
            Sign in your account!
          </p>
          <div className="flex flex-col space-y-1 ">
            <div>
              <GoogleLoginButton
                align="center"
                onClick={() => signIn("google", { callbackUrl: "/mypage" })}
              />
            </div>
            <div>
              <SpotifyLoginButton
                align="center"
                onClick={() => signIn("spotify", { callbackUrl: "/mypage" })}
              />
            </div>
            <div>{process.env.TEST ?? ""}</div>
            {/* <div>
              <GithubLoginButton
                align="center"
                onClick={() => signIn("github", { callbackUrl: "/mypage" })}
              />
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
}
